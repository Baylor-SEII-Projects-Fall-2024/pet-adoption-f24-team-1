import * as React from 'react';
import Head from 'next/head'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import styles from '@/styles/Home.module.css'
import Paper from '@mui/material/Paper';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import axios from 'axios';



export default function ManagePets() {
  const [rows, setRows] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');

  const columns = [
    { field: "petID", headerName: "Pet ID", width: 100 },
    { field: "petName", headerName: "Name", width: 150 },
    { field: "petBreed", headerName: "Breed", width: 150 },
    { field: "petGender", headerName: "Gender", width: 120 },
    { field: "petAge", headerName: "Age", width: 100 },
    { field: "petWeight", headerName: "Weight (kg)", width: 130 },
    { field: "petpecies", headerName: "Species", width: 150 },
    { field: "color", headerName: "Color", width: 130 }
  ];
  const [adoptionCenterName, setAdoptionCenter] = useState("")



  const [pets, setPets] = useState([]);  // State to hold the pet data
  const [loading, setLoading] = useState(true);  // State to handle loading
  const [error, setError] = useState(null);  // State to handle errors

  // Fetch pet data from backend API
  useEffect(() => {
    fetch('http://localhost:8080/api/pets')  // Adjust this endpoint as per your backend
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPets(data);  // Set the fetched data to state
        setLoading(false);  // Data fetching complete
      })
      .catch((error) => {
        setError(error);  // Handle error
        setLoading(false);
      });
      
  }, []);



  const petsData = pets.map(pet => ({
    id: pet.petID,
    petID: pet.petID,            // Pet ID column
    petName: pet.petName,      // Pet's name
    petBreed: pet.petBreed,    // Pet's breed
    petGender: pet.petGender,  // Pet's gender
    petAge: pet.petAge,        // Pet's age
    petWeight: pet.petWeight,  // Pet's weight
    petSpecies: pet.petSpecies,// Pet's species
    color: pet.color             // Pet's color
  }));

  console.log(pets);

  return (
    <>
      <Head>
        <title>Manage Pets</title>
      </Head>

      <main>          
      <p>Manage Pets Page</p>

        <Stack sx={{  paddingTop: 10, flexDirection:'row', flexGrow: 1,spacing:'4'}}  gap={2}>
        
          <Paper sx={{ height: 400, width: '50%' }}>
            <DataGrid
              rows={petsData}
              columns={columns}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>

          <Stack s1 = {{direction:'column', spacing:'2'}}>
            <Button variant='contained' color="secondary" onClick={() => navigateTo('adoption-center-home')} className={styles.wideButton}>UPDATE</Button>
            <Button variant='contained' color="secondary" onClick={() => navigateTo('adoption-center-home')} className={styles.wideButton}>DELETE</Button>
            <Button variant='contained' color="secondary" onClick={() => insertPets()} className={styles.wideButton}>Insert Pets</Button>
            <Button variant='contained' color="secondary" onClick={() => navigateTo('adoption-center-home')} className={styles.wideButton}>LOAD DATA</Button>
          </Stack>
        </Stack>
      </main>
    </>
  );
}