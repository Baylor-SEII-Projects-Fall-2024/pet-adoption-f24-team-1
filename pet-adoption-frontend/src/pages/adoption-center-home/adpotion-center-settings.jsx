import React from 'react';
import Head from 'next/head'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'

export default function Settings() {
  const router = useRouter();

  const navigateTo = (page) => {
    router.push(page);
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>

      <main>
        <Stack sx={{ paddingTop: 4 }} alignItems='center' gap={2}>
          <p>Adoption Center Settings Page</p>
        </Stack>
        <Stack sx={{ display: "flex", flexWrap: "wrap", alignItems: "ceneter", justifyContent: 'center'}} direction="row">
        </Stack>



      </main>
    </>
  );
}