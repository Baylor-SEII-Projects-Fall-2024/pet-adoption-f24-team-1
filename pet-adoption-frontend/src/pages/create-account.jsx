import React from 'react';
import Head from 'next/head'
import { Button, Card, CardContent, Stack, Typography, Grid, TextField, Container, Link } from '@mui/material'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import axios from 'axios';

export default function CreateAccount() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/api/register", {
      emailAddress: emailAddress,
      password: password,
      userType: userType,
    })
            .then(response => {
                alert("Registration successful!");
            })
            .catch(error => {
                // console.error("Login failed:", error); // Log the full error
                alert("Registration failed: " + error.message);
            });
          //   .catch(error => {
          //     console.error("Registration failed:", error); // Log the full error
          //     if (error.response) {
          //         // The request was made and the server responded with a status code
          //         console.error("Response data:", error.response.data);
          //         console.error("Response status:", error.response.status);
          //         alert("Registration failed: " + error.response.data.message || error.message);
          //     } else if (error.request) {
          //         // The request was made but no response was received
          //         console.error("Request data:", error.request);
          //         alert("Registration failed: No response received from the server.");
          //     } else {
          //         // Something happened in setting up the request that triggered an Error
          //         console.error("Error message:", error.message);
          //         alert("Registration failed: " + error.message);
          //     }
          // });
  };

  // const getUsers = () => {
  //   axios.get('http://localhost:8080/allusers')
  //   .then(function (response) {
  //     alert(JSON.stringify(response.data, undefined, 4));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  return (

    <>
      <Head>
        <title>Create Account</title>
      </Head>

      <main>
        <Container>
            <Stack>
              <Typography variant="h4">
                Welcome to Furry Friends!
              </Typography>
              <Typography>
                Already have an account? <Link href="/login" variant='body2'>Log in</Link>
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={4} sx={{ my: 1}}>
                  <Grid item xs={12}>
                    <TextField id="emailAddress" placeholder="Enter email address" label="Email Address" variant="outlined" fullWidth required onChange={(e) => setEmailAddress(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField id="password" placeholder="Enter password" label="Password" variant="outlined" fullWidth required onChange={(e) => setPassword(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField id="userType" placeholder="Enter user type" label="User Type" variant="outlined" fullWidth required onChange={(e) => setUserType(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Create Account</Button>
                  </Grid>
                </Grid>
              </form>
            </Stack>
          
        </Container>
      </main>
    </>
  );
}