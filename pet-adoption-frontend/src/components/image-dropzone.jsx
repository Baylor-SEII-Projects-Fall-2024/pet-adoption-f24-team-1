import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import { Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
 
 export default function ImageDropzone(props) {

  return (
    <CldUploadWidget 
      uploadPreset="dnslxddnnpetadoption"
      onSuccess={(result) => {
        // Set the image URL after a successful upload
        props.newPetData.imgUrl = result.info.secure_url;
      }}
      >
      {({ open }) => {
        return (
          <Button variant="outlined" startIcon={<ImageIcon/>} sx={{borderColor: "dimgray", color: "dimgray", fontSize: "18px"}} 
            onClick={() => open()}>
            Upload Image
          </Button>
        );
      }}
    </CldUploadWidget>
  )
 }

