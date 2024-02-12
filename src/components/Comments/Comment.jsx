import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom'

function Comment({comment, deleteComment}) {
    const {id, name, message, created} = comment

    const navigate = useNavigate()

    const date = new Date(created)
    const formattedDate = new Intl.DateTimeFormat('en-US').format(date)

    const handleClickDelete = () => {
        deleteComment(id)
    }

    const handleClickEdit = () => {
        navigate(`/edit/${id}`)
    }

    return ( 
        <Card className="comment" variant="outlined">
            <CardActions className="comment_header">
                <Button size='small' className='comment_header_delete' onClick={handleClickDelete}>DELETE</Button>
                <Button size='small' className='comment_header_edit' onClick={handleClickEdit}>EDIT</Button>
            </CardActions>
            <CardContent>
                <Typography>{message}</Typography>
                <Typography>{name} on {formattedDate}</Typography>
            </CardContent>
            
        </Card>
    );
}

export default Comment;