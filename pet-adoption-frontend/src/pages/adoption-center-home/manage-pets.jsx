import * as React from 'react';
import Head from 'next/head'
import { Button, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box } from '@mui/material'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import { DataGrid } from '@mui/x-data-grid';
import { Select, MenuItem } from '@mui/material';
import NavBar from '@/components/nav-bar';
import { useEffect, useState } from 'react'
import axios from 'axios';
import ImageDropzone from '@/components/image-dropzone';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;


export default function ManagePets() {
  const user = useAuthUser();
  const [adoptionCenter, setAdoptionCenter] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    axios.get(`${apiBaseUrl}/api/admins/center/${user.id}`)
    .then(response => {
      setAdoptionCenter(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);


  const [openInsertDialog, setOpenInsertDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const [newPetData, setNewPetData] = useState({
    petName: '',
    petBreed: '',
    petGender: '',
    petAge: '',
    petWeight: '',
    petSpecies: '',
    color: '',
    imgUrl: '',
    centerID: ''
  });


  const columns = [
    { field: "petID", headerName: "Pet ID", width: 100 },
    { field: "petName", headerName: "Name", width: 150 },
    { field: "petBreed", headerName: "Breed", width: 150 },
    { field: "petGender", headerName: "Gender", width: 120 },
    { field: "petAge", headerName: "Age", width: 100 },
    { field: "petWeight", headerName: "Weight (kg)", width: 130 },
    { field: "petSpecies", headerName: "Species", width: 150 },
    { field: "color", headerName: "Color", width: 130 },
    { field: "imgUrl", headerName: "Image URL", width: 130 }
  ];
  
  const [pets, setPets] = useState([]);  // State to hold the pet data
  const [imgUrl, setImgUrl] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPetData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };  


  const loadData = () => {
    axios
    .get(`${apiBaseUrl}/api/pets/${user.id}`)  // Adjust this endpoint as per your backend
    .then((response) => {
      setPets(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    loadData();
  }, []);


  const handleDialogClose = () => {
    setOpenInsertDialog(false);
    setOpenUpdateDialog(false);
    setNewPetData({ // Reset pet data
      petName: '',
      petBreed: '',
      petGender: '',
      petAge: '',
      petWeight: '',
      petSpecies: '',
      color: '',
      imgUrl: '',
      centerID: ''
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
    color: pet.color,             // Pet's color
    imgUrl: pet.imgUrl,         // Pet's image URL
    centerID: pet.centerID
  }));

  const getPetById = (petId) => {
    return petsData.find(pet => pet.id === petId);
  }

  useEffect(() => {
    setIsFormValid(
    (newPetData.petName || '').trim() !== '' &&
    (newPetData.petBreed || '').trim() !== '' &&
    (newPetData.petGender || '').trim() !== '' &&
    (newPetData.petAge || '').toString().trim() !== '' &&
    (newPetData.petWeight || '').toString().trim() !== '' &&
    (newPetData.petSpecies || '').trim() !== '' &&
    (newPetData.color || '').trim() !== '' && 
    newPetData.petAge >= 0 && 
    newPetData.petWeight > 0
    );
  }, [newPetData]);
  

  const handleInsertPet = () => {
    if(isFormValid){
    newPetData.imgUrl = imgUrl;
    newPetData.centerID = adoptionCenter.centerId;
    console.log(newPetData)
    axios.post(`${apiBaseUrl}/api/pets`, newPetData )
      .then(response => {
        loadData(); // Reload data to see the newly inserted pet
        handleDialogClose();
      })
      .catch(error => {
        console.error("Insert Failed:", error);
        //setErrorMessage("Insert Failed: " + error.message);
      });
    }else{
      let str = "";

      if((newPetData.petName || '').trim() === ''){
        str+=" name"
      }
      if((newPetData.petBreed || '').trim() === ''){
        str+=" breed"
      }
      if((newPetData.petGender || '').trim() === ''){
        str+=" gender"
      }
      if((newPetData.petAge || '').toString().trim() === ''){
        str+=" age"
      }else if(newPetData.petAge < 0){
        alert('Pet age cannot be less than 0.')
      }
      if((newPetData.petWeight || '').toString().trim() === ''){
        str+=" weight"
      }else if(newPetData.petWeight <= 0){
        alert('Pet weight cannot be zero or less.')
      }
      if((newPetData.petSpecies || '').trim() === ''){
        str+=" species"
      }
      if((newPetData.color || '').trim() === ''){
        str+=" color"
      }

      alert(`Please fill in values for:${str}.`);
    }
  };
  const handleInsertDialogOpen = () => {
    setOpenInsertDialog(true);
  };

  const handleUpdateDialogOpen = () => {
    if (selectionModel.length === 1) { // Ensure only one pet is selected
      const selectedPet = getPetById(selectionModel[0]);
      if (selectedPet) {
        setNewPetData({
          petName: selectedPet.petName,
          petBreed: selectedPet.petBreed,
          petGender: selectedPet.petGender,
          petAge: selectedPet.petAge,
          petWeight: selectedPet.petWeight,
          petSpecies: selectedPet.petSpecies,
          color: selectedPet.color,
          imgUrl: selectedPet.imgUrl 
        });
        setOpenUpdateDialog(true); // Open the update dialog
      }
    } else {
      console.log('Please select one pet to update.');
    }
  };

  const handleUpdatePet = () => {
    const petID = selectionModel[0]; // Get the selected pet ID
    axios.put(`${apiBaseUrl}/api/pets/${petID}`, newPetData) // Update the pet
      .then(response => {
        console.log('Update successful:', response.data);
        loadData(); // Reload the data after the update
        handleDialogClose(); // Close the dialog
      })
      .catch(error => {
        console.error('Update failed:', error);
      });
  };


  const handleDeletePets = () => {
    const selectedIds = selectionModel; // selection should be an array now

    
    console.log("Selected IDs for deletion:", selectionModel);
    for(const petID of selectedIds){
      axios
        .delete(`${apiBaseUrl}/api/pets/${petID}`)
        .then(response => {
          loadData();
        })
        .catch(error => {
          console.error("Deletion Failed:", error);
        });
    }  

  };


  const router = useRouter();

  const navigateTo = (page) => {
    router.push(page);
  }
  

  return (
    <>
      <Head>
        <title>Manage Pets</title>
      </Head>

      <main>
      <NavBar />
      <p>Manage Pets Page</p>

        <Stack sx={{  paddingTop: 10, flexDirection:'row', flexGrow: 1,spacing:'4'}}  gap={2}>
        
          {/* <Paper sx={{ height: 400, width: '50%' }}> */}
            <DataGrid
              key={petsData.length}  // This will trigger a rerender when data changes
              rows={petsData}
              columns={columns}
              pageSizeOptions={[2,50, 100]}
              sx={{ border: 0 }}
              checkboxSelection
              onRowSelectionModelChange={(newSelection) => {
                setSelectionModel(newSelection);
                console.log(newSelection); // This will print the array of selected IDs
              }}
              selectionModel={selectionModel}
            />
    
          {/* </Paper> */}

          <Stack s1 = {{direction:'column', spacing:'2'}}>
            <Button variant='contained' color="primary" onClick={() => handleUpdateDialogOpen()} className={styles.wideButton}>UPDATE</Button>
            <Button variant='contained' color="primary" onClick={() => handleDeletePets()} className={styles.wideButton}>DELETE</Button>
            <Button variant='contained' color="primary" onClick={() => handleInsertDialogOpen()}>INSERT</Button>            
            {/* <Button variant='contained' color="primary" onClick={() => navigateTo()} className={styles.wideButton}>LOAD DATA</Button> */}
          </Stack>
        </Stack>
        <Dialog open={openInsertDialog} onClose={handleDialogClose}>
          <DialogTitle>Insert Pet</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the details of the pet you want to insert.
            </DialogContentText>
            <TextField margin="dense" name="petName" label="Name"  type="text" fullWidth variant="outlined" value={newPetData.petName} onChange={handleInputChange}/>
            <TextField margin="dense"name="petSpecies"label="Species"type="text"fullWidth variant="outlined"value={newPetData.petSpecies}onChange={handleInputChange}/>
            <TextField margin="dense"name="petBreed"label="Breed"type="text"fullWidth variant="outlined"value={newPetData.petBreed}onChange={handleInputChange}/>
            <TextField margin="dense"name="color"label="Color"type="text"fullWidth variant="outlined"value={newPetData.color}onChange={handleInputChange}/>
            <Select margin="dense"name="petGender"fullWidthvariant="outlined"value={newPetData.petGender}onChange={handleInputChange} displayEmpty sx={{ mt: 1, mr: 1 }} >
              <MenuItem value="" disabled>Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            <TextField margin="dense"name="petAge"label="Age"type="number"fullWidthvariant="outlined"value={newPetData.petAge}onChange={handleInputChange} sx={{ mr: 1 }}/>
            <TextField margin="dense"name="petWeight"label="Weight (kg)"type="number" fullWidthvariant="outlined"value={newPetData.petWeight}onChange={handleInputChange} sx={{ mr: 1 }}/>
            <Box sx={{ width: 200, height: 50 }}>
              <ImageDropzone newPetData={newPetData} imgUrl={imgUrl} setImgUrl={setImgUrl}/>
            </Box>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleInsertPet}>Insert</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openUpdateDialog} onClose={handleDialogClose}>
          <DialogTitle>Update Pet</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please change the details of the pet you want to update.
            </DialogContentText>
            <TextField margin="dense" name="petName" label="Name"  type="text" fullWidth variant="outlined" value={newPetData.petName} onChange={handleInputChange}/>
            <TextField margin="dense"name="petBreed"label="Breed"type="text"fullWidth variant="outlined"value={newPetData.petBreed}onChange={handleInputChange}/>
            <TextField margin="dense"name="petGender"label="Gender"type="text"fullWidthvariant="outlined"value={newPetData.petGender}onChange={handleInputChange}/>
            <TextField margin="dense"name="petAge"label="Age"type="number"fullWidthvariant="outlined"value={newPetData.petAge}onChange={handleInputChange}/>
            <TextField margin="dense"name="petWeight"label="Weight (kg)"type="number"fullWidthvariant="outlined"value={newPetData.petWeight}onChange={handleInputChange}/>
            <TextField margin="dense"name="petSpecies"label="Species"type="text"fullWidth variant="outlined"value={newPetData.petSpecies}onChange={handleInputChange}/>
            <TextField margin="dense"name="color"label="Color"type="text"fullWidth variant="outlined"value={newPetData.color}onChange={handleInputChange}/>

            <Box sx={{ width: 200, height: 50 }}>
              <ImageDropzone newPetData={newPetData}/>
            </Box>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleUpdatePet}>Update</Button>
          </DialogActions>
        </Dialog>

      </main>
    </>
  );
}