import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Avatar, Button, Grid, Typography, Container, Box, TextField, IconButton, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import NavBar from '@/components/nav-bar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
import axios from 'axios';
import ImageDropzone from '@/components/image-dropzone';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import PetCard from '@/components/pet-card';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function UserProfile() {
  const router = useRouter();
  const user = useAuthUser();

  // State variables for editing
  const [isEditing, setIsEditing] = useState(false);
  const [centerName, setCenterName] = useState();
  const [centerEmail, setCenterEmail] = useState();
  const [centerPhone, setCenterPhone] = useState();
  const [imgUrl, setProfilePicture] = useState();
  const [adoptionCenter, setAdoptionCenter] = useState(null);
  const [pets, setPets] = useState([]);

  // State for the modal
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/api/admins/center/${user.id}`)
    .then(response => {
      setAdoptionCenter(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);
  
  useEffect(() => {
    console.log(user)
    if (adoptionCenter) {
      setCenterName(adoptionCenter.centerName);
      setCenterEmail(adoptionCenter.centerEmail);
      setCenterPhone(adoptionCenter.centerPhone);
      setProfilePicture(adoptionCenter.centerImgUrl);


    }
  }, [adoptionCenter]);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      axios
        .get(`${apiBaseUrl}/api/pets/${user.id}`) // Fetch pets owned by the admin
        .then((response) => {
          console.log(response.data);
          setPets(response.data); // Update the state with the admin's pets
        })
        .catch((error) => {
          console.error("Error fetching admin pets:", error);
        });
    }
  }, [user]);
  

  // Toggle between editing and viewing modes
  //make this change the adoption center 
  const handleEditProfile = () => setIsEditing(true);
  const handleSaveProfile = async () => {
    try {
      await axios.put(`${apiBaseUrl}/api/users/update`, { id, firstName, lastName, bio, email, phone, imgUrl, password, userType });
      sessionStorage.setItem('user', JSON.stringify({ firstName, lastName, bio, email, phone, imgUrl }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handleCancelEdit = () => setIsEditing(false);

  // Function to open the image upload modal
  const handleAvatarClick = () => {
    setOpenModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Head>
        <title>Adoption Center Profile</title>
      </Head>
      <main>
        <NavBar />
        <Container maxWidth="lg" sx={{ display: 'flex', marginTop: '64px' }}>
          <Grid container spacing={2}>
            {/* Main Content */}
            <Grid item xs={9}>
              <Box sx={{ padding: 2, backgroundColor: '#fff', borderRadius: 1, boxShadow: 1, position: 'relative' }}>
                <Grid container spacing={2} alignItems="center">
                  {/* Profile Picture */}
                  <Grid item>
                    <Avatar
                      alt={centerName}
                      src={imgUrl || ''}
                      sx={{ width: 120, height: 120, cursor: 'pointer' }}  // Cursor changes to pointer
                      onClick={handleAvatarClick} // Open modal on click
                    >
                      {!imgUrl && <AccountCircleIcon sx={{ fontSize: 150 }} />}
                    </Avatar>
                  </Grid>

                  {/* Profile Info */}
                  <Grid item xs>
                    {isEditing ? (
                      <>
                        <TextField
                          label="Adoption Center Name"
                          value={centerName}
                          onChange={(e) => setCenterName(e.target.value)}
                          fullWidth
                          sx={{ marginBottom: 1 }}
                        />
                        <TextField
                          label="Email"
                          value={centerEmail}
                          onChange={(e) => setCenterEmail(e.target.value)}
                          fullWidth
                          sx={{ marginBottom: 1 }}
                        />
                        <TextField
                          label="Phone"
                          value={centerPhone}
                          onChange={(e) => setCenterPhone(e.target.value)}
                          fullWidth
                          sx={{ marginBottom: 1 }}
                        />
                      </>
                    ) : (
                      <>
                        <Typography variant="h5">{centerName}</Typography>
                        <Grid container spacing={1} alignItems="center">
                          <Grid item>
                            <EmailIcon fontSize="small" />
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Email:</strong> {centerEmail}
                            </Typography>
                          </Grid>

                          <Grid item>
                            <PhoneIcon fontSize="small" />
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Phone:</strong> {centerPhone}
                            </Typography>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Grid>

                {/* Edit and Save/Cancel Buttons */}
                {isEditing ? (
                  <Box sx={{ marginTop: 2, textAlign: 'right' }}>
                    <IconButton onClick={handleSaveProfile} color="primary" sx={{ marginRight: 1 }}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleCancelEdit} color="secondary">
                      <CancelIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    color="primary"
                    sx={{ position: 'absolute', top: 16, right: 16 }}
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid container direction="row" display="flex" alignItems="center" justifyContent="left" rowGap={2} spacing={2}>
              {pets.map((pet) => (
                <Grid item>
                  <PetCard key={pet.petID} pet={pet} user={user} liked={false} location={location} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>

        {/* Modal for Image Dropzone */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={{ width: 400, bgcolor: 'background.paper', padding: 2, borderRadius: 2, boxShadow: 3, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Upload Profile Picture
            </Typography>
            <ImageDropzone setImgUrl={setProfilePicture} onClose={handleCloseModal} />
            <Button variant="outlined" color="secondary" onClick={handleCloseModal} sx={{ marginTop: 2 }}>
              Cancel
            </Button>
          </Box>
        </Modal>
      </main>
    </>
  );
}