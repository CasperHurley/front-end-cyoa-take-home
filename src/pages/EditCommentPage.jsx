import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Api } from '../api/index'
import CommentForm from '../components/Comments/CommentForm'

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
        <>
            <h1>Edit Comment</h1>
            <CommentForm 
                comment={comment.data} 
                editComment={editComment}
            />
            <button onClick={() => deleteComment(id)}>DELETE</button>
        </>
    );
}

export default EditCommentPage;