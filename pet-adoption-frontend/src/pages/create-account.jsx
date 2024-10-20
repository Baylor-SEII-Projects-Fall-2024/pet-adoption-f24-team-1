import React from 'react';
import { Box, Button, TextField, Typography, Grid, Paper, IconButton, InputAdornment, Link } from '@mui/material';
import { useState } from "react";
import { useRouter } from 'next/router'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const SignupPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

    axios.post(`${apiBaseUrl}/api/register`, {
      email: email,
      password: password,
    })
            .then(response => {
                alert("Registration successful!");
                sessionStorage.setItem('user', JSON.stringify(response.data)); // Store user data in session storage
                // Go to home page
                router.push("/");

            })
            .catch(error => {
                alert("Registration failed: " + error.message);
            });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
    <Box sx={{ display: "flex", width: "100%", justifyContent: "start" }}>
        <Button startIcon={<ArrowBackIcon />} size='large' href='/'>Back to Paws&More</Button>
      </Box>
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 400,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Create account
        </Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: 3 }}>
          Start adopting new friends today!
        </Typography>
        
        {/* Google Sign-Up Button */}
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          Sign up with Google
        </Button>

        {/* Facebook Sign-Up Button */}
        <Button
          variant="outlined"
          startIcon={<FacebookIcon />}
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          Sign up with Facebook
        </Button>

        <Typography variant="subtitle1" sx={{ marginY: 2 }}>OR</Typography>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
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
            sx={{ marginBottom: 3 }}
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

          <Button type="submit" variant="contained" fullWidth>
            Create Account
          </Button>
        </form>

        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Are you an adoption center? <Link href="adoption-create-account">Start here</Link>
        </Typography>
      </Paper>
    </Box>
    </>
  );
};

export default SignupPage;
