import React from 'react';
import { Box, Button, TextField, Typography, Grid, Paper, IconButton, InputAdornment, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignupPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
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
          Start your 30-day free trial. Cancel anytime.
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

        {/* Email Input */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        {/* Password Input */}
        <TextField
          label="Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          fullWidth
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
        />

        {/* Create Account Button */}
        <Button variant="contained" fullWidth>
          Create Account
        </Button>

        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Are you an adoption center? <Link href="adoption-create-account">Start here</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignupPage;
