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
                <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
                    Close
                </Button>
                </Box>
            </Modal>
            </Container>
        </main>
    </ProtectedAdminRoute>
  );
}

export default NotificationsPage;
