import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Button, Modal, Box, Stack, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';
import ProtectedAdminRoute from '@/components/protected-admin-route';
import Head from 'next/head';
import NavBar from '@/components/nav-bar';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const user = useAuthUser();

  useEffect(() => {
    // Get adoption center id
    const getAdoptionCenterId = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/api/admins/center/${user.id}`);
            return response.data.centerId;
        } catch (error) {
            console.error("Error getting center id:", error);
            return -1;
        }
    };

    getAdoptionCenterId().then((centerId) => {
        // Fetch notifications from the backend
        const fetchNotifications = async () => {
            try {
            const response = await axios.get(`${apiBaseUrl}/api/notifications/${centerId}`);
            setNotifications(response.data);
            } catch (error) {
            console.error("Error fetching notifications:", error);
            }
        };
        fetchNotifications();
        console.log(notifications);
    });
  }, []);

  const handleOpen = (notification) => {
    setSelectedNotification(notification);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNotification(null);
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.post(`${apiBaseUrl}/api/notifications/markAsRead/${notificationId}`);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, isRead: true } : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const approveAdoption = async () => {
    const getPetName = async (petId) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/api/pets/pet/${petId}`);
            return response.data.petName;
        } catch (error) {
            console.error("Error getting center id:", error);
            return -1;
        }
    };
    const petId = selectedNotification.petAdoptionForm.petId;
    const petName = await getPetName(petId);
    const centerName = selectedNotification.adoptionCenter.centerName;
    const notificationId = selectedNotification.id;
    const userId = selectedNotification.petAdoptionForm.userId;
    const title = "Adoption request approved";
    const message = `Congratulations! Your adoption request for ${petName} has been approved by ${centerName}.`
    
    // Send notification to user
    try {
        await axios.post(`${apiBaseUrl}/api/notifications/user/send`, null, {
            params: {
                title: title,
                message: message,
                userId: userId
            }
        });
    } catch (error) {
        console.error("Error sending notification:", error);
        return -1;
    }
    const email = selectedNotification.petAdoptionForm.email;
    const userName = selectedNotification.petAdoptionForm.fullName;
    // SENDING THE USER AN EMAIL ON TOP OF OTHER NOTIFICAITONS
    try {
        
        await axios.get(`${apiBaseUrl}/api/emails/User-Adoption-Confirmed`, {
            params: {
                petName: petName,
                userId: userId
            }
        });
    } catch (error) {
        console.error("Error sending notification:", error);
        return -1;
    }

    // Remove pet from database
    try {
        await axios.delete(`${apiBaseUrl}/api/pets/${petId}`);
    } catch (error) {
        console.error("Error removing pet:", error);
        return -1;
    }

    // Remove notification
    try {
        await axios.delete(`${apiBaseUrl}/api/notifications/${notificationId}`);
    } catch (error) {
        console.error("Error removing pet:", error);
        return -1;
    }

    // Reload page
    window.location.reload();
  }

  const declineAdoption = async () => {
    const getPetName = async (petId) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/api/pets/pet/${petId}`);
            return response.data.petName;
        } catch (error) {
            console.error("Error getting center id:", error);
            return -1;
        }
    };
    const petId = selectedNotification.petAdoptionForm.petId;
    const petName = await getPetName(petId);
    const centerName = selectedNotification.adoptionCenter.centerName;
    const notificationId = selectedNotification.id;
    const userId = selectedNotification.petAdoptionForm.userId;
    const title = "Adoption request declined";
    const message = `We're sorry, but your adoption request for ${petName} has been declined by ${centerName}.`

    // Send notification to user
    try {
        await axios.post(`${apiBaseUrl}/api/notifications/user/send`, null, {
            params: {
                title: title,
                message: message,
                userId: userId
            }
        });
    } catch (error) {
        console.error("Error sending notification:", error);
        return -1;
    }

    // Remove notification
    try {
        await axios.delete(`${apiBaseUrl}/api/notifications/${notificationId}`);
    } catch (error) {
        console.error("Error removing pet:", error);
        return -1;
    }

    // Reload page
    window.location.reload();
  }

  return (
    <ProtectedAdminRoute>
        <Head>
            <title>Notifications</title>
        </Head>

        <main>
            <NavBar />
            <Container maxWidth="sm" sx={{ mt: 15 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Notifications
            </Typography>

            {notifications.map((notification) => (
                <Card key={notification.id} sx={{ mb: 2 }}>
                <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                    <Badge
                        color="error"
                        variant="dot"
                        invisible={notification.read} // Hide badge if the notification is read
                        sx={{ '& .MuiBadge-dot': { right: -3, top: 3 } }} // Position the badge slightly
                    >
                        <NotificationsIcon fontSize="large" />
                    </Badge>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{notification.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                        {new Date(notification.timestamp).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">{notification.message}</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        onClick={() => {
                        handleOpen(notification);
                        markAsRead(notification.id);
                        }}
                    >
                        View
                    </Button>
                    </Stack>
                </CardContent>
                </Card>
            ))}

            {/* Modal for viewing notification details */}
            <Modal open={open} onClose={handleClose}>
                <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
                >
                    <Typography variant="h6" gutterBottom>
                        {selectedNotification?.message}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        {new Date(selectedNotification?.timestamp).toLocaleString()}
                    </Typography>

                    <Typography variant="subtitle1" sx={{ mt: 2 }}>Adoption Form Details</Typography>
                    <Typography variant="body2"><strong>Full Name:</strong> {selectedNotification?.petAdoptionForm?.fullName}</Typography>
                    <Typography variant="body2"><strong>License Number:</strong> {selectedNotification?.petAdoptionForm?.licenseNumber}</Typography>
                    <Typography variant="body2"><strong>Address:</strong> {selectedNotification?.petAdoptionForm?.address}</Typography>
                    <Typography variant="body2"><strong>City, State, Zip:</strong> {selectedNotification?.petAdoptionForm?.cityStatZip}</Typography>
                    <Typography variant="body2"><strong>Phone Number:</strong> {selectedNotification?.petAdoptionForm?.phoneNumber}</Typography>
                    <Typography variant="body2"><strong>Email:</strong> {selectedNotification?.petAdoptionForm?.email}</Typography>
                    <Typography variant="body2"><strong>Employer:</strong> {selectedNotification?.petAdoptionForm?.employer}</Typography>
                    <Typography variant="body2"><strong>Duration Time:</strong> {new Date(selectedNotification?.petAdoptionForm?.durationTime).toLocaleString()}</Typography>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
                            Close
                        </Button>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}>
                            <Button onClick={declineAdoption} variant="outlined" sx={{ mt: 2, color: 'red' }}>
                                Decline
                            </Button>
                            <Button onClick={approveAdoption} variant="contained" sx={{ mt: 2 }}>
                                Approve
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            </Container>
        </main>
    </ProtectedAdminRoute>
  );
}

export default NotificationsPage;
