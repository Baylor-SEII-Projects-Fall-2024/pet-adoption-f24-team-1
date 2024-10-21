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


export default function Matches() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);

  // Filters
  const [ageFltr, setAgeFltr] = useState([0, 30]);
  const [weightFltr, setWeightFltr] = useState([0, 100]);
  const [breedFltr, setBreedFltr] = useState('Any');
  const [speciesFltr, setSpeciesFltr] = useState('Any');
  const [genderFltr, setGenderFltr] = useState('Any');
  
  function filters(pet)  {
    return (
      (pet.petAge >= ageFltr[0] && pet.petAge <= ageFltr[1]) &&
      (pet.petWeight >= weightFltr[0] && pet.petWeight <= weightFltr[1]) &&
      (speciesFltr == 'Any' ? true : pet.petSpecies == speciesFltr) &&
      (breedFltr == 'Any' ? true : pet.petBreed == breedFltr) &&
      (genderFltr == 'Any' ? true : pet.petGender == genderFltr)
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

  // Get pets from database
  useEffect(() => {
    if (!user) return;
    console.log(user.id)
    axios.get('http://localhost:8080/api/matches', {
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
          
        
          <Stack direction="row" >
            <FilterStack ageFltr={ageFltr} breedFltr={breedFltr} speciesFltr={speciesFltr} weightFltr={weightFltr} genderFltr={genderFltr} setAgeFltr={setAgeFltr} setBreedFltr={setBreedFltr} setSpeciesFltr={setSpeciesFltr} setWeightFltr={setWeightFltr} setGenderFltr={setGenderFltr}/>
            <Grid container direction="row" display="flex" alignItems="center" justifyContent="left" rowGap={2} spacing={2}>
              {pets.filter(filters).map((pet) => (
                <Grid item>
                  <PetCard key={pet.petID} petName={pet.petName} petBreed={pet.petBreed} petAge={pet.petAge} petGender={pet.petGender} petWeight={pet.petWeight} imgUrl={pet.imgUrl} petID={pet.petID} location={{adoptionCenter: 'Home Free', address: '111 Drive Street, Waco, TX 76706'}} petDescription={pet.petDescription} user={user} liked={true} />
                </Grid>
              ))}
            </Grid>
            
            
          </Stack>
        
        </Stack>
      </main>
    </>
  );
}