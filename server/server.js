const express = require('express');
const bodyParser = require('body-parser');
const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');
const cors = require('cors')
const expressWS = require('express-ws');

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

app.ws('/comments', async (ws, req) => {
  console.log('Connected to websocket');
  await broadcastComments()

  ws.on('message', async (msg) => {
    const data = JSON.parse(msg)
    const {type, id, name, message} = data
    switch(type) {
      case 'createComment':
        await comment.createComment({name, message})
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
        await comment.editComment({name, message, id})
        await broadcastComments()
        break;

      default:
        break;
    }
  });
  
});

async function broadcastComments() {
  try {
    const comments = await comment.getAllComments();
    socket.getWss().clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({type: 'comments', comments}));
      }
    });
  } catch(err) {
    console.log("Error broadcasting comments", err)
  }
};

app.get('/api/comment/:id', async function(request, response, next) {
  try {
    const result = await comment.getComment(request.params.id)
    response.send(result)
  } catch(err) {
    next(err)
  }
});

app.use((request, response) => {
  response.status(404).send('These are not the routes you are looking for.');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/src/index.html`);
});
