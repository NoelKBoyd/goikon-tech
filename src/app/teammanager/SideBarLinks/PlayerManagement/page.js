'use client'; // Ensure this is at the very top of the file
import React, { useState, useEffect } from 'react';
import TeamManagerNav from '@/app/Components/TeamManagerNav';
import TeamManagerSideBar from '@/app/Components/TeamManagerSideBar';
import TeamManagerFooter from '@/app/Components/TeamManagerFooter';
import FormationPitch from '@/app/Components/FormationPitch'; // Assuming this is in the same directory

// Sample players list
const players = [
  'John Smith', 'Mike Johnson', 'Alex Brown', 'David Wilson',
  'Chris Evans', 'Ryan Walker', 'Tom Harris', 'Ben Lewis',
  'Jake Young', 'Liam White', 'Sam Green', 'Oliver King',
];

const PlayerStats = () => {
  const [positions, setPositions] = useState([]);
  const [startingLineup, setStartingLineup] = useState(Array(11).fill(''));
  const [selectedFormation, setSelectedFormation] = useState('4-4-2'); // Default formation

  // Sample formations, you can update this later
  const formationLayouts = {
    '4-4-2': ['Goalkeeper', 'Right-back', 'Center-back', 'Center-back', 'Left-back', 'Right-midfield', 'Center-midfield', 'Center-midfield', 'Left-midfield', 'Striker', 'Striker'],
    '4-3-3': ['Goalkeeper', 'Right-back', 'Center-back', 'Center-back', 'Left-back', 'Center-midfield', 'Center-midfield', 'Center-midfield', 'Right-wing', 'Striker', 'Left-wing'],
    '3-4-3': ['Goalkeeper', 'Right-center-back', 'Center-back', 'Left-center-back', 'Right-midfield', 'Center-midfield', 'Center-midfield', 'Left-midfield', 'Right-wing', 'Striker', 'Left-wing'],
  };

  // Handle position selection
  const handleSelect = (positionIndex, player) => {
    // Prevent selecting the same player twice
    if (startingLineup.includes(player)) return;

    const newLineup = [...startingLineup];
    newLineup[positionIndex] = player;
    setStartingLineup(newLineup);
  };

  // Load positions based on the selected formation
  useEffect(() => {
    // Safely parse formation from localStorage, if it exists
    const savedFormation = localStorage.getItem('selectedFormation');
    if (savedFormation) {
      try {
        const parsedFormation = JSON.parse(savedFormation);  // Safely parse the stored value
        setSelectedFormation(parsedFormation);
      } catch (error) {
        console.error('Error parsing selected formation:', error);
      }
    }

    const formationPositions = formationLayouts[selectedFormation];
    setPositions(formationPositions);
    setStartingLineup(Array(formationPositions.length).fill('')); // Reset starting lineup
  }, [selectedFormation]);

  return (
    <div>
      <header>
        <TeamManagerNav />
      </header>

      <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 min-h-screen'>
        <TeamManagerSideBar className='col-start-1 col-end-2' />

        <div className="col-start-2 col-end-3 p-10">
          <h1 className="text-3xl font-bold mb-8 text-center">Player Management</h1>

          <div className="space-y-4 max-w-3xl mx-auto">
            {/* Dropdowns for position selections */}
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

          {/* Button to change formation */}
          <div className="mt-8 text-center">
            <select
              className="border px-4 py-2 rounded"
              value={selectedFormation}
              onChange={(e) => setSelectedFormation(e.target.value)}
            >
              <option value="4-4-2">4-4-2</option>
              <option value="4-3-3">4-3-3</option>
              <option value="3-4-3">3-4-3</option>
            </select>
          </div>

          {/* Show the formation pitch */}
          <FormationPitch formation={selectedFormation} lineup={startingLineup} />
        </div>
      </main>

      <footer>
        <TeamManagerFooter />
      </footer>
    </div>
  );
};

export default PlayerStats;
