import React from 'react';
import Head from 'next/head';
import { Button, Card, CardContent, Stack, Typography, Grid, TextField, Container, Link, Paper, Box, Pagination } from '@mui/material'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import NavBar from '@/components/nav-bar';
import FilterStack from '@/components/filter-stack';
import AdoptionCenterCard from '@/components/adoption-center-card';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';


export default function AdoptionCenterHome() {
    const user = useAuthUser();

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const [Name, setName] = useState('');
    const [Address, setAddress] = useState([]);
    const [zipCode, setZipCode] = useState(1);
    const centersPerPage = 20;

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

    // Get location of user
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                    setLocation(position.coords.latitude + ', ' + position.coords.longitude);
                },
                (error) => console.log(error.message)
            );
        } else {
            console.log("Geolocation is not supported by this browser");
        }
    }, []);

    const handlePageChange = (event, value) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setPage(value);
    };


    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <main>
                <Stack spacing={10}>
                    <NavBar/>


                    <Stack direction="row" >
                        <FilterStack ageFltr={ageFltr} breedFltr={breedFltr} speciesFltr={speciesFltr} weightFltr={weightFltr} distanceFltr={distanceFltr} genderFltr={genderFltr} setAgeFltr={setAgeFltr} setBreedFltr={setBreedFltr} setSpeciesFltr={setSpeciesFltr} setWeightFltr={setWeightFltr} setDistanceFltr={setDistanceFltr} setGenderFltr={setGenderFltr}/>

                        <Grid container direction="row" display="flex" alignItems="center" justifyContent="left" rowGap={2} spacing={2}>
                            {currentPets.map((pet) => (
                                <Grid item>
                                    <AdoptionCenterCard key={adoptionCenter.Name} adoptionCenter={adoptionCenter} user={user} liked={false} location={location} />
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>

                    <Stack sx={{ paddingBottom: 10 }} alignItems='center'>
                        <Pagination count={totalPages} page={page} onChange={handlePageChange}/>
                    </Stack>
                </Stack>
            </main>
        </>
    );
}