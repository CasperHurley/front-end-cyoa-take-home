import CommentForm from '../components/Comments/CommentForm'
import CommentFeed from '../components/Comments/CommentFeed'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

function HomePage({comments, submitComment, deleteComment, ReadyState, readyState, deleteAllComments}) {
    return (
        <Grid container spacing={2} direction="column">
            <Grid item>
                <Grid container direction="column"  alignContent={'center'} spacing={2}>
                    <Grid item>
                        <Typography variant="h5">Add Comment</Typography>
                    </Grid>
                    <Grid item sx={{width: "50vw"}}>
                        <CommentForm submitComment={submitComment} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <CommentFeed comments={comments} deleteComment={deleteComment} />
            </Grid>
            {readyState === ReadyState.OPEN && <Grid item><Button variant="outlined" color="error" onClick={deleteAllComments}>Delete All Comments</Button></Grid>}
        </Grid>
    );
}

export default HomePage;