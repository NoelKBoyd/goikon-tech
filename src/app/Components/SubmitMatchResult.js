'use client';

import { useState } from "react";

export default function SubmitMatchResult() {
  const [matchid, setMatchID] = useState('');
  const [homeTeamScore, setHomeTeamScore] = useState('');
  const [awayTeamScore, setAwayTeamScore] = useState('');
  const [status, setStatus] = useState('');
  const [timeStamp, setTimeStamp] = useState('');
  const [assists, setAssists] = useState('');
  const [yellowCard, setYellowCard] = useState('');
  const [redCard, setRedCard] = useState('');
  const [penalties, setPenalties] = useState('');
  const [shotsOnTarget, setShotsOnTarget] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMatchID('');
    setHomeTeamScore('');
    setAwayTeamScore('');
    setStatus('');
    setTimeStamp('');
    setAssists('');
    setYellowCard('');
    setRedCard('');
    setPenalties('');
    setShotsOnTarget('');
    setError('');
    setSuccess('');
    setLoading(true);

    const parsedMatchID = parseInt(matchid, 10);
    const parsedHomeTeamScore = parseInt(homeTeamScore, 10);
    const parsedAwayTeamScore = parseInt(awayTeamScore, 10);

    try {
      const response = await fetch('/api/auth/matchresult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchid: parsedMatchID,
          homeTeamScore: parsedHomeTeamScore,
          awayTeamScore: parsedAwayTeamScore,
          status,
          timeStamp,
          assists,
          yellowCard,
          redCard,
          penalties,
          shotsOnTarget,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to submit match result');
      } else {
        setSuccess('Match result submitted successfully');
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
            <label className="text-sm font-medium text-gray-700">Enter Match ID</label>
            <input
              type="number"
              value={matchid}
              onChange={(e) => setMatchID(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Home Team Score</label>
            <input
              type="number"
              value={homeTeamScore}
              onChange={(e) => setHomeTeamScore(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Away Team Score</label>
            <input
              type="number"
              value={awayTeamScore}
              onChange={(e) => setAwayTeamScore(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Match Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select the match status type</option>
              <option value="Complete">Complete</option>
              <option value="Abandoned">Abandoned</option>
              <option value="Postponed">Postponed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Match End TimeStamp</label>
            <input
              type="text"
              value={timeStamp}
              onChange={(e) => setTimeStamp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="YYYY-MM-DDTHH:MM"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Number Of Assists</label>
            <input
              type="number"
              value={assists}
              onChange={(e) => setAssists(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Number Of Yellow Cards</label>
            <input
              type="number"
              value={yellowCard}
              onChange={(e) => setYellowCard(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Number Of Red Cards</label>
            <input
              type="number"
              value={redCard}
              onChange={(e) => setRedCard(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Total Penalties Awarded</label>
            <input
              type="number"
              value={penalties}
              onChange={(e) => setPenalties(e.target.value)}
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
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}
