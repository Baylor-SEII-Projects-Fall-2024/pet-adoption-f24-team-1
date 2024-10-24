import React from 'react';
import {Box, Button, TextField, Typography, Grid, Paper, IconButton, InputAdornment, Link, Stack, Card, CardContent} from '@mui/material';
import { useState } from "react";
import { useRouter } from 'next/router'
import PetsIcon from '@mui/icons-material/Pets';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import Head from "next/head";
import NavBar from "@/components/nav-bar";

export default function adoptionCenterViewPage() {
    const router = useRouter();

    const navigateToHome = () => {
        router.push('/');
    };

    return (
        <>
            <Head>
                <title>Adoption Centers</title>
            </Head>
            <Stack spacing={10}>
                <NavBar />
                        <Stack sx={{ paddingTop: 4 }} alignItems="center" gap={2}>
                            <Typography variant="h4">Pet Adoption Form</Typography>
                        </Stack>

                    {/* Navigate back to Home button */}
                    <Button variant="contained" onClick={navigateToHome} sx={{ width: 200 }}>
                        Back to Home
                    </Button>
            </Stack>
        </>
    );
}
