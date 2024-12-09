import React from 'react';
import Head from 'next/head';
import { Button, Card, CardContent, Stack, Typography, Grid, TextField, Container, Link, Paper, Box } from '@mui/material'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import NavBar from '@/components/nav-bar';
import AdoptionCenterFilterStack from '@/components/adoption-center-filter-stack';
import AdoptionCenterCard from '@/components/pet-card';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';


export default function Matches() {
    const user = useAuthUser();

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const [pets, setPets] = useState([]);

    // Filters
    const [nameFltr, setNameFltr] = useState('Any');
    const [addressFltr, setAddressFltr] = useState('Any');
    const [zipCodeFilter, setZipCodeFltr] = useState([501,99950]);
    function filters(adoptionCenter)  {
        return (
            (nameFltr == 'Any' ? true : adoptionCenter.Name == nameFltr) &&
            (addressFltr == 'Any' ? true : adoptionCenter.address == addressFltr) &&
            (adoptionCenter.zipCode >= zipCodeFilter[0] && adoptionCenter.zipCode <= zipCodeFilter[1])
        );
    }

    const navigateTo = (page) => {
        router.push(page);
    }

    // Get pets from database
    useEffect(() => {
        if (!user) return;
        axios.get(`${apiBaseUrl}/api/matches`, {
            params: {
                userID: user.id
            }
        })
            .then(response => {
                console.log(response.data);
                setPets(response.data);
            })
            .catch(error => {
                console.error('Error fetching pets:', error);
            });
    }, [user]);

    return (
        <>
            <Head>
                <title>Matches</title>
            </Head>

            <main>
                <Stack spacing={10}>
                    <NavBar/>

                    <Box sx={{ position: "absolute", display: "flex", width: "100%", justifyContent: "start" }}>
                        <Button startIcon={<ArrowBackIcon />} size='large' onClick={() => {router.push('/user-home')}}>Back to Home</Button>
                    </Box>

                    <Stack direction="row" >
                        <AdoptionCenterFilterStack nameFltr={nameFltr} breedFltr={addresFltr} speciesFltr={zipCodeFltr} />
                        <Grid container direction="row" display="flex" alignItems="center" justifyContent="left" rowGap={2} spacing={2}>
                            {pets.filter(filters).map((pet) => (
                                <Grid item>
                                    <AdoptionCenterCard key={adoptionCenter.Name} adoptionCenter={adoptionCenter} user={user} liked={false} location={location} />
                                </Grid>
                            ))}
                        </Grid>




                    </Stack>
                    {!user && (
                        <Box sx={{position: 'absolute', top: '40%', bottom: '50%', left: '43%', right: 0, width: '300'}}>
                            <Typography variant="h5">Sign in to start matching!</Typography>
                        </Box>
                    )}

                </Stack>
            </main>
        </>
    );
}