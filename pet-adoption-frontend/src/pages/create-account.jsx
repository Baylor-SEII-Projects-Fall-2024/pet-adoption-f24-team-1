import React from 'react';
import Head from 'next/head'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import styles from '@/styles/Home.module.css'

export default function CreateAccount() {

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>

      <main>
        <Stack sx={{ paddingTop: 4 }} alignItems='center' gap={2}>
          <p>Create Account Page</p>
        </Stack>
      </main>
    </>
  );
}