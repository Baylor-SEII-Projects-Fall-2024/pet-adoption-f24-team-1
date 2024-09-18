import React from 'react';
import Head from 'next/head'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import styles from '@/styles/Home.module.css'

// Commit Test - alan

export default function HomePage() {
  const onButtonPress = () => {
    alert('this will take you to the Register User Account Page');
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
          <Stack direction="row">
            {/* There are multiple ways to apply styling to Material UI components. One way is using the `sx` prop: */}
            <Button variant='contained' onClick={onButtonPress} sx={{ width: 200 }}>Register Account :)</Button>

            {/* Another way is by creating a dedicated CSS file and using the styles from there: */}
            <Button variant='contained' color="secondary" onClick={onButtonPress} className={styles.wideButton}>I am a wider button</Button>
          </Stack>
        </Stack>
      </main>
    </>
  );
}
