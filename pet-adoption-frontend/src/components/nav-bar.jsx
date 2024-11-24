import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Stack, Badge } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginModal from './login-modal';
import DialogModal from './dialog-modal';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import dynamic from 'next/dynamic';
import axios from 'axios';

const adminPages = ['Manage Pets', 'Manage Events', 'Profile'];
const defaultPages = ['Centers', 'Matches'];
const settings = ['Settings', 'Logout'];
const loginSettings = ['Login', 'Create Account'];

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

function NavBar() {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const user = useAuthUser();
  const signOut = useSignOut();
  
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const getAdoptionCenterId = async () => {
      try {
          const response = await axios.get(`${apiBaseUrl}/api/admins/center/${user.id}`)
          return response.data.centerId;
      } catch (error) {
          console.error("Error getting center id:", error);
          return -1;
      }
    };

    // Get unread notification count if logged in as admin
    if (isAuthenticated && user?.role === "ADMIN") {
      getAdoptionCenterId().then((centerId) => {
        // Fetch unread notification count
        const fetchNotifications = async () => {
          try {
          const response = await axios.get(`${apiBaseUrl}/api/notifications/unread/${centerId}`);
          setNotificationCount(response.data.length);
          } catch (error) {
          console.error("Error fetching notifications:", error);
          }
      };
      fetchNotifications();
      });
    }
  }, []);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    signOut();
    window.location.reload();
  };

  const handleNav = (nav) => {
    if (nav === 'Login') setLoginModalOpen(true);
    else if (nav === 'Create Account') router.push('/create-account');
    else if (nav === 'Settings') router.push('/settings');
    else if (nav === 'Logout') setLogoutModalOpen(true);
    else if (nav === 'Matches') router.push('/user-home/matches');
    else if (nav === 'Manage Pets') router.push('/adoption-center-home/manage-pets');
    else if (nav === 'Manage Events') router.push('/adoption-center-home/manage-events');
    else if (nav === 'Profile') router.push('/adoption-center-home/adpotion-center-profile');
    else if (nav === 'Notifications') router.push('/adoption-center-home/notifications');
  };

  const pages = isAuthenticated && user?.role == "ADMIN" ? adminPages : defaultPages;

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth={false}>
          <Toolbar disableGutters sx={{ width: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href={user?.role==="ADMIN" ? "/adoption-center-home" : "/user-home"}
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
              {user?.role === "ADMIN" && (<IconButton color="inherit" size="large" onClick={() => handleNav('Notifications')}>
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsNoneOutlinedIcon />
                </Badge>
              </IconButton>
            )}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user ? <Avatar>{user.email.substring(0, 1)}</Avatar> : <Avatar>?</Avatar>}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
      {/* Logout modal */}
      <DialogModal
        open={isLogoutModalOpen}
        header="Log out?"
        message="This will kick you out of the current session."
        handleYes={handleLogout}
        handleNo={() => setLogoutModalOpen(false)}
      />
    </>
  );
}

export default dynamic(() => Promise.resolve(NavBar), { ssr: false });
