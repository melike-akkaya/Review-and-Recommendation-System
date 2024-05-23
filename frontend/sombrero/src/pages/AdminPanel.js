import React, { useState, useEffect } from "react";
import { Stack, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import UserGridCard from "../components/user/UserGridCard";
import { getAllUsers } from "../services/UserService";
import AddUserDialog from "../components/user/AddUserDialog";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [isAddUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleCardClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  const refreshUsers = () => {
    getAllUsers()
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  };

  return (
    <Header>
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ marginTop: "20px", paddingLeft: "50px" }}
      >
        <Button
            variant="contained"
            onClick={() => setAddUserDialogOpen(true)}
            sx={{
            backgroundColor: 'lightgray',
            color: 'black',
            fontSize: '16px',
            padding: '10px 20px',
            width: '200px',
            '&:hover': {
                backgroundColor: 'gray',
                color: 'white',
            },
            }}
        >
            Add User
        </Button>
        <Grid container spacing={2} justifyContent="center">
          {users.map((user) => (
            <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
              <UserGridCard
                user={user}
                isAdmin={true}
                handleCardClick={handleCardClick}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <AddUserDialog
        open={isAddUserDialogOpen}
        setOpen={setAddUserDialogOpen}
        refreshUsers={refreshUsers}
      />
    </Header>
  );
};

export default AdminPanel;
