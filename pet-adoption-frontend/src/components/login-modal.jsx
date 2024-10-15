import React from "react";
import styles from '@/styles/Login.module.css';
import { Box, Button, Typography, Grid, TextField, InputAdornment, IconButton, Link, Modal } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect } from "react";
import axios from 'axios';

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // Clean up on unmount
    };
  }, [isOpen]);

  // Hooks
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI handling
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  // Login api
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/api/login", {
      username: email,
      password: password,
    })
            .then(response => {
                alert("Login successful!");
                console.log(response.data); // Handle authentication state here
                sessionStorage.setItem('user', JSON.stringify(response.data)); // Store user data in session storage
            })
            .catch(error => {
                alert("Login failed: " + error.message);
            });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
    <Box className={styles.modalOverlay}>
      <Box className={styles.modalContent}>
        <Box className={styles.modalLeftContent}>
          <Typography variant="h5">Log in to Fluffy Friends</Typography>
          <Typography>
                Don't have an account? <Link href="/create-account" variant='body2'>Sign up</Link>
          </Typography>
          <form onSubmit={handleSubmit}>
          <Grid container spacing={4} sx={{ my: 1}}>
                  <Grid item xs={12}>
                    <TextField id="email"
                               placeholder="Email Address"
                               variant="outlined"
                               required
                               sx={{ width: "100%" }}
                               InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmailIcon />
                                  </InputAdornment>
                                ),
                              }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField id="password"
                               placeholder="Password"
                               required
                               type={showPassword ? 'text' : 'password'}
                               variant="outlined"
                               sx={{ width: "100%" }}
                               InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <VpnKeyIcon />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      onMouseUp={handleMouseUpPassword}
                                      edge="end"
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                        
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" size="large">Login</Button>
                  </Grid>
                </Grid>
          </form>
        </Box>
        <Box className={styles.modalRightContent}>
          <Button onClick={onClose} className={styles.closeButton}>X</Button>
        </Box>
      </Box>
    </Box>
    </Modal>
  );
};

export default LoginModal;
