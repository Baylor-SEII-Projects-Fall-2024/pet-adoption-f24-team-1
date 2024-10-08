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
  const [columns, setColumns] = useState([]);
  const [adoptionCenterName, setAdoptionCenter] = useState("")


  const loadData = (e) => {

    axios.get("http://localhost:8080/api/loadPetData", {
      responseType: "json",

    })
      .then(response => {
        alert("Login successful!");
        console.log(response.data); // Handle authentication state here
      })
        .catch(error => {
          alert("Login failed: " + error.message);
        });
  };

  const insertPets = (e) => {
    axios.put("http://localhost:8080/api/insertPet/", {
    })
  };


  useEffect(() => {
    loadData();
  }, [])

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
              rows={rows}
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