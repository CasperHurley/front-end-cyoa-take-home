import './App.css';
import CommentFeed from './components/CommentFeed';
import NewCommentForm from './components/NewCommentForm';

function App() {

  return (
    <div className="App">
      <NewCommentForm />
      <CommentFeed />
    </div>
  );
}

export default App;
