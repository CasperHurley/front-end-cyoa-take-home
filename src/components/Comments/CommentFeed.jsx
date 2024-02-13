import Comment from './Comment'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import orderBy from 'lodash/orderBy'
import isEmpty from 'lodash/isEmpty'

function CommentFeed({comments, deleteComment}) {
    return (
        <Stack className='comments-feed' spacing={2} sx={{ height: '40vh', overflow: 'scroll' }}>
            {
                !isEmpty(comments.data) ? 
                orderBy(comments.data, ['created'], ['desc']).map(comment => (
                    <Paper key={comment.id}>
                        <Comment 
                            comment={comment}
                            deleteComment={deleteComment}
                        />  
                    </Paper>
                ))
                :
                <Typography>No comments available</Typography>
            }
        </Stack>
    );
}

export default CommentFeed;