import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DialogModal(props) {
    const header = props.header;
    const message = props.message;
    const open = props.open;
    const handleYes = props.handleYes;
    const handleNo = props.handleNo;
  
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleNo}
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
            <Typography variant="h6" component="h2">
              {header}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {message}
            </Typography>
            <Box display="flex" justifyContent="end" alignItems="center">
              <Button onClick={handleNo}>No</Button>
              <Button onClick={handleYes}>Yes</Button>
            </Box>

           

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

DialogModal.propTypes = {
    header: PropTypes.string,
    message: PropTypes.string,

}

DialogModal.defaultProps = {
    header: "Header",
    message: "Message goes in here.",
    open: false,
}