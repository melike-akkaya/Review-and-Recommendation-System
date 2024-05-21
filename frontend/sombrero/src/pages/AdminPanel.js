import React, { useState, useEffect } from "react";
import { Stack, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import UserGridCard from "../components/user/UserGridCard";
import { getAllUsers } from "../services/UserService";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleCardClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <Header>
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ marginTop: "20px", paddingLeft: "50px" }}
      >
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
    </Header>
  );
};

export default AdminPanel;
