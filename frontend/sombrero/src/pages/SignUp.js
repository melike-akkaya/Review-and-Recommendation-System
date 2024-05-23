import * as React from "react";
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
import Header from "./Header";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import CreateIcon from "@mui/icons-material/Create";
import { fetchCountries } from "../commonMethods";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [image, setImage] = React.useState('/broken-image.jpg');
  const [emailError, setEmailError] = React.useState(false);
  const [countries, setCountries] = React.useState([]);
  const [country, setCountry] = React.useState(""); 

  React.useEffect(() => {
    fetchCountries(setCountries);
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogInClick = () => {
    window.location.href = "/login";
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };
 
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setEmailError(!validateEmail(emailValue));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    console.log(name, surname, email, password, country); 
  };

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 30,
    height: 30,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  return (
    <Box
      sx={{
        background: 'linear-gradient(45deg, #ffcc97, #4d7fff, #55e7fc)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "105vh",
      }}
    >
      <Header />
      <Card
        sx={{
          width: 700,
          margin: "20px",
          borderRadius: 5,
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          border: '1px solid #4d7fff'
        }}
      >
        <CardHeader
          title="Sign Up"
          sx={{
            fontSize: "64px",
            textAlign: "center",
            marginTop: "10px",
            color: "#4d7fff",
            fontWeight: 'bold',
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "50%", padding: "10px" }}>
              <Divider />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  sx={{ m: 1, width: "30ch", margin: "16px" }}
                  required
                  id="outlined-required"
                  label="Name"
                  size="small"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  sx={{ m: 1, width: "30ch", margin: "16px" }}
                  required
                  id="outlined-required"
                  label="Surname"
                  size="small"
                  value={surname}
                  onChange={handleSurnameChange}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                  sx={{ m: 1, width: "30ch", margin: "16px" }}
                  required
                  id="outlined-required"
                  label="Email"
                  type="email"
                  size="small"
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={emailError ? "Please enter a valid email address" : ""}
                />
              </div>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ width: "50%", padding: "10px" }}>
              <div>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="contained-button-file"
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="contained-button-file">
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <SmallAvatar>
                        <CreateIcon />
                      </SmallAvatar>
                    }
                  >
                    <Button component="span">
                      <Avatar
                        src={image}
                        sx={{ bgcolor: blue[200], width: 86, height: 86 }}
                      />
                    </Button>
                  </Badge>
                </label>
              </div>
              <FormControl
                sx={{ m: 1, width: "30ch", marginLeft: "25px" , marginBottom: "12px"}}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
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
              <FormControl fullWidth required size="small" sx={{ m: 1, width: "30ch", marginLeft: "25px", marginTop: "3px" }}>
                <InputLabel>Country</InputLabel>
                <Select
                  value={country} 
                  onChange={handleCountryChange}
                  label="Country"
                  variant="outlined"
                >
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Divider />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                margin: "20px",
                borderRadius: "8px",
                backgroundColor: "#4d7fff", 
                color: "#fff", 
                '&:hover': {
                  backgroundColor: "#3a63cc", 
                },
              }}
              size="medium"
              variant="contained"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </div>
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
              sx={{ textAlign: "right" }}
              onClick={handleLogInClick}
            >
              Already have an account? Log in
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}