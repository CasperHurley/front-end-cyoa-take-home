const express = require('express');
const bodyParser = require('body-parser');
const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');
const cors = require('cors')
const expressWS = require('express-ws');

const app = express();
const socket = expressWS(app);
const port = process.env.PORT || 3001;

app.use(cors())
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

      default:
        break;
    }
  });

  
});

async function broadcastComments() {
  try {
    const comments = await comment.getComments();
    socket.getWss().clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({type: 'comments', comments}));
      }
    });
  } catch(err) {
    console.log("Error broadcasting comments", err)
  }
};

// app.post('/createComment', async function(request, response, next) {
//   try {
//     const result = await comment.createComment(request.body)
//     await broadcastComments()
//     response.send(result)
//   } catch(err) {
//     next(err)
//   }
// });

app.get('/api/comment/:id', function(request, response, next) {
  try {
    comment.getComment(request.params.id).then(result => {
      response.send(result);
    });
  } catch(err) {
    next(err)
  }
});

// app.get('/getComments', function(request, response, next) {
//   try {
//     comment.getComments().then(result => {
//       response.send(result);
//     });
//   } catch(err) {
//     next(err)
//   }
// });

// app.delete('/deleteAllComments', async function(request, response, next) {
//   try {
//     await comment.deleteComments()
//     await broadcastComments()
//   } catch(err) {
//     next(err)
//   }
// });

// app.delete('/deleteComment/:id', async function(request, response, next) {
//   try {
//     await comment.deleteComment(request.params.id)
//     await broadcastComments();
//   } catch(err) {
//     next(err)
//   }
// });

// app.use((error, request, response, next) => {
//   if (error.status) {
//     response.status(error.status).send(error.message);
//   } else {
//     console.error(`ERROR: ${error.message}`);
//     response.status(500).send('Internal Server Error');
//   }
// });

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
