'use client';

import { useState } from "react";

export default function IncidentReport() {
  const [matchid, setMatchID] = useState('');
  const [playerid, setPlayerID] = useState('');
  const [type, setType] = useState('');
  const [suspension, setSuspension] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMatchID('');
    setPlayerID('');
    setType('');
    setSuspension('');
    setError('');
    setSuccess('');
    setLoading(true);

    const parsedMatchID = parseInt(matchid, 10);
    const parsedPlayerID = parseInt(playerid, 10);

    try {
      const response = await fetch('/api/auth/incidentreport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchid: parsedMatchID,
          playerid: parsedPlayerID,
          type,
          suspension: suspension || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to submit report');
      } else {
        setSuccess('Incident report submitted successfully');
      }
    } catch (err) {
      console.error('Error during report submission:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-md mx-auto">
      <h1 className="text-lg font-bold text-center mb-4 text-gray-800">Incident Report</h1>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Enter Match ID</label>
            <input
              type="number"
              value={matchid}
              onChange={(e) => setMatchID(e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Enter Player ID</label>
            <input
              type="number"
              value={playerid}
              onChange={(e) => setPlayerID(e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Incident Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border p-2 rounded mb-2"
            >
              <option value="">Select the incident type</option>
              <option value="Misconduct">Misconduct</option>
              <option value="Injuries">Injuries</option>
              <option value="Player Behaviour">Player Behaviour</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Suspension Amount</label>
            <input
              type="text"
              value={suspension}
              onChange={(e) => setSuspension(e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />
          </div>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          {success && <p className="mt-2 text-sm text-green-500">{success}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}
