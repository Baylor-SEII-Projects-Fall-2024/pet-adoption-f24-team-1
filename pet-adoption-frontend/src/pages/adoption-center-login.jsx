import React from 'react';
import { Box, Button, TextField, Typography, Grid, Paper, IconButton, InputAdornment, Link } from '@mui/material';
import { useState } from "react";
import { useRouter } from 'next/router'
import PetsIcon from '@mui/icons-material/Pets';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import HomeIcon from '@mui/icons-material/Home';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { loginAdmin } from '@/auth/authentication';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

const AdoptionCenterLoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const signIn = useSignIn();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginAdmin(email, password, signIn);
      alert("Admin login success!");
      router.push("/adoption-center-home/adpotion-center-profile");
    } catch(error) {
      alert("Login failed: " + error.message);
    }
  }

  return (
    <>
    <Box sx={{ display: "flex", width: "100%", justifyContent: "start" }}>
        <Button startIcon={<ArrowBackIcon />} size='large' href='/'>Back to FLUFFY FRIENDS</Button>
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
        <HomeIcon sx={{ width: "50px", height: "auto" }}/>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Adotion Center Login
        </Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: 3 }}>
          Log into an admin account associated with your adoption center!
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <TextField
            label="Admin Email"
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: 2 }}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <TextField
            label="Admin Password"
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
            Log In
          </Button>
        </form>

        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Need to register adoption center? <Link href="adoption-center-register">Start here</Link>
        </Typography>
      </Paper>
    </Box>
    </>
  );
};

export default AdoptionCenterLoginPage;
