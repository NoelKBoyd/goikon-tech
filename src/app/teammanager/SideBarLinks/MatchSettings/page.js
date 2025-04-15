
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

const formations = [
  { id: 1, name: '4-4-2', image: '/images/Formation-4-4-2.webp' },
  { id: 2, name: '4-3-3', image: '/images/Formation-4-3-3.webp' },
  { id: 3, name: '4-2-4', image: '/images/Formation-4-2-4.webp' },
  { id: 4, name: '3-4-3', image: '/images/Formation-3-4-3.webp' },
];

const PlayerStats = () => {
  const [positions, setPositions] = useState([]);
  const [startingLineup, setStartingLineup] = useState(Array(11).fill(''));
  const [open, setOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState('4-4-2'); // Default
  const [players, setPlayers] = useState([]);

  // Fetch player names from the new API route
  useEffect(() => {
    fetch('/api/auth/players')  // Fetch from the new players API route
      .then(res => res.json())
      .then(data => {
        if (data.players) {
          setPlayers(data.players);
        }
      })
      .catch(err => console.error('Error fetching player names:', err));
  }, []);

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
  
    // Save just the player names
    localStorage.setItem('startingLineup', JSON.stringify(newLineup));
  
    // Save player-position pairs too
    const positionPairs = newLineup.map((p, i) => ({
      position: positions[i],
      player: p
    }));
    localStorage.setItem('lineupWithPositions', JSON.stringify(positionPairs));
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
          <h1 className="text-3xl font-bold mb-8 text-center">Match Settings</h1>

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

          {/* Split layout: pitch on left, selector on right */}
          <div className="mt-10 flex gap-6">
            {/* Left: Pitch */}
            <div className="flex-shrink-0 w-[55%] overflow-hidden rounded-lg shadow bg-white p-4">
              <FormationPitch formation={selectedFormation} lineup={startingLineup} />
            </div>

            {/* Right: Player Selector */}
            <div className="flex-grow space-y-4 max-w-md">
              {positions.map((pos, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border p-2 rounded bg-white shadow-sm text-sm"
                >
                  <span className="font-medium">{pos}</span>
                  <select
                    className="border px-2 py-1 rounded w-[60%]"
                    value={startingLineup[index]}
                    onChange={(e) => handleSelect(index, e.target.value)}
                  >
                    <option value="">Select player</option>
                    {players.map((player) => (
                      <option
                        key={player.id}
                        value={player.name}
                        disabled={startingLineup.includes(player.name)}
                      >
                        {player.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
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
