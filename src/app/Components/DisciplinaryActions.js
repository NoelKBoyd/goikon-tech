'use client';

import { useState } from 'react';

export default function DisciplinaryActions() {
  const [matchid, setMatchID] = useState('');
  const [playerid, setPlayerID] = useState('');
  const [type, setType] = useState('');
  const [action, setAction] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const parsedMatchID = parseInt(matchid, 10);
    const parsedPlayerID = parseInt(playerid, 10);

    if (isNaN(parsedMatchID)) {
      setError('Match ID must be a valid integer.');
      return;
    }

    if (isNaN(parsedPlayerID)) {
      setError('Player ID must be a valid integer.');
      return;
    }

    try {
      const response = await fetch('/api/auth/disciplinaryaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerid: parsedPlayerID,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to submit disciplinary actions');
      } else {
        setSuccess(true);
      }
    } catch (error) {
      console.error('Error during disciplinary actions submission:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-center text-gray-800 mb-4">Disciplinary Actions</h1>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Enter Match ID</label>
            <input
              type="number"
              value={matchid}
              onChange={(e) => setMatchID(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Enter Player ID</label>
            <input
              type="number"
              value={playerid}
              onChange={(e) => setPlayerID(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Disciplinary Action Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select the disciplinary action type</option>
              <option value="Suspension">Suspension</option>
              <option value="Fines">Fines</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Action</label>
            <input
              type="text"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-2 text-sm text-green-600">Disciplinary action submitted successfully!</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Submit Disciplinary Action
          </button>
        </div>
      </form>
    </div>
  );
}
