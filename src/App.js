import { useState, useEffect } from 'react'
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'
import EditCommentPage from './pages/EditCommentPage';
import Grid from '@mui/material/Grid'

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

  const editComment = ({id, name, message}) => {
    sendMessage(JSON.stringify({type: 'editComment', id, name, message }))
  }

  // NEED

  // NICE
    // Accessibility
    // Integration testing
    // Profanity check
    // Intl
    // Global header
    // Some css razzle dazzle

  return (
    <Router>
      <Grid container className="App" direction="column">
        <Grid>
          <Routes>
            <Route exact path="/" 
              element={
                <HomePage 
                  comments={comments}
                  submitComment={submitComment}
                  deleteComment={deleteComment}
                  ReadyState={ReadyState}
                  readyState={readyState}
                  deleteAllComments={deleteAllComments}
                />
              } 
            />
            <Route path="/edit/:id" 
              element={
                <EditCommentPage 
                  editComment={editComment}
                  deleteComment={deleteComment}
                />
              }
            />
          </Routes>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
