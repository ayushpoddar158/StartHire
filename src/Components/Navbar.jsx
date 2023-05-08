import * as React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

// Authentication setup
import { Auth } from "../Firebase";
const pages = ['Home', 'About', 'Contact', 'Login', 'signup'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar(props) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  let userData = props.userData;
  let isStudent = props.isStudent;
  let isStartUp = props.isStartUp;
  let isVerified = props.isVerified;
  // print above variables in console
  // console.log(userData);
  // console.log(isStudent);
  // console.log(isStartUp);
  // console.log(isVerified);

  const logInHandler = () => {
    window.location.replace("/login")
  }

  const logouthandler = async (isStudent) => {
    if (isStudent) {
      await Auth.signOut()
        .then(() => {
          window.location.replace("/login")
        })
    }
    else{
      await Auth.signOut()
        .then(() => {
          window.location.replace("/loginstartup")
        })

    }
  }
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



  return (
    <AppBar position="static" sx={{ background: '#070617', }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              // fontFamily: 'monospace',

              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              // fontSize:"3rem",
              textDecoration: 'none',
            }}
          >
            StartHire
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },

              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{ textDecoration: 'none', color: 'grey', padding: '25px', fontSize: "1.28rem" }} to={`/${page}`} >{page}</Link>
                    {/* {page} */}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,

              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',

            }}
          >
            StartHire
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', marginLeft: '50px' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link style={{ textDecoration: 'none', color: 'white' }} to={`/${page}`} >{page}</Link>
                {/* {page} */}
              </Button>
            ))}
          </Box>

          {userData ? <>
            {isVerified ?
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={userData.details.PImageUrl ? userData.details.PImageUrl : "avtar1.png"} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    setting === 'Logout' ?
                      <MenuItem onClick={() => logouthandler(isStudent)}>
                        <Typography style={{ color: "grey", padding: '5px', fontSize: "1.2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'black' }}>Log Out</Link></Typography>
                      </MenuItem>
                      :
                      setting === "Dashboard" ?
                        isStudent ?
                          <MenuItem >
                            <Typography style={{ color: "grey", padding: '5px', fontSize: "1.2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'black' }} to={"/studentdashboard"}>Dashboard</Link></Typography>
                          </MenuItem>
                          :
                          <MenuItem >
                            <Typography style={{ color: "grey", padding: '5px', fontSize: "1.2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'black' }} to={"/dashboard"}>Dashboard</Link></Typography>
                          </MenuItem>
                        :
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography style={{ color: "grey", padding: '5px', fontSize: "1.2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'black' }} to={`/${setting}`} >{setting}</Link></Typography>
                        </MenuItem>
                  ))}
                </Menu>
              </Box>
              :
              <MenuItem onClick={() => navigate("/VerifyEmail")}>
                <Typography style={{ color: "red", padding: '5px', fontSize: "2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'Red' }}>Verify Email</Link></Typography>
              </MenuItem>
            }
          </>
            :
            <MenuItem onClick={logInHandler}>
              <Typography style={{ color: "red", padding: '5px', fontSize: "2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'white' }}>Log In</Link></Typography>
            </MenuItem>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
  // }
}
export default Navbar;
