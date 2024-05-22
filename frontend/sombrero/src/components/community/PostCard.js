import React, { useEffect, useState } from 'react';
import { Card, CardHeader, Box, CardContent, CardActions, Avatar, Typography, IconButton, Collapse, TextField, Button, InputAdornment,CircularProgress } from '@mui/material';
import { Share as ShareIcon, Bookmark as BookmarkIcon, MoreVert as MoreVertIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles'; 
import { Link } from 'react-router-dom';
import Divider from "@mui/material/Divider";
import { getUser } from '../../services/UserService';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard = ({ post, replies }) => {
  const {authorId, type, date, title, content, image, id} = post;
  const [userName, setUserName] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    console.log(`Yorum: ${comment}`);
    setComment('');
  };

  const truncateContent = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  useEffect(() => {
    try {
      getUser(6).then(user => {
        setUserName(user.name);
      });
    } catch (error) {
      console.error(error);
    }
  }
  , [userName, authorId]);


  return (
    <Card sx={{ mb: 2, borderRadius: '20px', border: '1px solid #ff7e5f' }}>
      <CardHeader style={{ marginTop: '10px', marginLeft: '10px' }}
        avatar={<Link to={`/user/${userName}`} style={{ textDecoration: 'none', color: 'inherit' }}>{<Avatar/>}</Link>}
        title={<Link to={`/user/${userName}`} style={{ textDecoration: 'none', color: 'inherit' }}>{userName}</Link>}
        subheader={new Date(date).toLocaleDateString()}
      />
      <CardContent>
        <Link to={`/post/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h5" component="div" style={{ marginLeft: '10px', marginBottom: '10px' }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '20px'  }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {truncateContent(content, 300)}
              </Typography>
            </Box>
            {image && (
              <Box sx={{ marginLeft: '10px' }}>
                <img src={image} alt="Post thumbnail" style={{ width: '100px', marginRight: '10px' }} />
              </Box>
            )}
          </Box>
        </Link>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="bookmark">
          <BookmarkIcon />
        </IconButton>
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Divider />
            <Box mt={2}>
              {replies.map(reply => (
                <Box key={reply.id} sx={{ mt: 1, pl: 2, borderLeft: '2px solid #ccc' }}>
                  <Typography variant="body2" color="text.secondary"><strong>{reply.name}: </strong> {content}</Typography>
                </Box>
              ))}
            </Box>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a comment"
            value={comment}
            onChange={handleCommentChange}
            sx={{ 
              mt: 2,
              borderRadius: '20px',
              '& fieldset': {
                borderRadius: '20px',
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleCommentSubmit} 
                    sx={{ 
                      borderRadius: '20px',
                      marginRight: '-1px',
                      backgroundColor: "#feb31d", '&:hover': {  backgroundColor: "#ffca28"}
                    }}
                  >
                    Submit
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;