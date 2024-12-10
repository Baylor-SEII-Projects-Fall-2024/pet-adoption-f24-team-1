import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Avatar, Grid, Typography, Container, Box, TextField, Button } from '@mui/material';
import NavBar from '@/components/nav-bar';
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import ImageDropzone from '@/components/image-dropzone';
import ProtectedUserRoute from '@/components/protected-user-route';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function UserAccount() {
    const user = useAuthUser();

    // State variables for user data
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    // State variables for login info
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    // Fetch user data on component mount
    useEffect(() => {
        if (user) {
            axios.get(`${apiBaseUrl}/api/users/${user.id}`)
                .then(response => {
                    const data = response.data;
                    setFirstName(data.firstName || '');
                    setLastName(data.lastName || '');
                    setCurrentEmail(data.email || '');
                    setNewEmail(data.email || '');
                    setPhone(data.phone || '');
                    setBio(data.bio || '');
                    setImgUrl(data.imgUrl || '');
                })
                .catch(error => console.error("Error fetching user data:", error));
        }
    }, [user]);

    // Handle Save for user details
    const handleSaveDetails = () => {
        const payload = { firstName, lastName, bio, email: newEmail, phone, imgUrl };

        axios.put(`${apiBaseUrl}/api/users/${user.id}`, payload)
            .then(response => {
                console.log("User account updated:", response.data);
                alert('Account details updated successfully!');
            })
            .catch(error => {
                console.error("Error updating user account:", error);
                alert('Failed to update account details.');
            });
    };

    // Handle Save for login info
    const handleUpdateLoginInfo = () => {
        setError('');
        if (newPassword && newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const payload = {
            currentPassword,
            newPassword: newPassword || undefined,
            newEmail: newEmail !== currentEmail ? newEmail : undefined,
        };

        axios.put(`${apiBaseUrl}/api/users/${user.id}/login`, payload)
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
        <ProtectedUserRoute>
            <Head>
                <title>My Account</title>
            </Head>
            <main>
                <NavBar />
                <Container maxWidth="md" sx={{ mt: 8 }}>
                    {/* User Profile Section */}
                    <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Update Account Details
                        </Typography>
                        <Grid container spacing={2}>
                            {/* Profile Picture */}
                            <Grid item xs={12} textAlign="center">
                                <Avatar
                                    alt={firstName}
                                    src={imgUrl || ''}
                                    sx={{ width: 120, height: 120, margin: '0 auto' }}
                                />
                                <ImageDropzone setImgUrl={setImgUrl} />
                            </Grid>

                            {/* Account Details */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12} textAlign="right">
                                <Button variant="contained" color="primary" onClick={handleSaveDetails}>
                                    Save Details
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Login Information Section */}
                    <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                            Update Login Information
                        </Typography>
                        {error && <Typography color="error" gutterBottom>{error}</Typography>}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
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
                </Container>
            </main>
        </ProtectedUserRoute>
    );
}
