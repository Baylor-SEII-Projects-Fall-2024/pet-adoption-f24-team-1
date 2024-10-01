import React from 'react';
import Head from 'next/head'
import { Button, Card, CardContent, Stack, Typography, Grid, TextField, Container, Link } from '@mui/material'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import NavBar from '@/components/nav-bar';


export default function UserHome() {
  const router = useRouter();

  const navigateTo = (page) => {
    router.push(page);
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <main>
      <NavBar/>
      <Container>
        <Stack>
          
          
        </Stack>
      </Container>
      </main>
    </>
  );
}