import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageDropzone from './image-dropzone';

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

            <Typography variant="h6" component="h2">
              {props.pet.petName}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              {props.pet.petDescription}
            </Typography>



            <Box display="flex" justifyContent="center" alignItems="center">
              <Button onClick={props.handleClose}>Close Child Modal</Button>
            </Box>

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
