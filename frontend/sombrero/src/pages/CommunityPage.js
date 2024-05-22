import React, { useState } from 'react';
import { Typography, Paper, Box , Button, ButtonGroup } from '@mui/material';
import PostCard from '../components/community/PostCard'; 
import Header from "./Header";
import MakePost from '../components/community/MakePost';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Divider from "@mui/material/Divider";
import {getPosts} from '../services/CommunityService';


const replies = [
  {
    id: 1,
    name: 'John Doe',
    post_id:1,
    date: '2023-05-20',
    content: 'This is the content of the first post. It will be truncated if it is too long.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    post_id:1,
    date: '2023-05-18',
    content: 'This is the content of the first post. It will be truncated if it is too long.',
  },
  {
    id: 1,
    name: 'John Doe',
    post_id:2,
    date: '2023-05-20',
    content: 'This is the content of the first post. It will be truncated if it is too long.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    post_id:2,
    date: '2023-05-18',
    content: 'This is the content of the first post. It will be truncated if it is too long.',
  },

]



const customTheme = extendTheme({
  typography: {
    h1: {
      background:
        'linear-gradient(-30deg, #ff7f00, #ffdf00)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontStyle: 'italic',
    },
  },
});

const CommunityPage = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [posts, setPosts] = useState([]);
  const handleButtonClick = (type) => {
    setSelectedType(type);
  };

  useState(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = selectedType === 'All' ? posts : posts.filter(post => post.type === selectedType);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(45deg, #ffaf80, #ffcc97, #4d7fff, #55e7fc)' }}>
      <Header />
      <CssVarsProvider theme={customTheme}>
      <Box sx={(theme) => ({
        ...theme.typography.h1,
        fontSize: '4rem',
      })}>RRSS COMMUNITY</Box>
      </CssVarsProvider>
      <Box sx={{ my: 5, width: '100%', marginLeft: '100px' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: '20px', width: '55%', overflowY: 'auto' }}>
          <MakePost />
        </Paper>
      </Box>
      <Box sx={{ my: 3, width: '100%', marginLeft: '100px' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: '20px', width: '55%', overflowY: 'auto' , minHeight: '62vh' }}>
          <div
            style={{
              marginTop: "30px",
              marginBottom: "20px",
              textAlign: "center",
              color: "#ff6100",
            }}
          >
            <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
              Community Posts
            </Typography>
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '10vh', p: 4 }}>
            <ButtonGroup color="warning" variant="outlined" sx={{ mb: 4 }}>
              <Button onClick={() => handleButtonClick('All')} variant={selectedType === 'All' ? 'contained' : 'outlined'}>All</Button>
              <Button onClick={() => handleButtonClick('Q&A')} variant={selectedType === 'Q&A' ? 'contained' : 'outlined'}>Q&A</Button>
              <Button onClick={() => handleButtonClick('Blog')} variant={selectedType === 'Blog' ? 'contained' : 'outlined'}>Blog</Button>
              <Button onClick={() => handleButtonClick('Discussion')} variant={selectedType === 'Discussion' ? 'contained' : 'outlined'}>Discussion</Button>
              <Button onClick={() => handleButtonClick('Local Event')} variant={selectedType === 'Local Event' ? 'contained' : 'outlined'}>Local Event</Button>
            </ButtonGroup>
          </Box>
            {filteredPosts.map(post => (
              <Box key={post.id} mb={4} sx={{ maxWidth: '800px' }}>
                <PostCard post={post} replies={replies.filter(reply => reply.post_id === post.id)}/>
              </Box>
            ))}
        </Paper>
      </Box>
    </Box>
  );
};


export default CommunityPage;