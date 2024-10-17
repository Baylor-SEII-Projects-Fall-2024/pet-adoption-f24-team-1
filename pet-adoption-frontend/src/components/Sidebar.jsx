import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

function Sidebar() {
  return (
    <Box sx={{ width: 250, bgcolor: 'grey.100', padding: 2 }}>
      <List>
        <ListItem button>
          <ListItemText primary="Overview" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Adopt" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Rehome" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;