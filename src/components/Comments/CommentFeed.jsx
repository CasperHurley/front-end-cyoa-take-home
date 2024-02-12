import Comment from './Comment'

function CommentFeed({comments, deleteComment}) {
    // make it scroll
    
    return (
        <div id='comments-feed'>
            {
                comments.data ? 
                comments.data.map(comment => (
                    <Comment 
                        key={comment.id}
                        comment={comment}
                        deleteComment={deleteComment}
                    />
                ))
                :
                <div>No comments available</div>
            }
        </div>
    );
}

export default CommentFeed;