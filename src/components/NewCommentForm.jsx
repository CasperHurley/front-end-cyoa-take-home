import { useState } from 'react'

function NewCommentForm({submitComment}) {
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")

    const handleClickSubmit = () => {
        submitComment(name, message)
        resetFormData()
    }
    
    const resetFormData = () => {
        setName("")
        setMessage("")
    }

    return (
        <div id='new-comment-form'>
            <h2>Name</h2>
            <input value={name} onChange={e => setName(e.target.value)}/>
            <textarea value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={handleClickSubmit}>Comment</button>
        </div>
    );
}

export default NewCommentForm;