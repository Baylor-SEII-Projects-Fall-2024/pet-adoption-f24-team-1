import React from 'react';
import Head from 'next/head'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import styles from '@/styles/Home.module.css'

export default function AdoptionCenterHome() {

  return (
    <>
      <Head>
        <title>Adoption Center Home</title>
      </Head>

      <main>
        <Stack sx={{ paddingTop: 4 }} alignItems='center' gap={2}>
          <p>Adoption Center Home Page</p>
        </Stack>
      </main>
    </>
  );
}