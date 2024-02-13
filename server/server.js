const express = require('express');
const bodyParser = require('body-parser');
const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');
const cors = require('cors')
const expressWS = require('express-ws');
const Filter = require('bad-words'), profanityFilter = new Filter();
profanityFilter.addWords("ProbablyBadIdea", "ToReallyTestThis", "InAnInterview", "SoJustTypeThese")

const app = express();
const socket = expressWS(app);
const port = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

// Replaced most REST calls with websocket connection
app.ws('/comments', async (ws, req) => {
  console.log('Connected to websocket');
  await broadcastComments()

  ws.on('message', async (msg) => {
    const data = JSON.parse(msg)
    const {type, id, name, message} = data
    let kidFriendlyName, kidFriendlyMessage
    if (name) {
      kidFriendlyName = profanityFilter.clean(name)
    }
    if (message) {
      kidFriendlyMessage = profanityFilter.clean(message)
    }
    switch(type) {
      case 'createComment':
        await comment.createComment({name: kidFriendlyName, message: kidFriendlyMessage})
        await broadcastComments()
        break;

      case 'deleteAllComments':
        await comment.deleteAllComments()
        await broadcastComments()
        break;

      case 'deleteComment':
        await comment.deleteComment(id)
        await broadcastComments()
        break;

      case 'editComment':
        await comment.editComment({name: kidFriendlyName, message: kidFriendlyMessage, id})
        await broadcastComments()
        break;

      default:
        break;
    }
  });
  
});

// Common function to send updated list of comments to each connected client on any of the above actions
async function broadcastComments() {
  try {
    const comments = await comment.getAllComments();
    socket.getWss().clients.forEach(client => { 
      if (client.readyState === client.OPEN) { // I haven't worked with socket io before, but my understanding is it offers a much more robust handling of this
        client.send(JSON.stringify({type: 'comments', comments}));
      }
    });
  } catch(err) {
    console.log("Error broadcasting comments", err)
  }
};

// I kept the original /getComment REST endpoint because I wasn't sure how much making REST calls was a requirement given the instructions 
// If I had the other REST endpoints still, I would have created a CommentsController file and routed all /api/comments/* there 
app.get('/api/comment/:id', async function(request, response, next) {
  try {
    const result = await comment.getComment(request.params.id)
    response.send(result)
  } catch(err) {
    next(err) // Send to common error handler
  }
});

// Common server error handler (would be more useful with more REST endpoints)
app.use((error, request, response, next) => {
  if (error.status) {
    response.status(error.status).send(error.message);
  } else {
    console.error(`ERROR: ${error.message}`);
    response.status(500).send('Internal Server Error');
  }
});

// Catch all 404 handler
app.use((request, response) => {
  response.status(404).send('These are not the routes you are looking for.');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('public'));

app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/src/index.html`);
});
