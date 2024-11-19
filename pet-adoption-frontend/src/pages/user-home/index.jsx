import React from 'react';
import Head from 'next/head';
import { Button, Card, CardContent, Stack, Typography, Grid, TextField, Container, Link, Paper, Box, Pagination } from '@mui/material'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import NavBar from '@/components/nav-bar';
import FilterStack from '@/components/filter-stack';
import PetCard from '@/components/pet-card';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';


export default function UserHome() {
  const user = useAuthUser();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [location, setLocation] = useState('');
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const petsPerPage = 20;

  // Filters
  const [ageFltr, setAgeFltr] = useState([0, 30]);
  const [weightFltr, setWeightFltr] = useState([0, 200]);
  const [distanceFltr, setDistanceFltr] = useState(100);
  const [breedFltr, setBreedFltr] = useState('Any');
  const [speciesFltr, setSpeciesFltr] = useState('Any');
  const [genderFltr, setGenderFltr] = useState(() => []);
  
  function filters(pet)  {
    return (
      (pet.petAge >= ageFltr[0] && pet.petAge <= ageFltr[1]) &&
      (pet.petWeight >= weightFltr[0] && pet.petWeight <= weightFltr[1]) &&
      (pet.distance <= distanceFltr) &&
      (speciesFltr == 'Any' ? true : pet.petSpecies == speciesFltr) &&
      (breedFltr == 'Any' ? true : pet.petBreed == breedFltr) &&
      (genderFltr.length == 2 || genderFltr.length == 0 ? true : pet.petGender == genderFltr[0])
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

  // Get pets from database
  useEffect(() => {
    const request = user ? `/api/recommendation/` : '/api/pets'
    if(!user)  {
      console.log('not signed in')
      axios.get(`${apiBaseUrl}${request}`)
      .then(response => {
          let pets = response.data.map(pet => {return {...pet, distance: 0}})
          console.log(pets)
          setPets(pets);
        })
      .catch(error => {
          console.error('Error fetching pets:', error);
        });
    }
    else  {
      axios.get(`${apiBaseUrl}${request}`, {
        params: {
          id: user.id,
          userLocation: location
        }
      })
     .then(response => {
        let pets = response.data.map(item => {return {...item.pet, distance: item.distance}})
        console.log(pets)
        setPets(pets);
      })
     .catch(error => {
        console.error('Error fetching pets:', error);
      });
    }
  }, [location, user]);

  const indexOfLastPet = page * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const filteredPets = pets.filter(filters)
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);
  const totalPages = Math.ceil(filteredPets.length / petsPerPage);

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
                  <PetCard key={pet.petID} pet={pet} user={user} liked={false} location={location} />
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