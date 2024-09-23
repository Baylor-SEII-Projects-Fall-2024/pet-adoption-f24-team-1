import React from 'react';
import Head from 'next/head'
import { Button, Card, CardContent, Stack, Typography, Grid, TextField } from '@mui/material'
import styles from '@/styles/Home.module.css'

export default function CreateAccount() {

  return (

    <>
      <Head>
        <title>Create Account</title>
      </Head>

      <main>
        <Stack alignItems='center'>
          <p>Create Account Page</p>
          <Card sx={{ width: 600 }} elevation={0}>
            <CardContent>
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField id="emailAddress" placeholder="Enter email address" label="Email Address" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="password" placeholder="Enter password" label="Password" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="userType" placeholder="Enter user type" label="User Type" variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                </Grid>
              </Grid>
            </form>
            </CardContent>
          </Card>
        </Stack>
      </main>
    </>
  );
}