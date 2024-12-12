import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Box, Typography, Grid, TextField, Button, Avatar } from '@mui/material';
import NavBar from '@/components/nav-bar';
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import ImageDropzone from '@/components/image-dropzone';
import ProtectedAdminRoute from '@/components/protected-admin-route';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AdoptionCenterAccount() {
  const user = useAuthUser();

  // Admin Info States
  const [adminFirstName, setAdminFirstName] = useState('');
  const [adminLastName, setAdminLastName] = useState('');

  // Admin login information
  const [currentAdminEmail, setCurrentAdminEmail] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Adoption Center Info States 
  const [centerId, setCenterId] = useState('');
  const [centerName, setCenterName] = useState('');
  const [centerAddress, setCenterAddress] = useState('');
  const [zipCode, setCenterZip] = useState('');
  const [centerEmail, setCenterEmail] = useState('');
  const [centerPhone, setCenterPhone] = useState('');
  const [centerImageUrl, setCenterImageUrl] = useState('');

  useEffect(() => {
    if (user?.id && user?.role == "ADMIN") {
      // Fetch current admin 
      axios.get(`${apiBaseUrl}/api/admins/${user.id}`)
        .then(response => {
          const adminData = response.data;
          setAdminFirstName(adminData.firstName || '');
          setAdminLastName(adminData.lastName || '');
          setCurrentAdminEmail(adminData.email || '');
          setNewAdminEmail(adminData.email || '');
        })
        .catch(error => console.error("Error fetching admin info:", error));

      // Fetch current adoption center info
      axios.get(`${apiBaseUrl}/api/admins/center/${user.id}`)
        .then(response => {
          const centerData = response.data;
          setCenterId(centerData.centerId)
          setCenterName(centerData.centerName || '');
          setCenterAddress(centerData.centerAddress || '');
          setCenterZip(centerData.zipCode || '');
          setCenterEmail(centerData.centerEmail || '');
          setCenterPhone(centerData.centerPhone || '');
          setCenterImageUrl(centerData.centerImageUrl || '');
        })
        .catch(error => console.error("Error fetching center info:", error));
    }
  }, [user]);

  // Handlers for Submitting Admin Info 
  const handleSaveAdminInfo = () => {
    const payload = {
      firstName: adminFirstName,
      lastName: adminLastName,
    };

    axios.put(`${apiBaseUrl}/api/admins/${user.id}`, payload)
      .then(response => {
        console.log("Admin info updated:", response.data);
        alert('Account details updated successfully!');
      })
      .catch(error => {
        console.error("Error updating user account:", error);
        alert('Failed to update account details.');
    });
  };

  const handleSaveCenterInfo = () => {
    const payload = {
      centerName,
      centerAddress,
      centerPhone,
      centerEmail,
      zipCode,
      centerImageUrl
    };

    axios.put(`${apiBaseUrl}/api/adoptioncenters/${centerId}`, payload)
      .then(response => {
        console.log("Center info updated:", response.data);
        alert('Adoption Center Details updated successfully!');
      })
      .catch(error => {
        console.error("Error updating adoption center:", error);
        alert('Failed to update adoption center details.');
    });
  };

  ////FIXME: Need to make this work for the admin
  const handleUpdateLoginInfo = () => {
    setError('');
    if (newPassword && newPassword !== confirmPassword) {
        setError('Passwords do not match.');
        return;
    }

    const payload = {
        currentPassword,
        newPassword: newPassword || undefined,
        newAdminEmail: newAdminEmail !== currentAdminEmail ? newAdminEmail : undefined,
    };

    axios.put(`${apiBaseUrl}/api/admins/${user.id}/login`, payload)
        .then(response => {
            console.log("Login information updated:", response.data);
            alert('Login information updated successfully!');
        })
        .catch(error => {
            console.error("Error updating login information:", error);
            setError(error.response?.data?.message || 'Failed to update login information.');
        });
};

  return (
    <ProtectedAdminRoute>
      <Head>
        <title>Adoption Center Account</title>
      </Head>
      <main>
        <NavBar />
        <Container maxWidth="md" sx={{ mt: 8 }}>
          {/* Admin Account Section */}
          <Box sx={{ mb: 6, p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Admin Account Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  value={adminFirstName}
                  onChange={(e) => setAdminFirstName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  value={adminLastName}
                  onChange={(e) => setAdminLastName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} textAlign="right">
                <Button variant="contained" color="primary" onClick={handleSaveAdminInfo}>
                  Save Admin Info
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Login Information Section */}
          <Box sx={{ mb: 6, p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Update Login Information
            </Typography>
            {error && <Typography color="error" gutterBottom>{error}</Typography>}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Current Password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} textAlign="right">
                <Button variant="contained" color="primary" onClick={handleUpdateLoginInfo}>
                  Update Login Information
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Adoption Center Section */}
          <Box sx={{ mb: 6, p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Adoption Center Details
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  label="Center Name"
                  value={centerName}
                  onChange={(e) => setCenterName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Center Email"
                  value={centerEmail}
                  onChange={(e) => setCenterEmail(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Center Phone"
                  value={centerPhone}
                  onChange={(e) => setCenterPhone(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Center Address"
                  value={centerAddress}
                  onChange={(e) => setCenterAddress(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Center Zip"
                  value={zipCode}
                  onChange={(e) => setCenterZip(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                {
                  <ImageDropzone setImgUrl={setCenterImageUrl} />
                }
              </Grid>
              <Grid item xs={12} textAlign="right">
                <Button variant="contained" color="primary" onClick={handleSaveCenterInfo}>
                  Save Center Info
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </main>
    </ProtectedAdminRoute>
  );
}
