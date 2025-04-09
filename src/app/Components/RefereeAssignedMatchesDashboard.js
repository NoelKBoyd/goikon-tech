'use client';
import { useState } from "react";

export default function AssignedMatchesDashboard() {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [venueFilter, setVenueFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const fetchAssignedMatches = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    const refereeId = 5;

    try {
      const response = await fetch(`/api/auth/assignedmatches?refereeId=${refereeId}`);
      const data = await response.json();

      if (response.ok) {
        setMatches(data);
        setSuccess('Matches found successfully');
      } else {
        setError('An error occurred');
      }
    } catch {
      console.error('Error fetching assigned matches:');
      setError('Failed to retrieve matches');
    }

    setLoading(false);
  };

  const filteredMatches = matches
    .filter((match) => {
      const home = match.homeTeam.name.toLowerCase();
      const away = match.awayTeam.name.toLowerCase();
      const venue = match.field.location.toLowerCase();
      return (
        (home.includes(search.toLowerCase()) || away.includes(search.toLowerCase())) &&
        venue.includes(venueFilter.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">

      <button
        onClick={fetchAssignedMatches}
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
      >
        View Assigned Matches
      </button>

      {loading && <p className="mt-3 text-sm text-gray-500">Loading matches...</p>}
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      {success && <p className="mt-3 text-sm text-green-500">{success}</p>}

      {matches.length > 0 && (
        <div className="mt-5 space-y-3">
          <input
            type="text"
            placeholder="Search by team name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Filter by venue..."
            value={venueFilter}
            onChange={(e) => setVenueFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Sort by Newest</option>
            <option value="oldest">Sort by Oldest</option>
          </select>
        </div>
      )}

      {filteredMatches.length > 0 ? (
        <div className="space-y-3 max-h-60 overflow-y-auto mt-4">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              className="border p-3 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer transition"
              onClick={() => setSelectedMatch(match)}
            >
              <h2 className="text-md font-semibold">
                {`${match.homeTeam.name} vs ${match.awayTeam.name}`}
              </h2>
              <p className="text-sm text-gray-600">Venue: {match.field.location}</p>
              <p className="text-sm text-gray-600">Date: {new Date(match.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && matches.length > 0 && (
          <p className="mt-5 text-sm text-gray-500 text-center">No matches found.</p>
        )
      )}

      {selectedMatch && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-2">
              {`${selectedMatch.homeTeam.name} vs ${selectedMatch.awayTeam.name}`}
            </h2>
            <p className="text-sm text-gray-700 mb-1">Venue: {selectedMatch.field.location}</p>
            <p className="text-sm text-gray-700 mb-3">
              Date: {new Date(selectedMatch.date).toLocaleString()}
            </p>

            {selectedMatch.result && (
              <div className="mb-4">
                <h3 className="font-semibold">Match Result</h3>
                <p>{selectedMatch.homeTeam.name}: {selectedMatch.result.homeTeamScore}</p>
                <p>{selectedMatch.awayTeam.name}: {selectedMatch.result.awayTeamScore}</p>
                <p>Status: {selectedMatch.result.status}</p>
              </div>
            )}

            <button
              onClick={() => setSelectedMatch(null)}
              className="mt-2 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
