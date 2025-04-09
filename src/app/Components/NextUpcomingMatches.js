'use client';

import { useEffect, useState } from 'react';

export default function NextUpcomingMatches() {
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  useEffect(() => {
    fetch('/api/auth/admin/matches/getMatches')
      .then(res => res.json())
      .then(data => {
        if (data.matches && data.matches.length > 0) {
          const now = new Date();
          const futureMatches = data.matches
            .filter(match => new Date(match.date) > now)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 4); 

          setUpcomingMatches(futureMatches);
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (upcomingMatches.length === 0) {
    return <div className="p-4 text-gray-500">No upcoming matches.</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg border border-gray-300 max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Matches</h2>
      <div className="space-y-4">
        {upcomingMatches.map((match) => (
          <div key={match.id} className="border-t pt-2 first:border-t-0 first:pt-0">
            <p className="text-gray-700">
              <span className="font-semibold">Date:</span> {new Date(match.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Home Team:</span> {match.homeTeam.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Away Team:</span> {match.awayTeam.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Field:</span> {match.field.location}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Referee:</span> {match.referee.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
