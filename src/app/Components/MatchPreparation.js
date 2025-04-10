'use client';

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Grid, Box, Typography, Paper } from '@mui/material';
import Link from 'next/link';

// Sample formations
const formations = [
  { id: 1, name: '4-4-2', image: '/images/Formation-4-4-2.webp' },
  { id: 2, name: '4-3-3', image: '/images/Formation-4-3-3.webp' },
  { id: 3, name: '4-2-4', image: '/images/Formation-4-2-4.webp' },
  { id: 4, name: '3-4-3', image: '/images/Formation-3-4-3.webp' },
];

export default function ExampleDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedFormation, setSelectedFormation] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormationSelect = (formation) => {
    setSelectedFormation(formation);
    localStorage.setItem('selectedFormation', JSON.stringify(formation.name));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        marginBottom: 4,
        maxWidth: 800,
        marginX: 'auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
      }}
    >
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Player Management
      </Typography>

      <Typography variant="body1" textAlign="center" color="text.secondary" mb={3}>
        Use this section to choose your team's starting lineup based on your preferred formation.
        You can view and select different formations to see how they will shape your team on the pitch.
      </Typography>

      <Box display="flex" justifyContent="center">
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            borderColor: '#000',
            fontWeight: 'bold',
            textTransform: 'none',
            paddingX: 3,
            paddingY: 1.5,
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#fff',
              color: '#000',
              borderColor: '#000',
            },
          }}
        >
          View formations
        </Button>
      </Box>

      {/* Formation dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select a Formation</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justifyContent="center">
            {formations.map((formation) => (
              <Grid item xs={12} sm={6} md={4} key={formation.id}>
                <Button
                  onClick={() => handleFormationSelect(formation)}
                  fullWidth
                  variant={selectedFormation?.id === formation.id ? 'contained' : 'outlined'}
                  color="primary"
                  sx={{
                    textAlign: 'center',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                  }}
                >
                  <img
                    src={formation.image}
                    alt={formation.name}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '8px',
                    }}
                  />
                  <Typography fontWeight="bold">{formation.name}</Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Link href="../teammanager/SideBarLinks/PlayerManagement" passHref>
            <Button color="primary">Pick Players</Button>
          </Link>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
