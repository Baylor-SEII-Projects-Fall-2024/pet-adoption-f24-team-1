import React from 'react';
import Head from 'next/head'
import { Button, Box, CardContent, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import NavBar from '@/components/nav-bar';
import ProtectedAdminRoute from '@/components/protected-admin-route';


export default function AdoptionCenterHome() {
  const router = useRouter();

  const navigateTo = (page) => {
    router.push(page);
  }

  return (
    <ProtectedAdminRoute>
      <Head>
        <title>Adoption Center Home</title>
      </Head>

      <main>
      <NavBar />

        <Stack sx={{ paddingTop: 0 }} alignItems='center' gap={2}>
        <Box className={styles.container}>
          <Box className={styles.textContainer}>
            <Typography variant='h3'>Adoption Center Home Page</Typography>
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
              </Typography>
            </Box>
            <Typography sx={{ maxWidth: "400px" }}>Here is your landing page for displaying and editing events and pet postings!</Typography>
          </Box>


        </Box>

        </Stack>
      </main>
    </ProtectedAdminRoute>
  );
}