import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CommentForm({comment = {}, editComment, submitComment}) {
    const [nameInput, setNameInput] = useState("")
    const [messageInput, setMessageInput] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        setNameInput(comment.name)
        setMessageInput(comment.message)
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
        <div id='new-comment-form'>
            <h2>Name</h2>
            <input value={nameInput} onChange={e => setNameInput(e.target.value)}/>
            <textarea value={messageInput} onChange={e => setMessageInput(e.target.value)} />
            <button onClick={handleClickSubmit}>{editComment ? "Update" : "Comment"}</button>
        </div>
    );
}

export default CommentForm;