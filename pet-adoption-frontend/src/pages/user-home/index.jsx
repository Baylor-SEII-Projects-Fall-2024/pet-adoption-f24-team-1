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


export default function UserHome() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
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

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  // Get location of user
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(position.coords.latitude)
      },
        (error) => console.log(error.message)
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  }, []);


  useEffect(() => {
    const userFromLocalStorage = JSON.parse(sessionStorage.getItem('user'));
    if (userFromLocalStorage) {
      console.log(userFromLocalStorage)
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
    const recommendedPets = [
      {
        petID: 1,
        petName: 'Buddy',
        petBreed: 'Husky',
        petAge: 5,
        petGender: 'Male',
        petWeight: 30,
        imgUrl: 'https://www.akc.org/wp-content/uploads/2021/10/Siberian-Husky-puppy-running-in-the-grass.jpg',
        location: {adoptionCenter: 'Home Free', address: '111 Drive Street, Waco, TX 76706'},
        petDescription: 'Buddy is a 5-year-old Husky with a loving and friendly nature. He has a great sense of smell and is well-traveled.',
        adopted: false
      },
      {
        petID: 2,
        petName: 'Max',
        petBreed: 'Labrador Retriever',
        petAge: 3,
        petGender: 'Male',
        petWeight: 25,
        imgUrl: 'https://t4.ftcdn.net/jpg/02/90/84/47/360_F_290844781_V4hoIL3E291xvY5nEL7NCaWIoCIQxHfI.jpg',
        location: {adoptionCenter: 'Pet Heaven', address: '987 Round About Ln, Waco, TX 76706'},
        petDescription: 'Max is a 3-year-old Labrador Retriever with a friendly and loving nature. He is a bit shy but is eager to please.',
        adopted: false
      },
      {
        petID: 3,
        petName: 'Luna',
        petBreed: 'Golden Retriever',
        petAge: 2,
        petGender: 'Female',
        petWeight: 20,
        imgUrl: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2020/07/09151754/Golden-Retriever-puppy-standing-outdoors.jpg',
        location: {adoptionCenter: 'Friends Furever', address: '1813 Loop, Waco, TX 76706'},
        petDescription: 'Luna is a 2-year-old Golden Retriever with a friendly and loving nature. She is a bit shy but is eager to please.',
        adopted: false
      }
    ]
    //setPets(recommendedPets);
    
    axios.get(`${apiBaseUrl}/api/pets`)
     .then(response => {
        console.log(response.data);
        setPets(response.data);
      })
     .catch(error => {
        console.error('Error fetching pets:', error);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <main>
        <Stack spacing={10}>
          <NavBar/>
          
        
          <Stack direction="row" >
            <FilterStack ageFltr={ageFltr} breedFltr={breedFltr} speciesFltr={speciesFltr} weightFltr={weightFltr} genderFltr={genderFltr} setAgeFltr={setAgeFltr} setBreedFltr={setBreedFltr} setSpeciesFltr={setSpeciesFltr} setWeightFltr={setWeightFltr} setGenderFltr={setGenderFltr}/>
            <Grid container direction="row" display="flex" alignItems="center" justifyContent="left" rowGap={2} spacing={2}>
              {pets.filter(filters).map((pet) => (
                <Grid item>
                  <PetCard key={pet.petID} pet={pet} user={user} liked={false} location={location} />
                </Grid>
              ))}
            </Grid>
            
            
          </Stack>
        
        </Stack>
      </main>
    </>
  );
}