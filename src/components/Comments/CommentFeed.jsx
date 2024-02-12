import { useState } from 'react'
import Comment from './Comment'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import orderBy from 'lodash/orderBy'

function CommentFeed({comments, deleteComment}) {
    const [sortDirection, setSortDirection] = useState('asc') // add selector for 'asc' or 'desc'
    
    return (
        <Stack id='comments-feed' spacing={2}>
            {
                comments.data ? 
                orderBy(comments.data, ['created'], [sortDirection]).map(comment => (
                    <Paper key={comment.id}>
                        <Comment 
                            comment={comment}
                            deleteComment={deleteComment}
                        />  
                    </Paper>
                ))
                :
                <Paper>No comments available</Paper>
            }
        </Stack>
    );
}

export default CommentFeed;