'use client';

import { useState } from 'react';
import Link from "next/link";

export default function IncidentReport() {
  const [matchid, setMatchID] = useState('');
  const [playerid, setPlayerID] = useState('');
  const [type, setType] = useState('');
  const [suspension, setSuspension] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const parsedMatchID = parseInt(matchid, 10);
    const parsedPlayerID = parseInt(playerid, 10);

    if (isNaN(parsedMatchID) || isNaN(parsedPlayerID)) {
      setError('Match ID and Player ID must be valid integers.');
      return;
    }

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
        setSuccess(true);
      }
    } catch (error) {
      console.error('Error during report submission:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex items-center justify-center flex-grow bg-white-100">
        {success ? (
          <div className="bg-white border border-green-400 rounded-lg shadow-xl p-8 w-96 text-center">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Match Incident Reported Successfully!</h2>
            <button
              onClick={() => {
                setSuccess(false);
                setMatchID('');
                setPlayerID('');
                setType('');
                setSuspension('');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Another Match Incident Report
            </button>
          </div>
        ) : (
          <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-8 w-96">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Incident Report</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Enter Match ID</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={matchid}
                  onChange={(e) => setMatchID(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Enter Player ID</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={playerid}
                  onChange={(e) => setPlayerID(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Incident Type</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={suspension}
                  onChange={(e) => setSuspension(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                Submit Report
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
