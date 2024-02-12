import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

function CommentForm({comment, editComment, submitComment}) {
    const [nameInput, setNameInput] = useState("")
    const [messageInput, setMessageInput] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        if (comment) {
            setNameInput(comment.name)
            setMessageInput(comment.message)
        }
    }, [comment])

    const handleClickSubmit = () => {
        if (editComment) {
            editComment({...comment, name: nameInput, message: messageInput})
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

    return (
        <Box 
            id='comment-form'
            component="form"
        >
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField 
                        label="Name"
                        data-testid="comment-name-input"
                        // helperText="Enter your name"
                        value={nameInput} 
                        onChange={e => setNameInput(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField  
                        label="Message"
                        data-testid="comment-message-input"
                        multiline
                        // helperText="Write your message"
                        value={messageInput} 
                        onChange={e => setMessageInput(e.target.value)} 
                    />
                </Grid>
                <Grid item>
                    <Button data-testid="comment-submit-button" variant="outlined" onClick={handleClickSubmit}>{editComment ? "Update" : "Comment"}</Button>
                </Grid>
            </Grid>
            
        </Box>
    );
}

export default CommentForm;