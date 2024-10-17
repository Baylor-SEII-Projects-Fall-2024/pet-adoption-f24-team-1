import React from 'react';
import Head from 'next/head';
import { Avatar, Button, Card, CardContent, Stack, Typography, Grid, TextField, Container, Link, Paper, Box,} from '@mui/material'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import NavBar from '@/components/nav-bar';
import FilterStack from '@/components/filter-stack';
import PetCard from '@/components/pet-card';
import Sidebar from '@/components/Sidebar';

export default function UserProfile() {
    return (
      <>
        <Head>
          <title>User Profile</title>
        </Head>
        <main>
          <NavBar />
          <Container maxWidth="lg" sx={{ display: 'flex', marginTop: '16px' }}>
            <Grid container spacing={2}>
              {/* Sidebar */}
              <Grid item xs={3}>
                <Sidebar />
              </Grid>
  
              {/* Main Content */}
              <Grid item xs={9}>
                <Box padding={2}>
                  <Grid container spacing={2} alignItems="center">
                    {/* Profile Picture */}
                    <Grid item>
                      <Avatar
                        alt="User Profile Picture"
                        src="/profile-picture.jpg" // Path to the image in the public folder
                        sx={{ width: 150, height: 150 }} // Adjust size as needed
                      />
                    </Grid>
  
                    {/* Profile Bio */}
                    <Grid item xs>
                      <Typography variant="h5">Beetlejuice</Typography>
                      <Typography variant="body1" color="text.secondary">
                        Just looking for a cuppa pets
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </main>
      </>
    );
  }