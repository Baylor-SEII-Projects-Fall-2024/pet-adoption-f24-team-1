import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Stack } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { useState, useEffect, useStyles } from 'react';
import Router, { useRouter } from 'next/router';
import LoginModal from './login-modal';
import DialogModal from './dialog-modal';
import Link from 'next/link';

const pages = ['Centers', 'Matches'];
const settings = ['Settings', 'Logout'];
const loginSettings = ['Login', 'Create Account'];


export default function NavBar() {
  const router = useRouter();
  
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Login
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  // Logout
  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.reload();
  }

  const handleNav = (nav) => {
    if(nav === 'Login')  {
      openLoginModal();
    }
    if(nav === 'Create Account') {
      router.push('/create-account');
    }
    if(nav === 'Settings')  {
      router.push('/settings');
    }
    if(nav === 'Logout')  {
      openLogoutModal();
    }
    if(nav === 'Matches')  {
      router.push('/matches');
    }
  };

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(sessionStorage.getItem('user'));
    if (userFromLocalStorage) {
      setUser(userFromLocalStorage);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <>
    <AppBar position="fixed">
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{width: `100%`}}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/user-home"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              FLUFFY FRIENDS
            </Typography>
          </Stack>
          
          <PetsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FLUFFY FRIENDS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNav(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? <Avatar>{user.email.substring(0,1)}</Avatar> : <Avatar>?</Avatar>}
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
              {(user ? settings : loginSettings).map((setting) => (
                <MenuItem key={setting} onClick={() => handleNav(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    {/* Login modal */}
    <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    {/* Logout modal */}
    <DialogModal open={isLogoutModalOpen} 
                 header="Log out?" 
                 message="This will kick you out of the current session."
                 handleYes={handleLogout}
                 handleNo={closeLogoutModal}
    />
    </>
  );
}