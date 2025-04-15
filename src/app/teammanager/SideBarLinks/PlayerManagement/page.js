'use client';
import { useEffect, useState } from 'react';
import TeamManagerNav from '@/app/Components/TeamManagerNav';
import TeamManagerSideBar from '@/app/Components/TeamManagerSideBar';
import TeamManagerFooter from '@/app/Components/TeamManagerFooter';
import FormationPitch from '@/app/Components/FormationPitch'; // Assuming same component for static visual

const rolesList = [
  { id: 'captain', label: 'Captain' },
  { id: 'leftShortFreeKick', label: 'Left Short Free Kick' },
  { id: 'rightShortFreeKick', label: 'Right Short Free Kick' },
  { id: 'longFreeKick', label: 'Long Free Kick' },
  { id: 'penalties', label: 'Penalties' },
  { id: 'leftCorner', label: 'Left Corner' },
  { id: 'rightCorner', label: 'Right Corner' },
];

const MatchSettings = () => {
  const [selectedFormation, setSelectedFormation] = useState('4-4-2');
  const [selectedRole, setSelectedRole] = useState('captain');
  const [assignedRoles, setAssignedRoles] = useState({});
  const [lineupWithPositions, setLineupWithPositions] = useState([]); // NEW: holds lineup with positions

  // Load formation from localStorage
  useEffect(() => {
    const storedFormation = localStorage.getItem('selectedFormation');
    if (storedFormation) {
      try {
        setSelectedFormation(JSON.parse(storedFormation));
      } catch (e) {
        console.error('Failed to parse stored formation:', e);
      }
    }
  }, []);

  // Load saved lineup from localStorage
  useEffect(() => {
    const savedLineup = localStorage.getItem('lineupWithPositions');
    if (savedLineup) {
      try {
        setLineupWithPositions(JSON.parse(savedLineup));
      } catch (e) {
        console.error('Failed to parse lineupWithPositions from localStorage:', e);
      }
    }
  }, []);

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handlePlayerAssign = (e) => {
    const player = e.target.value;
    setAssignedRoles((prev) => ({
      ...prev,
      [selectedRole]: player
    }));
  };

  const playerNames = lineupWithPositions.map(p => p.player).filter(p => p); // Filter out empty slots

  return (
    <div>
      <header>
        <TeamManagerNav />
      </header>

      <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 min-h-screen'>
        <TeamManagerSideBar className='col-start-1 col-end-2' />

        <div className='col-start-2 col-end-3 p-10'>
          <h1 className="text-3xl font-bold text-center mb-10">Player Management</h1>

          {/* SIDE BY SIDE Layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Formation Pitch */}
            <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-4">
              <FormationPitch
                formation={selectedFormation}
                lineup={lineupWithPositions.map(p => p.player)}
                highlightPlayer={assignedRoles[selectedRole]}
              />
            </div>

            {/* Role Assignment Panel */}
            <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Assign Roles</h2>

              <div className="grid grid-cols-2 gap-4">
                {rolesList.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className={`border rounded p-3 cursor-pointer text-center ${
                      selectedRole === role.id ? 'bg-purple-200 border-purple-400' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-bold">{role.label}</div>
                    <div className="text-sm mt-1 text-gray-600">{assignedRoles[role.id] || 'Unassigned'}</div>
                  </div>
                ))}
              </div>

              {/* Player Selection */}
              <div className="mt-6">
                <label className="block mb-2 font-medium">Assign Player to {rolesList.find(r => r.id === selectedRole)?.label}:</label>
                <select
                  className="w-full border p-2 rounded"
                  value={assignedRoles[selectedRole] || ''}
                  onChange={handlePlayerAssign}
                >
                  <option value="">Select Player</option>
                  {playerNames.map((player) => (
                    <option key={player} value={player}>
                      {player}
                    </option>
                  ))}
                </select>
              </div>
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

export default MatchSettings;
