import { useState } from 'react'
import { Api } from '../api/index' 

function NewCommentForm() {
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    // add one for call status? (success or error, reset on click submit again)

    const submitComment = () => {
        // POST /createComment
        Api.post('/createComment', {name, message})
        .then(response => {
            console.log("RESP", response)
            // notify success
            // comment feed should update automatically from websocket connection
        })
        .catch(err => {
            // notify error
            console.error("Error submitting new comment", err)
        })
    }

    return (
        <div id='new-comment-form'>
            <h2>Name</h2>
            <input value={name} onChange={e => setName(e.target.value)}/>
            <textarea value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={submitComment}>Comment</button>
        </div>
    );
}

export default NewCommentForm;