import { useState, useEffect } from 'react'
import './App.css';
import CommentFeed from './components/CommentFeed';
import NewCommentForm from './components/NewCommentForm';
import { Api } from './api/index'
import useWebSocket, { ReadyState } from 'react-use-websocket';

function App() {
  const [comments, setComments] = useState({data: [], error: null, isLoading: false})

  const SOCKET_URL = 'ws://localhost:3001/comments';

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    SOCKET_URL, 
      {
          onMessage: (event) => {
              const updatedComments = JSON.parse(event.data);
              setComments((prev) => ({ ...prev, data: updatedComments }));
          },
          shouldReconnect: (closeEvent) => true,
          reconnectAttempts: 10,
          reconnectInterval: (attemptNumber) => Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
      } 
  );

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      console.log("lastMessage", lastMessage)
      if (data.type === 'comments') {
        setComments(prev => ({...prev, data: data.comments}));
      }
    }
  }, [lastMessage]);

  const submitComment = (name, message) => {
    sendMessage(JSON.stringify({ type: 'createComment', name, message }));
  }

  const deleteAllComments = () => {
    sendMessage(JSON.stringify({ type: 'deleteAllComments' }));
  }

  const deleteComment = (id) => {
    sendMessage(JSON.stringify({type: 'deleteComment', id }))
  }

  const getComment = (id) => {
    Api.get(`/api/comment/${id}`)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log("Error fetching comment", error)
    })
  }

  // NEED
    // a use for GET /getComment endpoint
      // edit comment page? new message from name alert? Even then doesn't make as much sense as just grabbing from the updated comments feed...
  
  // NICE
    // Accessibility
    // Integration testing
    // Profanity check
    // Intl
    // Global header
    // Some css razzle dazzle
  console.log("READY STATE", readyState)

  return (
    <div className="App">
      <NewCommentForm submitComment={submitComment} />
      <CommentFeed comments={comments} />
      {readyState === ReadyState.OPEN && <button onClick={deleteAllComments}>Delete All Comments</button>}
    </div>
  );
}

export default App;
