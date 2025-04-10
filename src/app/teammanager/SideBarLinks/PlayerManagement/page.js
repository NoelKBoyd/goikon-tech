'use client';
import React, { useState, useEffect } from 'react';
import TeamManagerNav from '@/app/Components/TeamManagerNav';
import TeamManagerSideBar from '@/app/Components/TeamManagerSideBar';
import TeamManagerFooter from '@/app/Components/TeamManagerFooter';
import FormationPitch from '@/app/Components/FormationPitch';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

// Sample players list
const players = [
  'Manuel Nuer', 'Kompany', 'Vidic', 'Marcelo',
  'Reece James', 'Ngolo Kante', 'Xavi', 'Ozil',
  'Cristiano Ronaldo', 'Lionel Messi', 'Neymar Jr', '...Ali Abbas',
];

// Sample formations
const formations = [
  { id: 1, name: '4-4-2', image: '/images/Formation-4-4-2.png' },
  { id: 2, name: '4-3-3', image: '/images/Formation-4-3-3.png' },
  { id: 3, name: '4-2-4', image: '/images/Formation-4-2-4.png' },
  { id: 4, name: '3-4-3', image: '/images/Formation-3-4-3.png' },
];

const PlayerStats = () => {
  const [positions, setPositions] = useState([]);
  const [startingLineup, setStartingLineup] = useState(Array(11).fill(''));
  const [open, setOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState('4-4-2'); // Default

  // Formations and positions
  const formationLayouts = {
    '4-4-2': ['Goalkeeper', 'Right-back', 'Center-back', 'Center-back', 'Left-back', 'Right-midfield', 'Center-midfield', 'Center-midfield', 'Left-midfield', 'Striker', 'Striker'],
    '4-3-3': ['Goalkeeper', 'Right-back', 'Center-back', 'Center-back', 'Left-back', 'Center-midfield', 'Center-midfield', 'Center-midfield', 'Right-wing', 'Striker', 'Left-wing'],
    '4-2-4': ['Goalkeeper', 'Right-back', 'Center-back', 'Center-back', 'Left-back', 'Defensive-midfield', 'Defensive-midfield', 'Right-wing', 'Striker', 'Striker', 'Left-wing'],
    '3-4-3': ['Goalkeeper', 'Right-center-back', 'Center-back', 'Left-center-back', 'Right-midfield', 'Center-midfield', 'Center-midfield', 'Left-midfield', 'Right-wing', 'Striker', 'Left-wing'],
  };

  const handleSelect = (positionIndex, player) => {
    if (startingLineup.includes(player)) return;
    const newLineup = [...startingLineup];
    newLineup[positionIndex] = player;
    setStartingLineup(newLineup);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormationSelect = (formation) => {
    setSelectedFormation(formation.name);
    localStorage.setItem('selectedFormation', JSON.stringify(formation.name));
    setOpen(false);
  };

  // Update positions when formation changes
  useEffect(() => {
    const savedFormation = localStorage.getItem('selectedFormation');
    if (savedFormation) {
      try {
        const parsed = JSON.parse(savedFormation);
        setSelectedFormation(parsed);
      } catch (e) {
        console.error('Error parsing formation from localStorage:', e);
      }
    }
  }, []);

  useEffect(() => {
    const formationPositions = formationLayouts[selectedFormation] || [];
    setPositions(formationPositions);
    setStartingLineup(Array(formationPositions.length).fill(''));
  }, [selectedFormation]);

  return (
    <div>
      <header>
        <TeamManagerNav />
      </header>

      <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 min-h-screen'>
        <TeamManagerSideBar className='col-start-1 col-end-2' />

        <div className="col-start-2 col-end-3 p-10 pb-28">
          <h1 className="text-3xl font-bold mb-8 text-center">Player Management</h1>

          <div className="space-y-4 max-w-3xl mx-auto">
            {positions.map((pos, index) => (
              <div key={index} className="flex items-center justify-between border p-4 rounded bg-white shadow">
                <span className="font-medium">{pos}</span>
                <select
                  className="border px-4 py-2 rounded"
                  value={startingLineup[index]}
                  onChange={(e) => handleSelect(index, e.target.value)}
                >
                  <option value="">Select player</option>
                  {players.map((player, idx) => (
                    <option key={idx} value={player} disabled={startingLineup.includes(player)}>
                      {player}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outlined" onClick={handleClickOpen}>
              View formations
            </Button>
          </div>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Select a Formation</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} justifyContent="center">
                {formations.map((formation) => (
                  <Grid item xs={6} sm={4} md={3} key={formation.id}>
                    <Button
                      onClick={() => handleFormationSelect(formation)}
                      fullWidth
                      variant={selectedFormation === formation.name ? 'contained' : 'outlined'}
                      color="primary"
                      style={{
                        textAlign: 'center',
                        padding: '10px',
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
                          width: '300px',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginBottom: '8px',
                        }}
                      />
                      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{formation.name}</div>
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
          </Dialog>

          {/* Formation Pitch with gap below */}
          <div className="mt-10">
            <FormationPitch formation={selectedFormation} lineup={startingLineup} />
          </div>
        </div>
      </main>

      <footer>
        <TeamManagerFooter />
      </footer>
    </div>
  );
};

export default PlayerStats;
