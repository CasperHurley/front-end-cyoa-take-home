import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

function CommentForm({commentResp, editComment, submitComment, deleteComment}) {
    const [nameInput, setNameInput] = useState("")
    const [messageInput, setMessageInput] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        if (commentResp?.data) {
            setNameInput(commentResp.data.name)
            setMessageInput(commentResp.data.message)
        }
    }, [commentResp])

    const handleClickSubmit = () => {
        if (commentResp?.data) {
            editComment({...commentResp.data, name: nameInput, message: messageInput})
            navigate('/')
        } else {
            submitComment(nameInput, messageInput)
            resetFormData()
        }
    }
    
    const resetFormData = () => {
        setNameInput("")
        setMessageInput("")
    }

    // Could maybe do more to make sure this is screen reader accessible

    return (
        <Box 
            className='comment-form'
            component="form"
        >
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField 
                        label="Name"
                        fullWidth
                        value={nameInput} 
                        onChange={e => setNameInput(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField  
                        label="Message"
                        fullWidth
                        multiline
                        rows={4}
                        value={messageInput} 
                        onChange={e => setMessageInput(e.target.value)} 
                    />
                </Grid>
                <Grid item>
                    <Grid container justifyContent={'end'} spacing={2}>
                        <Grid item>
                            <Button 
                                data-testid="comment-submit-button" 
                                variant="outlined" 
                                onClick={handleClickSubmit}
                                disabled={!nameInput || !messageInput || commentResp?.error}
                            >{editComment ? "Update" : "Comment"}</Button>
                        </Grid>
                        {
                            commentResp && 
                            <Grid item>
                                <Button disabled={commentResp.error} variant="outlined" color="error" onClick={() => deleteComment(commentResp.data?.id)}>Delete</Button>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
            
        </Box>
    );
}

export default CommentForm;