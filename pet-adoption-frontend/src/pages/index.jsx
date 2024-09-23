import React from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import styles from '@/styles/Home.module.css'

// Commit Test - alan

export default function HomePage() {
  const router = useRouter();

  const navigateTo = (page) => {
    router.push(page);
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      <main>
        <Stack sx={{ paddingTop: 4 }} alignItems='center' gap={2}>
          <Card sx={{ width: 600 }} elevation={4}>
            <CardContent>
              <Typography variant='h3' align='center'>Pet Adoption Fall 2024</Typography>
              <Typography variant='body1' color='text.secondary'> </Typography>
            </CardContent>
          </Card>
          <Stack sx={{ display: "flex", flexWrap: "wrap", alignItems: "ceneter", justifyContent: 'center'}} direction="row">

            {/* Another way is by creating a dedicated CSS file and using the styles from there: */}
            <Button variant='contained' color="secondary" onClick={() => navigateTo('adoption-center-home')} className={styles.wideButton}>Adoption Center Home</Button>
            <Button variant='contained' onClick={() => navigateTo('/settings')} sx={{ width: 200 }}>Settings</Button>
            <Button variant='contained' onClick={() => navigateTo('/create-account')} sx={{ width: 200 }}>Create Account</Button>
            <Button variant='contained' onClick={() => navigateTo('/forgot-password')} sx={{ width: 200 }}>forgot-password</Button>
            <Button variant='contained' onClick={() => navigateTo('/login')} sx={{ width: 200 }}>Login</Button>
            <Button variant='contained' onClick={() => navigateTo('/pet-adoption-form')} sx={{ width: 200 }}>Pet Adoption Form</Button>
            <Button variant='contained' onClick={() => navigateTo('/pet-info')} sx={{ width: 200 }}>Pet Info</Button>
            <Button variant='contained' onClick={() => navigateTo('/search')} sx={{ width: 200 }}>Search Pets</Button>
          </Stack>
        </Stack>
      </main>
    </>
  );
}