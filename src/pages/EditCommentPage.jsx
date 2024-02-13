import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Api } from '../api/index'
import CommentForm from '../components/Comments/CommentForm'
import Grid from '@mui/material/Grid'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom'

function EditCommentPage({editComment, deleteComment}) {
    const [commentResp, setCommentResp] = useState({data: {}, error: null, isLoading: false})
    const { id } = useParams()

    useEffect(() => {
        fetchComment()
    }, [])

    const fetchComment = () => {
        setCommentResp(prev => ({...prev, isLoading: true}))
        Api.get(`/api/comment/${id}`)
        .then(data => {
            setCommentResp(prev => ({...prev, data}))
        })
        .catch(error => {
            console.log("Error fetching comment", error)
            setCommentResp(prev => ({...prev, error}))
        })
        .finally(() => {
            setCommentResp(prev => ({...prev, isLoading: false}))
        })
    }

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Breadcrumbs>
                    <Link to="/"><Typography>HOME</Typography></Link>
                    <Typography>EDIT</Typography>
                </Breadcrumbs>
            </Grid>
            {commentResp.error && <Grid item><Alert severity="error">Error fetching comment for editing.</Alert></Grid>}
            <Grid item>
                <Typography variant="h5">Edit Comment</Typography>
            </Grid>
            <Grid item>
                <CommentForm 
                    commentResp={commentResp} 
                    editComment={editComment}
                    deleteComment={deleteComment}
                />
            </Grid>
            
        </Grid>
    );
}

export default EditCommentPage;