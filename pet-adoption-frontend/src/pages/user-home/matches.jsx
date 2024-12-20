import React from 'react';
import Head from 'next/head';
import { Button, Card, CardContent, Stack, Typography, Grid, TextField, Container, Link, Paper, Box } from '@mui/material'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import NavBar from '@/components/nav-bar';
import FilterStack from '@/components/filter-stack';
import PetCard from '@/components/pet-card';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';


export default function Matches() {
  const user = useAuthUser();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [pets, setPets] = useState([]);

  // Filters
  const [ageFltr, setAgeFltr] = useState([0, 30]);
  const [weightFltr, setWeightFltr] = useState([0, 200]);
  const [breedFltr, setBreedFltr] = useState('Any');
  const [speciesFltr, setSpeciesFltr] = useState('Any');
  const [genderFltr, setGenderFltr] = useState(() => ['Male', 'Female']);
  
  function filters(pet)  {
    return (
      (pet.petAge >= ageFltr[0] && pet.petAge <= ageFltr[1]) &&
      (pet.petWeight >= weightFltr[0] && pet.petWeight <= weightFltr[1]) &&
      (speciesFltr == 'Any' ? true : pet.petSpecies == speciesFltr) &&
      (breedFltr == 'Any' ? true : pet.petBreed == breedFltr) &&
      (genderFltr.length == 2 || genderFltr.length == 0 ? true : pet.petGender == genderFltr[0])
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
            <FilterStack ageFltr={ageFltr} breedFltr={breedFltr} speciesFltr={speciesFltr} weightFltr={weightFltr} genderFltr={genderFltr} setAgeFltr={setAgeFltr} setBreedFltr={setBreedFltr} setSpeciesFltr={setSpeciesFltr} setWeightFltr={setWeightFltr} setGenderFltr={setGenderFltr}/>
            <Grid container direction="row" display="flex" alignItems="center" justifyContent="left" rowGap={2} spacing={2}>
              {pets.filter(filters).map((pet) => (
                <Grid item>
                  <PetCard key={pet.petID} pet={pet} location={{adoptionCenter: 'Home Free', address: '111 Drive Street, Waco, TX 76706'}} user={user} liked={true} />
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