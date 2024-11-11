import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button, Modal, CardMedia } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AdoptionCenterEventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null); // Holds the current event data for the modal
    const router = useRouter();
    const { centerId } = router.query;  // Get the centerId from the URL

    useEffect(() => {
        if (centerId) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events?centerId=${centerId}`)
                .then(response => {
                    setEvents(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching events:", error);
                    setLoading(false);
                });
        }
    }, [centerId]);

    const handleOpenDescriptionModal = (event) => {
        setCurrentEvent(event);
        setOpenDescriptionModal(true);
    };

    const handleCloseDescriptionModal = () => {
        setOpenDescriptionModal(false);
        setCurrentEvent(null);
    };

    if (loading) return <Typography variant="h6">Loading events...</Typography>;

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Events for Adoption Center {centerId}
            </Typography>
            <Grid container spacing={3}>
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                        <Card elevation={3}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={event.imageUrl}
                                alt={event.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{event.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{event.date}</Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleOpenDescriptionModal(event)}
                                >
                                    View Description
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Description Modal */}
            <Modal
                open={openDescriptionModal}
                onClose={handleCloseDescriptionModal}
                aria-labelledby="description-modal-title"
                aria-describedby="description-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    {currentEvent && (
                        <>
                            <Typography id="description-modal-title" variant="h6" component="h2">
                                Description of {currentEvent.title}
                            </Typography>
                            <Typography id="description-modal-description" sx={{ mt: 2 }}>
                                {currentEvent.description}
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleCloseDescriptionModal}
                                sx={{ mt: 2 }}
                            >
                                Close
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}
