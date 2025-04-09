'use client'; // Ensure this is at the very top of the file

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Link from 'next/link'; // Import Link from next/link

// Sample formations
const formations = [
  { id: 1, name: '4-4-2', image: '/images/Formation-4-4-2.png' },
  { id: 2, name: '4-3-3', image: '/images/Formation-4-3-3.png' },
  { id: 3, name: '4-2-4', image: '/images/Formation-4-2-4.png' },
  { id: 4, name: '3-4-3', image: '/images/Formation-3-4-3.png' },
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
    localStorage.setItem('selectedFormation', JSON.stringify(formation.name)); // Save to localStorage
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        View formations
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select a Formation</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justifyContent="center">
            {formations.map((formation) => (
              <Grid item xs={6} sm={4} md={3} key={formation.id}>
                <Button
                  onClick={() => handleFormationSelect(formation)}
                  fullWidth
                  variant={selectedFormation?.id === formation.id ? 'contained' : 'outlined'}
                  color="primary"
                  style={{
                    textAlign: 'center',
                    padding: '10px', // Adjust padding
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={formation.image}
                    alt={formation.name}
                    style={{
                      width: '300px',  // Adjust width
                      height: '200px', // Adjust height
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '8px', // Space between image and name
                    }}
                  />
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{formation.name}</div>
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          {/* Use Link to navigate to player-management page */}
          <Link href="../teammanager/SideBarLinks/PlayerManagement" passHref>
            <Button color="primary">
              Pick Players
            </Button>
          </Link>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
