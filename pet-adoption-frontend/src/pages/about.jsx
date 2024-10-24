import React from 'react';
import Head from 'next/head';
import { Stack, Card, CardContent, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function AboutPage() {
    const router = useRouter();

    const navigateToHome = () => {
        router.push('/');
    };

    return (
        <>
            <Head>
                <title>About Us</title>
            </Head>

            <main>
                <Stack sx={{ padding: 4 }} alignItems="center" spacing={4}>
                    <Card sx={{ width: 800 }} elevation={4}>
                        <CardContent>
                            <Typography variant="h4" align="center">About Fluffy Friends</Typography>
                            <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
                                Fluffy Friends is a web application designed to help animal lovers find and adopt pets from
                                local shelters and rescue centers. Our goal is to make the adoption process simple and stress-free
                                for both potential adopters and the pets in need of a loving home.
                            </Typography>
                            <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
                                The application allows users to browse through various pets, get detailed information about each animal,
                                and apply for adoption online. We provide a platform for adoption centers to list available pets, schedule
                                events, and connect with potential adopters. This system is designed to improve the efficiency and effectiveness
                                of the adoption process.
                            </Typography>
                            <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
                                Key Features:
                            </Typography>
                            <ul style={{ textAlign: 'center', listStyle: 'none', padding: 0 }}>
                                <li>✔ Browse pets available for adoption, filter by breed, age, and location</li>
                                <li>✔ View detailed information and images for each pet</li>
                                <li>✔ Submit online adoption applications</li>
                                <li>✔ User account creation, login, and personalized pet recommendations</li>
                                <li>✔ Adoption centers can manage pets and schedule adoption events</li>
                                <li>✔ Integration with real-time databases for up-to-date pet availability</li>
                            </ul>
                            <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
                                Whether you're looking for a new furry friend or a rescue center wanting to connect with adopters,
                                Pet Adoption Fall 2024 is here to help! Together, we can create a world where every pet finds a loving home.
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* Navigate back to Home button */}
                    <Button variant="contained" onClick={navigateToHome} sx={{ width: 200 }}>
                        Back to Home
                    </Button>
                </Stack>
            </main>
        </>
    );
}
