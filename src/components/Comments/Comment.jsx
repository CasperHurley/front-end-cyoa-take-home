import { Link } from 'react-router-dom'

function Comment({comment, deleteComment}) {
    const {id, name, message, created} = comment

    const date = new Date(created)
    const formattedDate = new Intl.DateTimeFormat('en-US').format(date)

    const handleClickDelete = () => {
        deleteComment(id)
    }

    return ( 
        <div className="comment">
            <div className="comment_header">
                <button className='comment_header_delete' onClick={handleClickDelete}>DELETE</button>
                <Link to={`/edit/${id}`}>EDIT</Link>
            </div>
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