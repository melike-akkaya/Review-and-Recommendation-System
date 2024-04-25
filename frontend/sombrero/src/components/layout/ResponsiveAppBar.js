import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import rrssIcon from "../../assets/rrss-logo-trans.png";
import ButtonGroup from "@mui/material/ButtonGroup";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { getCategories } from "../../services/CategoryService";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
}));

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleRRSSClick = () => {
    window.location.href = "/"; // Redirect to the home page
  };

  const handleProfileClick = () => {
    handleCloseUserMenu(); // Close the settings menu
    window.location.href = "/merchant"; // Redirect to the merchant page
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#c8d6e5" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <StyledTypography
              variant="h6"
              sx={{ mr: 2, flexGrow: 1 }}
              onClick={handleRRSSClick}
            >
              <img
                src={rrssIcon}
                alt="RRSS"
                style={{ height: "30px", marginRight: "5px" }}
              />
            </StyledTypography>

            <ButtonGroup variant="text" aria-label="Basic button group">
              {categories.map((category, index) => (
                <Button
                  key={category.id}
                  sx={{
                    fontSize: "0.9rem",
                    color: "#222f3e",
                    "&:hover": { color: "#01a3a4" },
                    ml: index > 0 ? 1 : 0,
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon style={{ color: "#222f3e" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              style={{ color: "#222f3e" }}
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
            />
          </Search>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* Include the handleProfileClick function for the Profile MenuItem */}
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              {settings
                .filter((setting) => setting !== "Profile")
                .map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    {setting}
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
