import React, { useState } from 'react';
import { CardHeader, CardContent, TextField, Button, ButtonGroup, Typography} from '@mui/material';
import { addPost } from '../../services/CommunityService';
import { fileToBlob } from "../../commonMethods";

const MakePost = () => {
  const initialPostState = {
    type: '',
    title: '', 
    content: '',
    media: null,
  };

  const [type, setPostType] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [media, setMedia] = useState(" ");
  const [post, setPost] = useState(initialPostState);
  const [showMessage, setShowMessage] = useState(false);

  

  const handlePostTypeSelect = (type) => {
    setPostType(type);
  };

  const handleContentChange = (event) => {
    setContent(post.content = event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(post.title = event.target.value);
  };


  const handleAddMediaClick =  () => {
    
  }  


  const handlePublishClick = async() => {
    try {
      setPost({ type, content });
      const formData = new FormData();
      formData.append("post", JSON.stringify(post));
      formData.append("image", null);
      await addPost(formData);
      setPost(initialPostState);
      setShowMessage(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CardHeader
        title="Make a Post"
        titleTypographyProps={{ sx: { fontSize: '2rem' , color: "#0059dc", fontWeight: 'bold'} }}
        action={
          <ButtonGroup
          variant="contained"
          aria-label="post type"
          sx={{ backgroundColor: '#d4ecf4' }} 
        >
          <Button
            variant={type === 'Q&A' ? 'contained' : 'outlined'}
            onClick={() => handlePostTypeSelect('Q&A')}
            sx={{ textTransform: 'none', backgroundColor: type === 'Q&A' ? '#3074d8' : '#e4f7ff', '&:hover': { backgroundColor: '#e4f7ff' } }}
          >
            Q&A
          </Button>
          <Button
            variant={type === 'Blog' ? 'contained' : 'outlined'}
            onClick={() => handlePostTypeSelect('Blog')}
            sx={{ textTransform: 'none', backgroundColor: type === 'Blog' ? '#3074d8' : '#e4f7ff', '&:hover': { backgroundColor: '#e4f7ff' } }}
          >
            Blog
          </Button>
          <Button
            variant={type === 'Discussion' ? 'contained' : 'outlined'}
            onClick={() => handlePostTypeSelect('Discussion')}
            sx={{ textTransform: 'none', backgroundColor: type === 'Discussion' ? '#3074d8' : '#e4f7ff', '&:hover': { backgroundColor: '#e4f7ff' } }}
          >
            Discussion
          </Button>
          <Button
            variant={type === 'Local Event' ? 'contained' : 'outlined'}
            onClick={() => handlePostTypeSelect('Local Event')}
            sx={{ textTransform: 'none', backgroundColor: type === 'Local Event' ? '#3074d8' : '#e4f7ff', '&:hover': { backgroundColor: '#e4f7ff' } }}
          >
            Local Event
          </Button>
        </ButtonGroup>
        }
      />
      <CardContent>
        <TextField
              fullWidth
              multiline
              rows={1} 
              value={title}
              onChange={handleTitleChange}
              placeholder="Write your post Title here..."
              sx ={{width: "400px", marginBottom: '10px'}}
        />

        <TextField
            fullWidth
            multiline
            rows={3}
            rowsMax={10} 
            value={content}
            onChange={handleContentChange}
            placeholder="Write your post content here..."
        />
        <Button 
          variant="outlined" 
          onClick={handleAddMediaClick} 
          size="medium"
          sx={{ 
            mt: 2, mr: 2, borderRadius: "8px",color: "#e4f7ff'", borderColor: "#e4f7ff'", '&:hover': {  borderColor: "#e4f7ff'",  backgroundColor: "rgba(255, 202, 40, 0.1)" }
          }}
        >
          Add Media
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ borderRadius: "8px", mt: 2, backgroundColor: "#4d7fff", '&:hover': {  backgroundColor: "#38bbf3"}}}
          size="medium"
          onClick={handlePublishClick}
        >
          Publish
        </Button>
        {showMessage && (
          <Typography 
            variant="body2" 
            sx={{ mt: 1, color: "#b1b1b1" }}
          >
            Media added.
          </Typography>
        )}
      </CardContent>
    </>
  );
};

export default MakePost;