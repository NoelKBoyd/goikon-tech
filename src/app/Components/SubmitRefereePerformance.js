'use client';

import { useState } from "react";

export default function SubmitRefereePerformance() {
  const [matchId, setMatchId] = useState('');
  const [refereeId, setRefereeId] = useState('');
  const [refereeRating, setRefereeRating] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const parsedMatchId = parseInt(matchId, 10);
    const parsedRefereeId = parseInt(refereeId, 10);
    const parsedRefereeRating = parseInt(refereeRating, 10);

    try {
      const response = await fetch('/api/auth/refereeperformance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchId: parsedMatchId,
          refereeId: parsedRefereeId,
          refereeRating: parsedRefereeRating,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to submit referee performance');
      } else {
        setSuccess('Referee performance submitted successfully');
        setMatchId('');
        setRefereeId('');
        setRefereeRating('');
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
            <label className="text-sm font-medium text-gray-700">Referee ID</label>
            <input
              type="number"
              value={refereeId}
              onChange={(e) => setRefereeId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Referee Rating</label>
            <input
              type="number"
              value={refereeRating}
              onChange={(e) => setRefereeRating(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Rate from 1 to 10"
            />
          </div>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-2 text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Referee Performance'}
          </button>
        </div>
      </form>
    </div>
  );
}
