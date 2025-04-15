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

// Sample players
const players = [
  'Reus', 'Sancho', 'Guerreiro', 'Haaland', 'Bellingham',
  'Brandt', 'Hummels', 'Can', 'Schlotterbeck', 'Adeyemi', 'Kobel'
];

const MatchSettings = () => {
  const [selectedFormation, setSelectedFormation] = useState('4-4-2');
  const [selectedRole, setSelectedRole] = useState('captain');
  const [assignedRoles, setAssignedRoles] = useState({});

  // Load formation from local storage
  useEffect(() => {
    const stored = localStorage.getItem('selectedFormation');
    if (stored) {
      try {
        setSelectedFormation(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored formation:', e);
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

  return (
    <div>
      <header>
        <TeamManagerNav />
      </header>

      <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 min-h-screen'>
        <TeamManagerSideBar className='col-start-1 col-end-2' />

        <div className='col-start-2 col-end-3 p-10 flex flex-col items-center space-y-10'>
          <h1 className="text-3xl font-bold text-center">Player Management</h1>

          {/* Static Formation Pitch */}
          <div className="w-full max-w-4xl">
            <FormationPitch formation={selectedFormation} lineup={[]} highlightPlayer={assignedRoles[selectedRole]} />
          </div>

          {/* Role Assignment Panel */}
          <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Assign Roles</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {rolesList.map((role) => (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`border rounded p-3 cursor-pointer text-center ${selectedRole === role.id ? 'bg-purple-200 border-purple-400' : 'hover:bg-gray-100'}`}
                >
                  <div className="font-bold">{role.label}</div>
                  <div className="text-sm mt-1 text-gray-600">{assignedRoles[role.id] || 'Unassigned'}</div>
                </div>
              ))}
            </div>

            {/* Player Selection */}
            <div className="mt-6 flex justify-center">
              <select
                className="border p-2 rounded"
                value={assignedRoles[selectedRole] || ''}
                onChange={handlePlayerAssign}
              >
                <option value="">Select Player</option>
                {players.map((player) => (
                  <option key={player} value={player}>
                    {player}
                  </option>
                ))}
              </select>
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
