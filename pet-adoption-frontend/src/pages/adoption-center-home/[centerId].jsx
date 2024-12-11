import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Grid, Typography, Container, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PinDropIcon from '@mui/icons-material/PinDrop';
import NavBar from '@/components/nav-bar';
import { useRouter } from 'next/router';
import axios from 'axios';
import PetCard from '@/components/pet-card';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AdoptionCenterProfile() {
    const user = useAuthUser();
    const router = useRouter();
    const { centerId: queryCenterId } = router.query;

    const [adoptionCenter, setAdoptionCenter] = useState(null);
    const [pets, setPets] = useState([]);

    // Fetch adoption center details
    useEffect(() => {
        if (queryCenterId) {
            axios.get(`${apiBaseUrl}/api/adoptioncenters/${queryCenterId}`)
                .then(response => setAdoptionCenter(response.data))
                .catch(error => console.error("Error fetching adoption center:", error));
        }
    }, [queryCenterId]);

    // Fetch pets for the adoption center
    useEffect(() => {
        if (queryCenterId) {
            axios.get(`${apiBaseUrl}/api/adoptioncenters/${queryCenterId}/pets`)
                .then(response => setPets(response.data))
                .catch(error => console.error("Error fetching pets:", error));
        }
    }, [queryCenterId]);

    if (!adoptionCenter) return <Typography>Loading...</Typography>;

    const { centerName, centerEmail, centerPhone, centerAddress, zipCode, centerImageUrl } = adoptionCenter;

    return (
        <>
            <Head>
                <title>{centerName} - Adoption Center Profile</title>
            </Head>
            <main>
                <NavBar />

                {/* Cover Photo Section */}
                <Box
                    sx={{
                        mt: 8,
                        width: '100%',
                        height: 420,
                        backgroundImage: `url(${centerImageUrl || '/pets.png'})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundColor: 'black',
                    }}
                />

                <Container maxWidth="lg">
                    {/* Profile Info Card */}
                    <Box
                        sx={{
                            mt: -6,
                            p: 2,
                            backgroundColor: '#fff',
                            borderRadius: 2,
                            boxShadow: 1,
                            position: 'relative',
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12}>
                                <Typography variant="h5">{centerName}</Typography>
                                <Grid container spacing={1} alignItems="center" sx={{ mt: 1 }}>
                                    <Grid item>
                                        <EmailIcon fontSize="small" />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Email:</strong> {centerEmail}
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <PhoneIcon fontSize="small" />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Phone:</strong> {centerPhone}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <PinDropIcon fontSize="small" />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Address:</strong> {centerAddress} {zipCode}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Pets Section */}
                    <Box mt={4}>
                        <Typography variant="h6" gutterBottom>
                            Pets Available for Adoption
                        </Typography>
                        <Grid container spacing={2}>
                            {pets.length > 0 ? (
                                pets.map((pet) => (
                                    <Grid item key={pet.petID} xs={12} sm={6} md={4} lg={3}>
                                        <PetCard key={pet.petID} pet={pet} user={user} />
                                    </Grid>
                                ))
                            ) : (
                                <Typography variant="body1" color="textSecondary">
                                    No pets are available for adoption at this center.
                                </Typography>
                            )}
                        </Grid>

                    </Box>
                </Container>
            </main>
        </>
    );
}
