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
                alert("Registration failed: " + error.message);
                console.log(emailAddress);
            });
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