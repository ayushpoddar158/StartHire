import * as React from 'react';
import { useState, useContext, useRef } from 'react';
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
import '../style/Navbar.css'

import { gsap } from 'gsap';

// Authentication setup
import { Auth } from "../Firebase";
import { useEffect } from 'react';
const pages = ['Home', 'About', 'Contact', 'Login', 'signup'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar(props) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navRef = useRef(null);

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
    window.location.replace("/Login")
  }

  const logouthandler = async (isStudent) => {
    if (isStudent) {
      await Auth.signOut()
        .then(() => {
          window.location.replace("/Login")
        })
    }
    else {
      await Auth.signOut()
        .then(() => {
          window.location.replace("/Loginstartup")
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

  /// gsap animation
  useEffect(() =>{
    gsap.from(navRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });
  },[])



  return (
    <AppBar position="sticky" id='Navbar'  ref={navRef}>
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', marginLeft: '50px' } }}   >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}



              >
                <Link style={{ textDecoration: 'none', color: 'white' }} value={0}
                  indicatorColor="secondary" to={`/${page}`} >{page}</Link>
                {/* {page} */}
              </Button>
            ))}
          </Box>

          {userData ? <>
            {isVerified ?
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {userData.data().desgn == "startup" ?
                      <>
                        {!userData.data().updatedProfile ?
                          <Avatar src="sample_neutral.jpg" />
                          :
                          <>
                            {
                                < Avatar src={userData.data().PImageUrl} />
                            }
                          </>
                        }
                      </>
                      :
                      <>
                        {!userData.data().updatedProfile ?
                          <Avatar src="sample_neutral.jpg" />
                          :
                          <>
                            {
                              userData.data().gender === "Male" ?
                                < Avatar src="sample_male.jpg" />
                                :
                                < Avatar src="sample_female.jpg" />
                            }
                          </>
                        }
                      </>
                    }
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
                  {isStudent ?
                    <>
                      <MenuItem >
                        <Typography style={{ color: "grey", padding: '5px', fontSize: "1.2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'black' }} to={"/studentdashboard"}>Dashboard</Link></Typography>
                      </MenuItem>
                      <MenuItem >
                        <Typography style={{ color: "grey", padding: '5px', fontSize: "1.2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'black' }} to={"/StudentProfile"}>Profile</Link></Typography>
                      </MenuItem>
                      <MenuItem >
                        <Typography style={{ color: "grey", padding: '5px', fontSize: "1.2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'black' }} to={"/StudentNotification"}>Notification</Link></Typography>
                      </MenuItem>
                      <MenuItem onClick={() => logouthandler(isStudent)}>
                        <Typography style={{ color: "grey", padding: '5px', fontSize: "1.2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'black' }}>Log Out</Link></Typography>
                      </MenuItem>
                    </>
                    :
                    <>
                      <MenuItem >
                        <Typography style={{ color: "grey", padding: '5px', fontSize: "1.2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'black' }} to={"/dashboard"}>Dashboard</Link></Typography>
                      </MenuItem>
                      <MenuItem >
                        <Typography style={{ color: "grey", padding: '5px', fontSize: "1.2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'black' }} to={"/StartUpProfile"}>Profile</Link></Typography>
                      </MenuItem>
                      <MenuItem >
                        <Typography style={{ color: "grey", padding: '5px', fontSize: "1.2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'black' }} to={"/Notification"}>Notification</Link></Typography>
                      </MenuItem>
                      <MenuItem >
                        <Typography style={{ color: "grey", padding: '5px', fontSize: "1.2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'black' }} to={"/Jobs"}>Jobs</Link></Typography>
                      </MenuItem>
                      <MenuItem onClick={() => logouthandler(isStudent)}>
                        <Typography style={{ color: "grey", padding: '5px', fontSize: "1.2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'black' }}>Log Out</Link></Typography>
                      </MenuItem>
                    </>
                  }
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
              <Typography style={{ color: "red", padding: '5px', fontSize: "2rem" }} textAlign="center"><Button variant='contained' className='NavLogInbtn' style={{ textDecoration: 'none', color: 'white' }}>Log In</Button></Typography>
            </MenuItem>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
  // }
}
export default Navbar;
