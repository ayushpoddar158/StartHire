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
import { AuthContext } from '../Authorizer';
import { useEffect } from 'react';

// Data import @Firebase
import { db } from "../Firebase";
import {
  query,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  where
} from "firebase/firestore";

const pages = ['Home', 'About', 'Contact', 'Login', 'signup'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isUser, SetUser] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [loginCont, setLoginCont] = React.useState("LogIn");

  useEffect(() => {

    // console.log(currentUser)
    if (currentUser) {
      const fetchData = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", currentUser.uid));
          const docs = await getDocs(q);
          const doc = docs.docs[0];
          if (doc) {
            setData(doc.data());
            setIsUpdated(doc.data().updatedProfile);
            // console.log("inside fetchdata")
          }
          else {
            const q = query(collection(db, "startups"), where("uid", "==", currentUser.uid));
            const docs = await getDocs(q);
            const doc = docs.docs[0];
            setData(doc.data());
            setIsUpdated(doc.data().updatedProfile);
            // console.log("inside fetchdata")
          }

        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      SetUser(true);
    }
  }, [currentUser]);

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  const LogOut = () => {
    Auth.signOut();
    SetUser(false);
    navigate("/Login");
  }

  const logouthandler = () => {
    if (isUser) {
      LogOut();
      navigate("/Login")
    }
    else {
      navigate("/Login");
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

          {currentUser && data ?
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={isUpdated ? data.details.PImageUrl : "avtar1.png"} />
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
                    <MenuItem onClick={logouthandler}>
                      <Typography style={{ color: "grey", padding: '5px', fontSize: "1.2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'black' }}>logout</Link></Typography>
                    </MenuItem>
                    :
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography style={{ color: "grey", padding: '5px', fontSize: "1.2rem" }} textAlign="center"><Link style={{ textDecoration: 'none', color: 'black' }} to={`/${setting}`} >{setting}</Link></Typography>
                    </MenuItem>
                ))}
              </Menu>
            </Box> :
            <MenuItem onClick={logouthandler}>
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
