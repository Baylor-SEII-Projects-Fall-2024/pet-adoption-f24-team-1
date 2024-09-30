import React from 'react';
import Head from 'next/head'
import { Button, Card, CardContent, Stack, Typography, Grid, TextField, Container, Link } from '@mui/material'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import axios from 'axios';

export default function Login() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/login', {
      emailAddress: emailAddress,
      password: password,
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      <main>
      <Container>
            <Stack>
              <Typography variant="h4">
                Welcome back!
              </Typography>
              <Typography>
                Don't have an account? <Link href="/create-account" variant='body2'>Sign up</Link>
              </Typography>

              <form >
                <Grid container spacing={4} sx={{ my: 1}}>
                  <Grid item xs={12}>
                    <TextField id="emailAddress" placeholder="Enter email address" label="Email Address" variant="outlined" fullWidth required onChange={(e) => setEmailAddress(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField id="password" placeholder="Enter password" label="Password" variant="outlined" fullWidth required onChange={(e) => setPassword(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
                  </Grid>
                </Grid>
              </form>
            </Stack>
          
        </Container>
      </main>
    </>
  );
}