import React, { useState } from 'react';
import Head from 'next/head'
import { Container, Typography, Card, CardContent, Button, Modal, Box, Stack } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NavBar from '@/components/nav-bar';
import ProtectedAdminRoute from '@/components/protected-admin-route';

const notifications = [
    {
      id: 1,
      title: 'New Thumbnail',
      time: '1 minute ago',
      message: 'Cody Seibert uploaded a new thumbnail test!',
    },
    {
      id: 2,
      title: 'New Comment',
      time: '5 minutes ago',
      message: 'A user commented on your post!',
    },
    {
      id: 3,
      title: 'New Like',
      time: '10 minutes ago',
      message: 'Your post received a new like!',
    },
    {
      id: 4,
      title: 'System Update',
      time: '15 minutes ago',
      message: 'A new system update is available. Please update to the latest version.',
    },
    {
      id: 5,
      title: 'New Follower',
      time: '20 minutes ago',
      message: 'John Doe started following you!',
    },
    {
      id: 6,
      title: 'Account Verification',
      time: '30 minutes ago',
      message: 'Your account has been successfully verified!',
    },
    {
      id: 7,
      title: 'Event Reminder',
      time: '45 minutes ago',
      message: 'Don\'t forget about the event you signed up for tomorrow!',
    },
    {
      id: 8,
      title: 'New Message',
      time: '1 hour ago',
      message: 'You have received a new message from Jane Doe.',
    },
    {
      id: 9,
      title: 'Weekly Summary',
      time: '2 hours ago',
      message: 'Here is your activity summary for the past week.',
    },
    {
      id: 10,
      title: 'Security Alert',
      time: '3 hours ago',
      message: 'A new login was detected from a different device. Please review.',
    },
  ];

function NotificationsPage() {
  const [open, setOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleOpen = (notification) => {
    setSelectedNotification(notification);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNotification(null);
  };

  return (
    <ProtectedAdminRoute>
        <Head>
            <title>Notifications</title>
        </Head>

        <main>
        <NavBar />
        <Container maxWidth="sm" sx={{ mt: 4, my: 10 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Notifications
            </Typography>

            {notifications.map((notification) => (
                <Card key={notification.id} sx={{ mb: 2 }}>
                <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                    <NotificationsIcon fontSize="large" />
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{notification.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                        {notification.time}
                        </Typography>
                        <Typography variant="body2">{notification.message}</Typography>
                    </Box>
                    <Button variant="contained" onClick={() => handleOpen(notification)}>
                        Read
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
                    {selectedNotification?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {selectedNotification?.time}
                </Typography>
                <Typography variant="body1">
                    {selectedNotification?.message}
                </Typography>
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
