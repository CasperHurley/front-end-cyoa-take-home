import { useState } from 'react'
import './App.css';
import CommentFeed from './components/CommentFeed';
import NewCommentForm from './components/NewCommentForm';
import { Api } from './api/index'

function App() {
  const [deleteStatus,  setDeleteStatus] = useState({isError: false, inProgress: true})

  const deleteAllComments = () => {
    Api.delete('/deleteAllComments')
    .then(response => {
      console.log("Success deleting all comments")
    })
    .catch(error => {
      console.log("Error deleting all comments", error)
      setDeleteStatus(prev => ({...prev, isError: true}))
    })
    .finally(() => {
      setDeleteStatus(prev => ({...prev, inProgress: false}))
    })
  }

  // NEED
    // a use for GET /getComment endpoint
      // edit comment page? 
  
  // NICE
    // Accessibility
    // Integration testing
    // Profanity check
    // Intl
    // Global header
    // Some css razzle dazzle

  return (
    <div className="App">
      <NewCommentForm />
      <CommentFeed />
      <button onClick={deleteAllComments}>Delete All Comments</button>
    </div>
  );
}

export default App;
