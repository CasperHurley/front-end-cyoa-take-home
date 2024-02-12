import CommentForm from "../components/Comments/CommentForm";
import CommentFeed from "../components/Comments/CommentFeed";
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

function HomePage({comments, submitComment, deleteComment, ReadyState, readyState, deleteAllComments}) {
    // Could add an "Are you sure?" before allowing delete all to happen
    return (
        <Grid container spacing={2} direction="column">
            <Grid item>
                <CommentForm submitComment={submitComment} />
            </Grid>
            <Grid item>
                <CommentFeed comments={comments} deleteComment={deleteComment} />
            </Grid>
            {readyState === ReadyState.OPEN && <Grid item><Button variant="outlined" color="error" onClick={deleteAllComments}>Delete All Comments</Button></Grid>}
        </Grid>
    );
}

export default HomePage;