import * as React from 'react';
import Head from 'next/head'
import { Button, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import styles from '@/styles/Home.module.css'
import Paper from '@mui/material/Paper';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import axios from 'axios';



export default function ManagePets() {
  // const [selection, setSelection] = useState<GridSelectionModel>([]);

  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPetData, setNewPetData] = useState({
    petName: '',
    petBreed: '',
    petGender: '',
    petAge: '',
    petWeight: '',
    petSpecies: '',
    color: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPetData(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(newPetData);
  };

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


  const loadData = () => {
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
  };

  useEffect(() => {
    loadData();
  }, []);


  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewPetData({ // Reset pet data
      petName: '',
      petBreed: '',
      petGender: '',
      petAge: '',
      petWeight: '',
      petSpecies: '',
      color: ''
    });
  };


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

  const handleInsertPet = () => {
    axios.post("http://localhost:8080/api/pets",newPetData )
      .then(response => {
        loadData(); // Reload data to see the newly inserted pet
        handleDialogClose();
      })
      .catch(error => {
        console.error("Insert Failed:", error);
        setErrorMessage("Insert Failed: " + error.message);
      });
  };
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };




  

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
            <Button variant='contained' color="secondary" onClick={handleDialogOpen}>Insert Pets</Button>            
            <Button variant='contained' color="secondary" onClick={() => navigateTo('adoption-center-home')} className={styles.wideButton}>LOAD DATA</Button>
          </Stack>
        </Stack>
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Insert Pet</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the details of the pet you want to insert.
            </DialogContentText>
            <TextField margin="dense" name="petName" label="Name"  type="text" fullWidth variant="outlined" value={newPetData.petName} onChange={handleInputChange}/>
            <TextField margin="dense"name="petBreed"label="Breed"type="text"fullWidth variant="outlined"value={newPetData.petBreed}onChange={handleInputChange}/>
            <TextField margin="dense"name="petGender"label="Gender"type="text"fullWidthvariant="outlined"value={newPetData.petGender}onChange={handleInputChange}/>
            <TextField margin="dense"name="petAge"label="Age"type="number"fullWidthvariant="outlined"value={newPetData.petAge}onChange={handleInputChange}/>
            <TextField margin="dense"name="petWeight"label="Weight (kg)"type="number"fullWidthvariant="outlined"value={newPetData.petWeight}onChange={handleInputChange}/>
            <TextField margin="dense"name="petSpecies"label="Species"type="text"fullWidth variant="outlined"value={newPetData.petSpecies}onChange={handleInputChange}/>
            <TextField margin="dense"name="color"label="Color"type="text"fullWidthvariant="outlined"value={newPetData.color}onChange={handleInputChange}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleInsertPet}>Insert</Button>
          </DialogActions>
        </Dialog>

      </main>
    </>
  );
}