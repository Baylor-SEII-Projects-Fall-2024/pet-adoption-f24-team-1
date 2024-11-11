import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import NavBar from '@/components/nav-bar';
import styles from '@/styles/Home.module.css';

export default function AdoptionCenterProfile() {
    const router = useRouter();
    const { id } = router.query; // Get the 'id' from the URL
    const [adoptionCenter, setAdoptionCenter] = useState(null);

    // Fetch the adoption center data using the id
    useEffect(() => {
        if (id) {
            // Replace with actual API endpoint to fetch adoption center data by id
            const fetchAdoptionCenter = async () => {
                try {
                    const response = await fetch(`/api/adoption-centers/${id}`);
                    const data = await response.json();
                    setAdoptionCenter(data);
                } catch (error) {
                    console.error('Error fetching adoption center:', error);
                }
            };

            fetchAdoptionCenter();
        }
    }, [id]);

    if (!adoptionCenter) {
        return <p>Loading adoption center details...</p>; // Loading state
    }

    return (
        <>
            <Head>
                <title>{adoptionCenter.centerName} Profile</title>
            </Head>

            <main>
                <NavBar />
                <Stack sx={{ paddingTop: 4 }} alignItems="center" gap={2}>
                    <Typography variant="h4">{adoptionCenter.centerName}</Typography>
                    <Typography variant="body1">{adoptionCenter.centerAddress}</Typography>
                    <Typography variant="body1">{adoptionCenter.centerPhone}</Typography>
                    <Typography variant="body1">{adoptionCenter.centerEmail}</Typography>
                </Stack>

                <Stack sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }} direction="row">
                    {/* Example Card with Adoption Center Information */}
                    <Card sx={{ maxWidth: 345, margin: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Details</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {adoptionCenter.centerDescription || 'No description available.'}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push('/')} // Navigate to the homepage or a different page
                    >
                        Go to Homepage
                    </Button>
                </Stack>
            </main>
        </>
    );
}
