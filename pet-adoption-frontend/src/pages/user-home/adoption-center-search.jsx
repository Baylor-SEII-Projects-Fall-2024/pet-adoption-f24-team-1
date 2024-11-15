import React from 'react';
import Head from 'next/head';
import { Button, Card, CardContent, Stack, Typography, Grid, TextField, Container, Link, Paper, Box } from '@mui/material'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import NavBar from '@/components/nav-bar';
import FilterStack from '@/components/adoption-center-filter-stack';
//import PetCard from '@/components/pet-card';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import PetCard from "@/components/pet-card";


export default function adoptionCenterSearch() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [adoptionCenter, setCenters] = useState([]);

    // Filters
    const [nameFltr, setNameFltr] = useState('Any');
    const [addressFltr, setAddressFltr] = useState('Any');
    const [zipCodeFltr, setZipCodeFltr] = useState([501, 89049]);

    function filters(AdoptionCenter)  {
        return (
            (AdoptionCenter.zipCode >= zipCodeFltr[0] && AdoptionCenter.zipCode <= zipCodeFltr()[1]) &&
            (addressFltr == 'Any' ? true : AdoptionCenter.centerAddress == addressFltr) &&
            (nameFltr == 'Any' ? true : AdoptionCenter.centerName == breedFltr)
        );
    }

    useEffect(() => {
        const userFromLocalStorage = JSON.parse(sessionStorage.getItem('user'));
        if (userFromLocalStorage) {
            setUser(userFromLocalStorage);
        } else {
            setUser(null);
        }
    }, []);

    const navigateTo = (page) => {
        router.push(page);
    }
    /*
    private long centerId;

        @Column(name = "center_name")
        private String centerName;

        @Column(name = "center_address")
        private String centerAddress;

        @Column(name = "center_phone")
        private String centerPhone;

        @Column(name = "center_email")
        private String centerEmail;

        @Column(name = "zip_code")
        private long zipCode;
     */


    return (
        <>
            <Head>
                <title>Adoption Centers</title>
            </Head>

            <main>
                <Stack spacing={10}>
                    <NavBar/>


                    <Stack direction="row" >
                        <FilterStack nameFltr={nameFltr} addressFltr={addressFltr} zipCodeFltr={zipCodeFltr}/>
                        <Grid container direction="row" display="flex" alignItems="center" justifyContent="left" rowGap={2} spacing={2}>
                            {adoptionCenter.filter(filters).map((pet) => (
                                <Grid item>
                                    <PetCard key={pet.petID} pet={pet} location={{adoptionCenter: 'Home Free', address: '111 Drive Street, Waco, TX 76706'}} user={user} liked={false}/>
                                </Grid>
                            ))}
                        </Grid>


                    </Stack>

                </Stack>
            </main>
        </>
    );
}