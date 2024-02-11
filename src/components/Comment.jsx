function Comment({comment}) {
    const {id, name, message, created} = comment

    const date = new Date(created)
    const formattedDate = new Intl.DateTimeFormat('en-US').format(date)


    const deleteComment = () => {
        // DELETE /:id
    }

    return ( 
        <div className="comment">
            <div className="comment_message">{message}</div>
            <div className="comment_footer">
                <div className="comment_footer_name">{name}</div>
                <div>on</div>
                <div className="comment_foooter_date">{formattedDate}</div>
            </div>
        </div>
    );
}

export default Comment;