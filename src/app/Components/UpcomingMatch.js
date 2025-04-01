'use client';

import { useEffect, useState } from 'react';

export default function NextMatch() {
  const [nextMatch, setNextMatch] = useState(null);

  useEffect(() => {
    fetch('/api/auth/matches')
      .then(res => res.json())
      .then(data => {
        if (data.matches && data.matches.length > 0) {
          const upcomingMatch = data.matches.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          )[0];
          setNextMatch(upcomingMatch);
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (!nextMatch) {
    return <div className="p-4 text-gray-500">No upcoming matches.</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg border border-gray-300 max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800">Next Match</h2>
      <div className="mt-4">
        <p className="text-gray-700">
          <span className="font-semibold">Date:</span> {new Date(nextMatch.date).toLocaleDateString()}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Home Team:</span> {nextMatch.homeTeam.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Away Team:</span> {nextMatch.awayTeam.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Field:</span> {nextMatch.field.location}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Referee:</span> {nextMatch.referee.name}
        </p>
      </div>
    </div>
  );
}
