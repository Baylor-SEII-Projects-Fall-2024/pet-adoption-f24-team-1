import React from 'react';
import Head from 'next/head'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import NavBar from '@/components/nav-bar-adoption-center';


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
      <NavBar />

        <Stack sx={{ paddingTop: 4 }} alignItems='center' gap={2}>
          <p>Adoption Center Home Page</p>
        </Stack>
        <Stack sx={{ display: "flex", flexWrap: "wrap", alignItems: "ceneter", justifyContent: 'center'}} direction="row">
             
        </Stack>
      </main>
    </>
  );
}