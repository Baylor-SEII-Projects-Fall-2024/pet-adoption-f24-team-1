import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useRouter } from 'next/router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

export default function PetInfoModal(props) {
  const router = useRouter();

  const handleAdopt = () => {
    router.push('/pet-adoption-form');
  }
  
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>

            <Box component="img" sx={{ width: 350, height: 250, objectFit: "cover"}} src={props.pet.imgUrl} alt="pet image"/>

            <Typography variant="h4" component="h2" sx={{ mt: 1}}>
              {props.pet.petName}
            </Typography>

            <Typography align="center" sx={{ mt: 1 }}>
              {props.pet.petName} is a {props.pet.color} {props.pet.petGender} {props.pet.petBreed}, weighing approximately {props.pet.petWeight} kilograms. {props.pet.petGender === 'Male' ? 'He' : 'She'} has a sweet personality and is waiting for the perfect family to provide lots of love and care.
            </Typography>
            
            
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
              <Button variant="contained" sx={{ fontSize: '20px' }} onClick={() => handleAdopt()} startIcon={<VolunteerActivismIcon/>}>Adopt {props.pet.petName}</Button>
            </Box>

            <Box display="flex" justifyContent="flex-end" alignItems="flex-end" sx={{ mt: 0, width: '90%'}}>
              <Button onClick={props.handleClose}>Close</Button>
            </Box>

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
