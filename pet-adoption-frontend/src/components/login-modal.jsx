import React from "react";
import { Box, Button, Typography, Grid, TextField, InputAdornment, IconButton, Link, Modal, Paper } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PetsIcon from '@mui/icons-material/Pets';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useState, useEffect } from "react";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useRouter } from 'next/router';
import { loginUser } from "@/auth/authentication";

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
  const [error, setError] = useState(false);
  const signIn = useSignIn();
  const router = useRouter();

  // UI handling
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Login api
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(email, password, signIn);
      router.push("/user-home");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
        <Paper
          elevation={3}
          sx={{
          padding: 4,
          width: 400,
          borderRadius: 2,
          textAlign: 'center',
        }}>
          <PetsIcon sx={{ width: "50px", height: "auto" }}/>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Log In to Fluffy Friends!
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 3 }}>
            Don't have an account? <Link href="create-account">Sign up</Link>
          </Typography>
          
          {/* Google Sign-Up Button */}
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Sign in with Google
          </Button>

          {/* Facebook Sign-Up Button */}
          <Button
            variant="outlined"
            startIcon={<FacebookIcon />}
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Sign in with Facebook
          </Button>

          <Typography variant="subtitle1" sx={{ marginY: 2 }}>OR</Typography>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              error={error}
              sx={{ marginBottom: 2 }}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input */}
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              error={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography variant="body2" color="red" sx={{ textAlign: "start", marginTop: 1 }}>The email or password is incorrect.</Typography>
            )}

            <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 3 }}>
              Log In
            </Button>
          </form>

          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Logging in as adoption center? <Link href="adoption-center-login">Admin login</Link>
          </Typography>
        </Paper>
    </Modal>
  );
};

export default LoginModal;
