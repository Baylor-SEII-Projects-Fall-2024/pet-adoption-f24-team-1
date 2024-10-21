import React from 'react';
import Head from 'next/head';
import { Button, Card, CardContent, Stack, Typography, Grid, TextField, Container, Link, Paper, Box } from '@mui/material'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import NavBar from '@/components/nav-bar';
import FilterStack from '@/components/filter-stack';
import PetCard from '@/components/pet-card';


export default function UserHome() {
  const router = useRouter();

  const [pets, setPets] = useState([]);
  

  const navigateTo = (page) => {
    router.push(page);
  }

  // Get pets from database
  useEffect(() => {
    const recommendedPets = [
      {
        id: 1,
        name: 'Buddy',
        breed: 'Husky',
        age: 5,
        gender: 'Male',
        weight: 30,
        imgSrc: 'https://www.akc.org/wp-content/uploads/2021/10/Siberian-Husky-puppy-running-in-the-grass.jpg',
        location: {adoptionCenter: 'Home Free', address: '111 Drive Street, Waco, TX 76706'},
        description: 'Buddy is a 5-year-old Husky with a loving and friendly nature. He has a great sense of smell and is well-traveled.',
        adopted: false
      },
      {
        id: 2,
        name: 'Max',
        breed: 'Labrador Retriever',
        age: 3,
        gender: 'Male',
        weight: 25,
        imgSrc: 'https://t4.ftcdn.net/jpg/02/90/84/47/360_F_290844781_V4hoIL3E291xvY5nEL7NCaWIoCIQxHfI.jpg',
        location: {adoptionCenter: 'Pet Heaven', address: '987 Round About Ln, Waco, TX 76706'},
        description: 'Max is a 3-year-old Labrador Retriever with a friendly and loving nature. He is a bit shy but is eager to please.',
        adopted: false
      },
      {
        id: 3,
        name: 'Luna',
        breed: 'Golden Retriever',
        age: 2,
        gender: 'Female',
        weight: 20,
        imgSrc: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2020/07/09151754/Golden-Retriever-puppy-standing-outdoors.jpg',
        location: {adoptionCenter: 'Friends Furever', address: '1813 Loop, Waco, TX 76706'},
        description: 'Luna is a 2-year-old Golden Retriever with a friendly and loving nature. She is a bit shy but is eager to please.',
        adopted: false
      }
    ]
    setPets(recommendedPets);
    
    axios.get('http://localhost:8080/api/pets')
     .then(response => {
        console.log(response.data);
        //setPets(response.data);
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
            <NavBar />
            <Stack direction="row" spacing={5}>
              <FilterStack />
              <Grid container direction="row" display="flex" alignItems="center" justifyContent="left" rowGap={2} spacing={2}>
                {pets.map((pet) => (
                    <Grid item key={pet.id}>
                      <PetCard name={pet.name} breed={pet.breed} age={pet.age} gender={pet.gender} weight={pet.weight} imgSrc={pet.imgSrc} id={pet.id} location={pet.location} />
                    </Grid>
                ))}
              </Grid>
            </Stack>

            {/* Add a button to navigate to the About page */}
            <Button variant="contained" onClick={() => navigateTo('/about')} sx={{ width: 200, alignSelf: 'center' }}>About Us</Button>
          </Stack>
        </main>
      </>
  );
}