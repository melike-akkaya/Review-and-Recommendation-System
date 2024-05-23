import React, { useEffect, useState } from 'react';
import { Button, Modal, TextField, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Grid } from '@mui/material';
import {
  getPosts,
  deletePost,
  updatePost,
} from '../services/CommunityService';
import Header from './Header';

const ModPanel = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const posts = await getPosts();
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  const handleSave = async () => {
    try {
      await updatePost(selectedPost.postId, { post: JSON.stringify(selectedPost) });
      fetchPosts();
      handleClose();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Header>
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ marginTop: "20px", paddingLeft: "50px", paddingRight: "50px" }}
      >
        <TableContainer component={Paper} sx={{ maxWidth: "1000px", margin: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.postId}>
                  <TableCell>{post.postId}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.content}</TableCell>
                  <TableCell>{post.authorId}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(post)}>Edit</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(post.postId)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ p: 2, bgcolor: 'background.paper', margin: 'auto', marginTop: '10%', width: 400 }}>
            <h2>Edit Post</h2>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={selectedPost?.title || ''}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Content"
              name="content"
              value={selectedPost?.content || ''}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
            />
            <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
          </Box>
        </Modal>
      </Stack>
    </Header>
  );
};

export default ModPanel;
