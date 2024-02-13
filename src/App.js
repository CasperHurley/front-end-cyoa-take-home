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
import Typography from '@mui/material/Typography'

function App() {
  const [comments, setComments] = useState({data: [], error: null, isLoading: false})

  const SOCKET_URL = 'ws://localhost:3001/comments';

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    SOCKET_URL, 
      {
          onOpen: () => {console.log("Connected to websocket")},
          onMessage: (event) => {
              const updatedComments = JSON.parse(event.data);
              setComments((prev) => ({ ...prev, data: updatedComments }));
          },
          onClose: () => {console.log("Connection closing")},
          onError: (err) => {console.log("Error with connection", err)},
          shouldReconnect: (closeEvent) => true,
          reconnectAttempts: 10,
          reconnectInterval: (attemptNumber) => Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
      } 
  );

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
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

  // I added this router to create a use for the getComment REST endpoint
    // Edit comment page takes in ID as param, fetches comment by ID

  return (
    <Router>
      <Grid container className="App" direction="column">
        <Grid item id="app_header">
          <Typography>Comments App</Typography>
        </Grid>
        <Grid item id="app_content">
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
