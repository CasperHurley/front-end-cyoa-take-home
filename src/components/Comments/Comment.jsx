import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../util/CommentUtil/CommentUtil'

function Comment({comment, deleteComment}) {
    const {id, name, message, created, updated} = comment // could use updated if we wanted to show edited @ time

    const navigate = useNavigate()

    const handleClickDelete = () => {
        deleteComment(id)
    }

    const handleClickEdit = () => {
        navigate(`/edit/${id}`)
    }

    return ( 
        <Card className="comment" variant="outlined">
            <CardActions className="comment_header">
                <Grid container justifyContent={'end'}>
                    <Grid item>
                        <Button size='small' className='comment_header_edit' data-testid={`edit-comment-button-${id}`} onClick={handleClickEdit}>EDIT</Button>
                    </Grid>
                    <Grid item>
                        <Button size='small' className='comment_header_delete' onClick={handleClickDelete}>DELETE</Button>
                    </Grid>
                </Grid>
            </CardActions>
            <CardContent>
                <Grid container direction="column" spacing={2}>
                    <Grid item alignSelf={'center'}>
                        <Typography>{message}</Typography>
                    </Grid>
                    <Grid item alignSelf={'flex-start'}>
                        <Typography>{name} on {formatDate(created)}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Comment;