import React from 'react';
import Head from 'next/head';
import { Button, Card, CardContent, Stack, Typography, Grid, Container, Pagination } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import NavBar from '@/components/nav-bar';
import FilterStack from '@/components/filter-stack';
import AdoptionCenterCard from '@/components/adoption-center-card';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

export default function AdoptionCenterHome() {
    const user = useAuthUser();

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const [adoptionCenters, setAdoptionCenters] = useState([]);
    const [location, setLocation] = useState(null);
    const [page, setPage] = useState(1);
    const centersPerPage = 20;

    // Filters
    const [nameFltr, setNameFltr] = useState('Any');
    const [addressFltr, setAddressFltr] = useState('Any');
    const [zipCodeFilter, setZipCodeFltr] = useState([501, 99950]);

    const handlePageChange = (event, value) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setPage(value);
    };

    useEffect(() => {
        // Get location of user
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(position.coords.latitude + ', ' + position.coords.longitude);
                },
                (error) => console.log(error.message)
            );
        } else {
            console.log("Geolocation is not supported by this browser");
        }
    }, []);

    useEffect(() => {
        const request = user ? `/api/adoption-centers` : '/api/adoption-centers';

        if (!user) {
            console.log('Not signed in');
            axios
                .get(`${apiBaseUrl}${request}`)
                .then((response) => {
                    const adoptionCenters = response.data.map((center) => ({
                        ...center,
                        distance: 0, // Default to 0 or calculate based on some logic
                    }));
                    setAdoptionCenters(adoptionCenters); // Update state
                })
                .catch((error) => {
                    console.error('Error fetching adoption centers:', error);
                });
        } else {
            axios
                .get(`${apiBaseUrl}${request}`, {
                    params: {
                        id: user.id,
                        userLocation: location,
                    },
                })
                .then((response) => {
                    const adoptionCenters = response.data.map((item) => ({
                        ...item.center, // Adjust based on your API response
                        distance: item.distance, // Distance if provided by backend
                    }));
                    setAdoptionCenters(adoptionCenters); // Update state
                })
                .catch((error) => {
                    console.error('Error fetching adoption centers:', error);
                });
        }
    }, [location, user]);

    // Filters function
    function filters(adoptionCenter) {
        return (
            (nameFltr === 'Any' ? true : adoptionCenter.Name === nameFltr) &&
            (addressFltr === 'Any' ? true : adoptionCenter.address === addressFltr) &&
            adoptionCenter.zipCode >= zipCodeFilter[0] && adoptionCenter.zipCode <= zipCodeFilter[1]
        );
    }

    const currentCenters = adoptionCenters.filter(filters).slice((page - 1) * centersPerPage, page * centersPerPage);
    const totalPages = Math.ceil(adoptionCenters.filter(filters).length / centersPerPage);

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <main>
                <Stack spacing={10}>
                    <NavBar />

                    <Stack direction="row">
                        <FilterStack
                            nameFltr={nameFltr}
                            addressFltr={addressFltr}
                            zipCodeFilter={zipCodeFilter}
                            setNameFltr={setNameFltr}
                            setAddressFltr={setAddressFltr}
                            setZipCodeFltr={setZipCodeFltr}
                        />

                        <Grid container direction="row" display="flex" alignItems="center" justifyContent="left" rowGap={2} spacing={2}>
                            {currentCenters.map((center) => (
                                <Grid item key={center.id}>
                                    <AdoptionCenterCard adoptionCenterId={center.id} />
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>

                    <Stack sx={{ paddingBottom: 10 }} alignItems="center">
                        <Pagination count={totalPages} page={page} onChange={handlePageChange} />
                    </Stack>
                </Stack>
            </main>
        </>
    );
}
