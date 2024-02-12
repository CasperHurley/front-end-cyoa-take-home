import CommentForm from "../components/Comments/CommentForm";
import CommentFeed from "../components/Comments/CommentFeed";

function HomePage({comments, submitComment, deleteComment, ReadyState, readyState, deleteAllComments}) {
    return (
        <>
            <CommentForm submitComment={submitComment} />
            <CommentFeed comments={comments} deleteComment={deleteComment} />
            {readyState === ReadyState.OPEN && <button onClick={deleteAllComments}>Delete All Comments</button>}
        </>
    );
}

export default HomePage;