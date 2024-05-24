import React, { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Autocomplete } from "@mui/material";
import { Alert } from "../alert/Alert";
import { sendSignUpRequest } from "../../services/AuthenticationService";
import { fetchCountries, fileToBlob, roles } from "../../commonMethods";

export default function AddUserDialog({ open, setOpen, refreshUsers }) {
  const initialUserState = {
    name: "",
    surname: "",
    password: "",
    country: "",
    email: "",
    role: "",
    image: null,
  };

  const [user, setUser] = useState(initialUserState);
  const [fileName, setFileName] = useState("");
  const [countries, setCountries] = useState([]);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [pendingAlertOpen, setPendingAlertOpen] = useState(false);

  useEffect(() => {
    fetchCountries(setCountries);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const resetUserState = () => {
    setUser(initialUserState);
    setFileName("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    const blob = await fileToBlob(file);

    setUser((prevUser) => ({
      ...prevUser,
      image: blob,
    }));
  };

  const handleSubmit = async () => {
    try {
      setPendingAlertOpen(true);

      if (
        user.name.trim() === "" ||
        user.surname.trim() === "" ||
        user.email.trim() === "" ||
        user.password.trim() === "" ||
        user.country.trim() === "" ||
        user.role.trim() === "" ||
        !/\S+@\S+\.\S+/.test(user.email)
      ) {
        setErrorAlertOpen(true);
        setPendingAlertOpen(false);
        return;
      }

      const userWithoutImage = { ...user, image: null };
      const formData = new FormData();
      formData.append("image", user.image);
      formData.append("signUpRequest", JSON.stringify(userWithoutImage));

      await sendSignUpRequest(formData);

      setSuccessAlertOpen(true);
      handleClose();
      refreshUsers();
      resetUserState();
    } catch (error) {
      console.error("Error adding user:", error);
      setErrorAlertOpen(true);
    } finally {
      setPendingAlertOpen(false);
    }
  };

  const buttonStyle = {
    backgroundColor: 'lightgray',
    color: 'black',
    fontSize: '16px',
    padding: '8px 16px',
    '&:hover': {
      backgroundColor: 'gray',
      color: 'white',
    },
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{ style: { padding: "1cm" } }}
      >
        <DialogTitle>Add User</DialogTitle>
        <Grid container spacing={2}>
          {[
            { name: "Name", type: "text" },
            { name: "Surname", type: "text" },
            { name: "Password", type: "password" },
            { name: "Country", type: "text" },
            { name: "Email", type: "email" },
            { name: "Role", type: "role" },
            { name: "Image", type: "file" },
          ].map((field) => (
            <Grid item xs={12} key={field.name}>
              {field.type === "file" ? (
                <div>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-file"
                    multiple
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="image-file">
                    <Button variant="contained" component="span" sx={buttonStyle}>
                      {user.image ? fileName : "Choose Image"}
                    </Button>
                  </label>
                </div>
              ) : field.name === "Country" ? (
                <Autocomplete
                  options={countries}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" fullWidth />
                  )}
                  onChange={(event, value) =>
                    handleChange({
                      target: { name: "country", value: value ? value.label : "" },
                    })
                  }
                /> 
            )  : field.type === "role" ? (
                <Autocomplete
                  options={roles}
                  renderInput={(params) => (
                    <TextField {...params} label="Role" fullWidth />
                  )}
                  onChange={(event, value) =>
                    handleChange({
                      target: { name: "role", value: value ? value : "" },
                    })
                  }
                />
              ) : (
                <TextField
                  label={field.name}
                  name={field.name.toLowerCase()}
                  fullWidth
                  type={field.type}
                  value={user[field.name.toLowerCase()]}
                  onChange={handleChange}
                />
              )}
            </Grid>
          ))}
          <Grid item xs={12} align="right">
            <Button onClick={handleClose} sx={buttonStyle}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={buttonStyle}>
              Add
            </Button>
          </Grid>
        </Grid>
        <Alert
          open={successAlertOpen}
          onClose={() => setSuccessAlertOpen(false)}
          severity="success"
          message="User added successfully"
        />
        <Alert
          open={errorAlertOpen}
          onClose={() => setErrorAlertOpen(false)}
          severity="error"
          message="Error adding user"
        />
        <Alert
          open={pendingAlertOpen}
          severity="info"
          message="Adding user..."
        />
      </Dialog>
    </div>
  );
}
