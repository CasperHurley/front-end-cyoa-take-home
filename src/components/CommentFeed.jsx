import { useState, useEffect } from 'react' 
import Comment from './Comment'
import { Api } from '../api/index'

function CommentFeed() {
    const [comments, setComments] = useState({data: [], error: null, isLoading: false})

    useEffect(() => {
        setComments(prev => ({...prev, isLoading: true}))
        Api.get('/getComments').then(response => {
            setComments(prev => ({...prev, data: response.data}))
        })
        .catch(error => {
            console.log("Error fetching comments", error)
            setComments(prev => ({...prev, error}))
        })
        .finally(() => {
            setComments(prev => ({...prev, isLoading: false}))
        })
    }, [])

    return (
        <div id='comments-feed'>
            {
                comments.data ? 
                comments.data.map(comment => (
                    <Comment 
                        key={comment.id}
                        comment={comment}
                    />
                ))
                :
                <div>No Comments Available</div>
            }
        </div>
    );
}

export default CommentFeed;