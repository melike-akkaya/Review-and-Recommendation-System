import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser } from "../../services/UserService";

const UserGridCard = ({ user, handleCardClick, isAdmin }) => {
  // Determine the background color based on the user's role
  let roleColor = '#00e676'; // Green for user by default
  switch (user.role) {
    case 'INFLUENCER':
      roleColor = '#2962ff'; // Blue for influencer
      break;
    case 'ADMIN':
    case 'COMMUNITY_MODERATOR':
      roleColor = '#ff1744'; // Red for admin and moderator
      break;
    default:
      roleColor = '#00e676'; // Green for user
  }

  const handleEdit = (userId) => {
    // Define the logic to handle the edit action
    console.log("Edit user with ID:", userId);
  };

  const handleDelete = async (userId) => {
    try {
      // Call the deleteUser function from the UserService
      await deleteUser(userId);
      console.log("User deleted successfully with ID:", userId);
      // Implement logic to refresh the users list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Card 
      elevation={3} 
      key={user.id} 
      sx={{
        width: '100%',
        backgroundColor: '#f0f0f0',
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: '#e0e0e0',
          cursor: 'pointer',
        },
      }} 
      //onClick={() => handleCardClick(user.id)}
    >
      <CardContent>
          <img
          src={`data:image/jpeg;base64,${user.image}`}
          style={{
            height: "240px",
            width: "100%",
            objectFit: "cover",
          }}
        />
        <Typography variant="h5" component="div">
          {user.name} {user.surname}
        </Typography>
        <Typography color="text.secondary">
          Country: {user.country}
        </Typography>
        <Typography 
          color="text.primary"
          sx={{
            backgroundColor: roleColor,
            display: 'inline',
            padding: '2px 6px',
            borderRadius: '4px',
            marginTop: '8px',
          }}
        >
          {user.role.toUpperCase()}
        </Typography>
        {}
      </CardContent>

      {isAdmin && (
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button
            size="small"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(user.id)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(user.id)}
          >
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default UserGridCard;
