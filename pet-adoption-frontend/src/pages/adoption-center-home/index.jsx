import React from 'react';
import Head from 'next/head'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'

export default function AdoptionCenterHome() {
  const router = useRouter();

  const navigateTo = (page) => {
    router.push(page);
  }

  return (
    <>
      <Head>
        <title>Adoption Center Home</title>
      </Head>

      <main>
        <Stack sx={{ paddingTop: 4 }} alignItems='center' gap={2}>
          <p>Adoption Center Home Page</p>
        </Stack>
        <Stack sx={{ display: "flex", flexWrap: "wrap", alignItems: "ceneter", justifyContent: 'center'}} direction="row">
            <Button variant='contained' onClick={() => navigateTo('/adoption-center-home/manage-pets')} sx={{ width: 200 }}>Manage Pets</Button>
            <Button variant='contained' onClick={() => navigateTo('/adoption-center-home/manage-events')} sx={{ width: 200 }}>Manage Events</Button>
          </Stack>
      </main>
    </>
  );
}