import * as React from 'react';
import Head from 'next/head'
import { Button, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import styles from '@/styles/Home.module.css'
import Paper from '@mui/material/Paper';
import { DataGrid} from '@mui/x-data-grid';
import { useRef,useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'
import NavBar from '@/components/nav-bar';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import { styled, css } from '@mui/system';




const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;



export default function ManageEvents() {
  const user = useAuthUser();
  const [openInsertDialog, setOpenInsertDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const [newEventData, setNewEventData] = useState({
    title: '',
    date:  '',
    description: '',
    location: '',
    thecenterId: ''
  });
  const columns = [
    { field: "eventID", headerName: "Event ID", width: 100 },
    { field: "title", headerName: "Title", width: 100 },
    { field: "date", headerName: "Date", width: 100 },
    { field: "description", headerName: "Description", width: 100 },
    { field: "location", headerName: "Location", width: 100 },
  ];
  const [events, setEvents] = useState([]);  // State to hold the event data
  const [isFormValid, setIsFormValid] = useState(false);

  const [adoptionCenter, setAdoptionCenter] = useState(null);

  useEffect(() => {
    axios
    .get(`${apiBaseUrl}/api/admins/center/${user.id}`)
    .then(response => {
      setAdoptionCenter(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEventData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };  





  const loadData = async() => { 
    if(adoptionCenter){
    console.log("Loaded center: " + adoptionCenter.centerId)
    axios
    .get(`${apiBaseUrl}/api/events/${adoptionCenter.centerId}`)
    .then((response) => {
      setEvents(response.data); 
      console.log(response.data)
    })
    .catch((error) => {
      console.log('error is happening here: ', error);
    });
  }
  };

  useEffect(() => {
    loadData();
  }, [adoptionCenter]);


  const handleDialogClose = () => {
    setOpenInsertDialog(false);
    setOpenUpdateDialog(false);
    setNewEventData({ // Reset event data
      eventTitle: '',
      eventDate: '',
      eventDescription: '',
      eventLocation: '',  
      eventCenterID: ''
    });
  };


  const eventsData = events.map(event => ({
    id: event.eventID,
    eventID: event.eventID,
    title: event.title,
    date: event.date,
    description: event.description,
    location: event.location,
    thecenterID: event.thecenterID
    }));

    const getEventByID = (eventID) => {
      return eventsData.find(event => event.id === eventID);
    }


    useEffect(() => {
      setIsFormValid(
        (newEventData.title || '').trim() !== '' &&
        (newEventData.date || '').trim() !== '' &&
        (newEventData.description || '').trim() !== '' &&
        (newEventData.location || '').trim() !== ''
      );
    }, [newEventData]);
    
  const handleInsertEvent = () => {
    if(isFormValid){
    newEventData.thecenterId = adoptionCenter.centerId;
    console.log(newEventData)
    axios.post(`${apiBaseUrl}/api/events`, newEventData )
      .then(response => {
        loadData(); // Reload data to see the newly inserted event
        handleDialogClose();
      })
      .catch(error => {
        console.error("Insert Failed:", error);
      });
    }else{
      let str = "";

      if((newEventData.title || '').trim() === ''){
        str+=" title"
      }
      if((newEventData.date  || '').trim() === ''){
        str+=" date"
      }
      if((newEventData.description || '').toString().trim() === ''){
        str+=" description"
      }
      if((newEventData.location || '').trim() === ''){
        str+=" location"
      }

      alert(`Please provide proper input for:${str}`);
    }
  }

  const handleInsertDialogOpen = () => {
    setOpenInsertDialog(true);
  };



  const handleDeleteEvents = () => {
    const selectedIDs = selectionModel; // selection should be an array now

    
    console.log("Selected IDs for deletion:", selectionModel);
    for(const eventID of selectedIDs){
      axios
        .delete(`${apiBaseUrl}/api/events/${eventID}`)
        .then(response => {
          loadData();
        })
        .catch(error => {
          console.error("Deletion Failed:", error);
        });
    }  

  };


  const handleUpdateDialogOpen = () => {
    if (selectionModel.length === 1) { // Ensure only one event is selected
      const selectedEvent = getEventByID(selectionModel[0]);
      if (selectedEvent) {
        const formattedDate = new Date(selectedEvent.date).toISOString().split('T')[0];
        console.log(formattedDate)
        setNewEventData({
          title: selectedEvent.title,
          date: formattedDate,
          description: selectedEvent.description,
          location: selectedEvent.location,
          theCenterId: adoptionCenter.id,
        });
        setOpenUpdateDialog(true); // Open the update dialog
      }
    } else {
      console.log('Please select one event to update.');
    }
  };

  const handleUpdateEvent = () => {
    const eventID = selectionModel[0]; // Get the selected event ID
    axios.put(`${apiBaseUrl}/api/events/${eventID}`, newEventData) // Update the event
      .then(response => {
        console.log('Update successful:', response.data);
        loadData(); // Reload the data after the update
        handleDialogClose(); // Close the dialog
      })
      .catch(error => {
        console.error('Update failed:', error);
      });
  };

  

  const router = useRouter();

  const navigateTo = (page) => {
    router.push(page);
  }


  const today = new Date();
  const defaultDate = today.toISOString().split('T')[0]; // "YYYY-MM-DD"

  return (
    <>
      <Head>
        <title>Manage Events</title>
      </Head>

      <main>          
      <p>Manage Events Page</p>
      <NavBar />

        <Stack sx={{  paddingTop: 10, flexDirection:'row', flexGrow: 1,spacing:'4'}}  gap={2}>
        
          {/* <Paper sx={{ height: 400, width: '50%' }}> */}
            <DataGrid
              key={eventsData.length}  // This will trigger a rerender when data changes
              rows={eventsData}
              columns={columns}
              pageSizeOptions={[2, 50, 100]}
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
            <Button variant='contained' color="primary" onClick={() => handleDeleteEvents()} className={styles.wideButton}>DELETE</Button>
            <Button variant='contained' color="primary" onClick={() => handleInsertDialogOpen()}>INSERT</Button>            
          </Stack>
        </Stack>
        <Dialog open={openInsertDialog} onClose={handleDialogClose}>
          <DialogTitle>Insert Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the details of the event you want to insert.
            </DialogContentText>
            <TextField margin="dense" name="title" label="Title"  type="text" fullWidth variant="outlined" value={newEventData.title} onChange={handleInputChange}/>
            <TextField margin="dense" name="date"  type="date" fullWidth variant="outlined" value={newEventData.date} onChange={handleInputChange}/>
            <TextField margin="dense" name="description" label="Description"  type="text" fullWidth variant="outlined" value={newEventData.description} onChange={handleInputChange}/>
            <TextField margin="dense" name="location" label="Location"  type="text" fullWidth variant="outlined" value={newEventData.location} onChange={handleInputChange}/>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleInsertEvent}>Insert</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openUpdateDialog} onClose={handleDialogClose}>
          <DialogTitle>Update Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please change the details of the event you want to update.
            </DialogContentText>
            <TextField margin="dense" name="title" label="Title"  type="text" fullWidth variant="outlined" value={newEventData.title} onChange={handleInputChange}/>
            <TextField margin="dense" name="date"  type="date" fullWidth variant="outlined" value={newEventData.date} onChange={handleInputChange}/>
            <TextField margin="dense" name="description" label="Description"  type="text" fullWidth variant="outlined" value={newEventData.description} onChange={handleInputChange}/>
            <TextField margin="dense" name="location" label="Location"  type="text" fullWidth variant="outlined" value={newEventData.location} onChange={handleInputChange}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleUpdateEvent}>Update</Button>
          </DialogActions>
        </Dialog>

      </main>
    </>
  );
}