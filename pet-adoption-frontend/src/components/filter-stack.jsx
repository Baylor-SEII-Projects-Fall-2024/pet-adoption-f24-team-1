import * as React from 'react';
import Head from 'next/head'
import {  Container, Stack, Typography, Box, Item, IconButton, Button } from '@mui/material';
import { MenuItem } from '@mui/base';
import { useState, useEffect } from 'react';

export default function FilterStack() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(sessionStorage.getItem('user'));
    if (userFromLocalStorage) {
      setUser(userFromLocalStorage);
    } else {
      setUser(null);
    }
  }, []);

  return (

    <Container sx={{ justifyContent: 'center', width: `20%`, height: 1}}>
      <Stack spacing={3} sx={{ margin: 'auto', width: `90%`, }} direction="column">
        <Typography align="center">Filters</Typography>
        <Button variant="contained">Option</Button>
        <Button variant="contained">Option</Button>
        <Button variant="contained">Option</Button>
      </Stack>
    </Container>
    );
}
