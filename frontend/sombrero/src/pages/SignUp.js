import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';
import Header from "./Header";
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import CreateIcon from '@mui/icons-material/Create';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }  

  const handleLogInClick = () => {
    window.location.href = "/login";
  };


  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 30,
    height: 30,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  return (
    <Box sx={{ backgroundColor: '#ebf1f6', display: 'flex', justifyContent: 'center' , alignItems: 'center', minHeight: '105vh' }}>
      <Header/>
      <Card sx={{ width: 700, margin: '20px', borderRadius: 5, flexDirection: 'column',  display: 'flex', justifyContent: 'center', padding: '10px'  }}>
        <CardHeader
            title="Sign Up"
            sx={{
              fontSize: '64px',
              textAlign: 'center', 
              marginTop:  '10px'
            }}
          />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '50%', padding: '10px' }}>
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField sx={{ m: 1, width: '30ch',  margin: '15px'}}
                        required
                        id="outlined-required"
                        label="Name"
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField sx={{ m: 1, width: '30ch',  margin: '15px'}} 
                        required
                        id="outlined-required"
                        label="Surname"
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField sx={{ m: 1, width: '30ch',  margin: '15px'}}
                        required
                        id="outlined-required"
                        label="Email"
                    />
                </div>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ width: '50%', padding: '10px' }}>
                <div>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                        <SmallAvatar>
                            <CreateIcon />
                        </SmallAvatar>
                        }
                    >
                        <Button><Avatar src="/broken-image.jpg" sx={{ bgcolor: blue[200], width: 86, height: 86 }}/></Button>
                        
                     </Badge>
                </div>  
              <FormControl sx={{ m: 1,  width: '30ch', margin: '15px'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
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
            </Box>
          </Box>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'center' }}><Button sx={{margin: '20px', borderRadius: '8px'}} size="medium" variant="contained">Sign Up</Button></div>
          <Box sx={{ flexGrow: 1, textAlign: 'right', display: 'flex', flexDirection: 'column'}}>
            <Link href="#" underline="hover"
              component="button"
              variant="body2"
              sx={{ textAlign: 'right' }}
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