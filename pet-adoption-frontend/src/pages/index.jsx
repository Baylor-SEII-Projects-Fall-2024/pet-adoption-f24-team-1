import React from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button, Box, Card, CardContent, Stack, Typography } from '@mui/material'
import styles from '@/styles/Home.module.css'
import NavBar from '@/components/nav-bar';

export default function HomePage() {
  const router = useRouter();

  const navigateTo = (page) => {
    router.push(page);
  }

  return (
    <>
      <Head>
        <title>Landing page</title>
      </Head>

      <main>
        <NavBar />

        <Box className={styles.container}>
          <Box className={styles.textContainer}>
            <Typography variant='h3'>Give A New Life to</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%"}}>
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: 'flex',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                FLUFFY FRIENDS
              </Typography>
            </Box>
            <Typography sx={{ maxWidth: "400px" }}>This page has been updated and has passed the github runner CI/CD</Typography>
            <Button variant='contained' size='large' sx={{ position: "static" }}>Adopt Now</Button>
          </Box>

          <Box>
            <img src="/pets.png" alt="pets" style={{ width: "300px", height: "auto" }}/>
          </Box>

        </Box>

        <Stack sx={{ paddingTop: 4 }} alignItems='center' gap={2}>
          <Stack sx={{ display: "flex", flexWrap: "wrap", alignItems: "ceneter", justifyContent: 'center'}} direction="row">

            <Button variant='contained' color="secondary" onClick={() => navigateTo('adoption-center-home')} className={styles.wideButton}>Adoption Center Home</Button>
            <Button variant='contained' onClick={() => navigateTo('/settings')} sx={{ width: 200 }}>Settings</Button>
            <Button variant='contained' onClick={() => navigateTo('/create-account')} sx={{ width: 200 }}>Create Account</Button>
            <Button variant='contained' onClick={() => navigateTo('/forgot-password')} sx={{ width: 200 }}>forgot-password</Button>
            <Button variant='contained' onClick={() => navigateTo('/login')} sx={{ width: 200 }}>Login</Button>
            <Button variant='contained' onClick={() => navigateTo('/pet-adoption-form')} sx={{ width: 200 }}>Pet Adoption Form</Button>
            <Button variant='contained' onClick={() => navigateTo('/pet-info')} sx={{ width: 200 }}>Pet Info</Button>
            <Button variant='contained' onClick={() => navigateTo('/search')} sx={{ width: 200 }}>Search Pets</Button>
            <Button variant='contained' onClick={() => navigateTo('/user-home')} sx={{ width: 200 }}>User Home Page</Button>
              <Button variant="contained" onClick={() => navigateTo('/about')} sx={{ width: 200, alignSelf: 'center' }}>About Us</Button>
          </Stack>
        </Stack>
      </main>
    </>
  );
}