'use client';

import { useState, useEffect } from 'react';

export default function MatchRelatedStats() {
  const [matchId, setMatchId] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [players, setPlayers] = useState([]);
  const [goals, setGoals] = useState('');
  const [assists, setAssists] = useState('');
  const [yellowCard, setYellowCard] = useState('');
  const [redCard, setRedCard] = useState('');
  const [fouls, setFouls] = useState('');
  const [shotsOnTarget, setShotsOnTarget] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!matchId) return;
      try {
        const response = await fetch(`/api/auth/playersbymatch?matchId=${matchId}`);
        const data = await response.json();
        if (response.ok) {
          setPlayers(data);
        } else {
          setError(data.message || 'Failed to fetch players');
        }
      } catch (err) {
        setError('An unexpected error occurred while fetching players');
        console.error(err);
      }
    };

    fetchPlayers();
  }, [matchId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMatchId('');
    setPlayerId('');
    setGoals('');
    setAssists('');
    setYellowCard('');
    setRedCard('');
    setFouls('');
    setShotsOnTarget('');
    setError('');
    setSuccess('');
    setLoading(true);

    const parsedMatchId = parseInt(matchId, 10);
    const parsedPlayerId = parseInt(playerId, 10);

    try {
      const response = await fetch('/api/auth/matchstats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchId: parsedMatchId,
          playerId: parsedPlayerId,
          goals: parseInt(goals, 10),
          assists: parseInt(assists, 10),
          yellowCard: parseInt(yellowCard, 10),
          redCard: parseInt(redCard, 10),
          fouls: parseInt(fouls, 10),
          shotsOnTarget: parseInt(shotsOnTarget, 10),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to submit match stats');
      } else {
        setSuccess('Match stats submitted successfully');
      }
    } catch (err) {
      console.error('Error during submission:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Match ID</label>
            <input
              type="number"
              value={matchId}
              onChange={(e) => setMatchId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Select Player</label>
            <select
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a player</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>{player.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Goals</label>
            <input
              type="number"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Assists</label>
            <input
              type="number"
              value={assists}
              onChange={(e) => setAssists(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Yellow Cards</label>
            <input
              type="number"
              value={yellowCard}
              onChange={(e) => setYellowCard(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Red Cards</label>
            <input
              type="number"
              value={redCard}
              onChange={(e) => setRedCard(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Fouls</label>
            <input
              type="number"
              value={fouls}
              onChange={(e) => setFouls(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Shots On Target</label>
            <input
              type="number"
              value={shotsOnTarget}
              onChange={(e) => setShotsOnTarget(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-2 text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Submit Stats
          </button>
        </div>
      </form>
    </div>
  );
}
