import React from 'react';
import Head from 'next/head'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'

export default function Login() {

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      <main>
        <Stack sx={{ paddingTop: 4 }} alignItems='center' gap={2}>
          <p>Login Page</p>
        </Stack>
      </main>
    </>
  );
}