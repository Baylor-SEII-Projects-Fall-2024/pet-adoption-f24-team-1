import React from 'react';
import { Box, Button, TextField, Typography, Grid, Paper, IconButton, InputAdornment, Link } from '@mui/material';
import { useState } from "react";
import { useRouter } from 'next/router'
import { useFormik } from 'formik';
import * as yup from 'yup';
import PetsIcon from '@mui/icons-material/Pets';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { registerUser, loginUser } from '@/auth/authentication';
import axios from 'axios';

const CreateAccountPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const signIn = useSignIn();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  //Validation requirements
  const validationSchema = yup.object({
    firstName: yup
      .string('Enter your first name')
      .matches(/^[A-Za-z]+$/, 'No special character or number allowed')
      .required('First name is required'),
    lastName: yup
      .string('Enter your last name')
      .matches(/^[A-Za-z]+$/, 'No special character or number allowed')
      .required('Last name is required'),
    phone: yup
      .string('Enter your phone number')
      .matches(
        /^(\+?\d{1,2}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
        'Phone number is not valid'
      )
      .required('Phone number is required'),
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password length should be at least 8')
      .required('Password is required'),
  })

  // Handle register
  const handleSubmit = async (values) => {
    try {
      const response = await registerUser(values);
      alert("Registration success!");
      // login user if registered
      try {
        const result = await loginUser(values.email, values.password, signIn);
        router.push("/set-user-preferences");
      } catch (error) {
        alert("Login failed: " + error);
      }
    } catch (error) {
      formik.setFieldError('email', "This email is already registered");
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

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
        <PetsIcon sx={{ width: "50px", height: "auto" }}/>
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

        <form onSubmit={formik.handleSubmit}>
          {/* First Name Input */}
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            sx={{ marginBottom: 2 }}
            fullWidth
          />

          {/* Last Name Input */}
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            sx={{ marginBottom: 2 }}
            fullWidth
          />

          {/* Phone Input */}
          <TextField
            id="phone"
            name="phone"
            label="Phone Number"
            variant="outlined"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={{ marginBottom: 2 }}
            fullWidth
          />

          {/* Email Input */}
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ marginBottom: 2 }}
            fullWidth
          />

          {/* Password Input */}
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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

          <Button type="submit" variant="contained" fullWidth>
            Create Account
          </Button>
        </form>

        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Are you an adoption center? <Link href="adoption-center-register">Start here</Link>
        </Typography>
      </Paper>
    </Box>
    </>
  );
};

export default CreateAccountPage;
