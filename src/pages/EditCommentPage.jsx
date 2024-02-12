import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Api } from '../api/index'
import CommentForm from '../components/Comments/CommentForm'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function EditCommentPage({editComment, deleteComment}) {
    const [comment, setComment] = useState({data: {}, error: null, isLoading: false})
    const { id } = useParams()

    useEffect(() => {
        getComment()
    }, [])

    const getComment = () => {
        setComment(prev => ({...prev, isLoading: true}))
        Api.get(`/api/comment/${id}`)
        .then(data => {
            console.log("data", data)
            setComment(prev => ({...prev, data}))
        })
        .catch(error => {
            console.log("Error fetching comment", error)
            setComment(prev => ({...prev, error}))
        })
        .finally(() => {
            setComment(prev => ({...prev, isLoading: false}))
        })
    }

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Typography variant="h5">Edit Comment</Typography>
            </Grid>
            <Grid item>
                <CommentForm 
                    comment={comment.data} 
                    editComment={editComment}
                />
            </Grid>
            <Grid item>
                <Button variant="outlined" color="error" onClick={() => deleteComment(id)}>Delete</Button>
            </Grid>
        </Grid>
    );
}

export default EditCommentPage;