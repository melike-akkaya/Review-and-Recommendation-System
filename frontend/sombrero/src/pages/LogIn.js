import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Header from "./Header";
import { sendLogInRequest } from "../services/AuthenticationService";
import { getUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState(" ");
  const [alert, setAlert] = useState({
    open: false,
    severity: "error",
    message: "",
  });
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogIn = async () => {
    //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //  if (!emailRegex.test(email)) {
    //    setEmailError("Invalid e-mail address");
    //    return;
    //  }
    try {
      const response = await sendLogInRequest({
        email: email,
        password: password,
      });

      const userResponse = await getUser(email);

      const userData = userResponse.data;

      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error:", error);
    }

    navigate("/");
  };

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail)) {
      setEmailError("Invalid e-mail address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUpClick = () => {
    window.location.href = "/signup";
  };

  const handleSignUpasMerchantClick = () => {
    window.location.href = "/signupasmerchant";
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #ffcc97, #4d7fff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "105vh",
      }}
    >
      <Header />
      <Card
        sx={{
          width: 500,
          margin: "20px",
          borderRadius: 5,
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          border: "1px solid #4d7fff",
        }}
      >
        <CardHeader
          title="Log In"
          sx={{
            fontSize: "64px",
            textAlign: "center",
            marginTop: "10px",
            color: "#4d7fff",
            fontWeight: "bold",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Divider />
          <Box
            sx={{
              marginX: "50px",
              marginY: "10px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                sx={{ m: 1, width: "40ch", marginTop: "15px" }}
                required
                id="outlined-required"
                label="Email"
                onChange={handleEmailChange}
                error={emailError !== ""}
                helperText={emailError}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FormControl
                sx={{ m: 1, width: "40ch", marginTop: "15px" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={handlePasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
          </Box>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                margin: "20px",
                borderRadius: "8px",
                backgroundColor: "#4d7fff",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#3a63cc",
                },
              }}
              size="medium"
              variant="contained"
              onClick={handleLogIn}
            >
              Log In
            </Button>
          </div>
          <Divider />
          <Box sx={{ flexGrow: 1, textAlign: "left" }}>
            <Link
              href="#"
              underline="hover"
              component="button"
              variant="body2"
              sx={{ textAlign: "left" }}
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Forgot Password?
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              textAlign: "right",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Link
              href="#"
              underline="hover"
              component="button"
              variant="body2"
              sx={{ textAlign: "right", marginBottom: "15px" }}
              onClick={handleSignUpClick}
            >
              Sign Up
            </Link>
            <Link
              href="#"
              underline="hover"
              component="button"
              variant="body2"
              sx={{ textAlign: "right" }}
              onClick={handleSignUpasMerchantClick}
            >
              Sign Up as Merchant
            </Link>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={alert.open}
        autoHideDuration={5000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleAlertClose}
          severity={alert.severity}
        >
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
