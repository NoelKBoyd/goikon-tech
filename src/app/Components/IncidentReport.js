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
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center text-gray-800 mb-5">Incident Report</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Match ID</label>
          <input
            type="number"
            value={matchid}
            onChange={(e) => setMatchID(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Player ID</label>
          <input
            type="number"
            value={playerid}
            onChange={(e) => setPlayerID(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select the incident type</option>
            <option value="Misconduct">Misconduct</option>
            <option value="Injuries">Injuries</option>
            <option value="Player Behaviour">Player Behaviour</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Suspension Amount</label>
          <input
            type="text"
            value={suspension}
            onChange={(e) => setSuspension(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
        >
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}
