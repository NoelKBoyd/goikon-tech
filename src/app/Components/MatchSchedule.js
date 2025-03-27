'use client';

import { useEffect, useState } from 'react';

export default function MatchSchedule() {
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/auth/matches')
      .then(res => res.json())
      .then(data => setMatches(data.matches))
      .catch(err => console.error(err));
  }, []);

  const filteredMatches = matches.filter(matches =>
    matches.homeTeam.name.toLowerCase().includes(search.toLowerCase()) ||
    matches.awayTeam.name.toLowerCase().includes(search.toLowerCase()) ||
    matches.field.location.toLowerCase().includes(search.toLowerCase()) ||
    matches.referee.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search matches..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Home Team</th>
              <th className="p-3 text-left">Away Team</th>
              <th className="p-3 text-left">Field</th>
              <th className="p-3 text-left">Referee</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatches.map((matches) => (
              <tr key={matches.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{new Date(matches.date).toLocaleDateString()}</td>
                <td className="p-3">{matches.homeTeam.name}</td>
                <td className="p-3">{matches.awayTeam.name}</td>
                <td className="p-3">{matches.field.location}</td>
                <td className="p-3">{matches.referee.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
