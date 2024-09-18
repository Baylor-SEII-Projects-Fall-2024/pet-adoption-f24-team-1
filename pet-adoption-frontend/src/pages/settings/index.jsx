import React from 'react';
import Head from 'next/head'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import styles from '@/styles/Home.module.css'

export default function Settings() {

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>

      <main>
        <Stack sx={{ paddingTop: 4 }} alignItems='center' gap={2}>
          <p>Settings Page</p>
        </Stack>
      </main>
    </>
  );
}