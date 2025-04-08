'use client';

import { useState } from "react";

export default function ReportedIncidentsDashboard() {
  const [incidents, setIncidents] = useState([]);
  const [IncidentType, setIncidentType] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sort, setSort] = useState('newest');

  const fetchIncidents = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    

    try {
      const response = await fetch('/api/auth/incidentreport');
      const data = await response.json();

      if (response.ok) {
        setIncidents(data.incidents || []);
        setSuccess('Incident reports loaded successfully');
      } else {
        setError(data.message || 'Failed to load incidents');
      }
    } catch {
      setError('Error fetching incident reports');
    }

    setLoading(false);
  };

  const filteredIncidents = incidents
    .filter((incident) => {
      const playerName = incident.player.name.toLowerCase();
      const type = incident.type.toLowerCase();
      return (
        playerName.includes(search.toLowerCase()) &&
        type.includes(typeFilter.toLowerCase())
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.match.date);
      const dateB = new Date(b.match.date);
      return sort === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-center text-gray-800 mb-5">Reported Incidents</h1>

      <button
        onClick={fetchIncidents}
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
      >
        View Reported Incidents
      </button>

      {loading && <p className="mt-3 text-sm text-gray-500">Loading incidents...</p>}
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      {success && <p className="mt-3 text-sm text-green-500">{success}</p>}

      {incidents.length > 0 && (
        <div className="mt-5 space-y-3">
          <input
            type="text"
            placeholder="Search by player name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Filter by incident type..."
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Sort by Newest</option>
            <option value="oldest">Sort by Oldest</option>
          </select>
        </div>
      )}

      {filteredIncidents.length > 0 ? (
        <div className="space-y-3 max-h-60 overflow-y-auto mt-4">
          {filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              className="border p-3 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer transition"
              onClick={() => setIncidentType(incident)}
            >
              <h2 className="text-md font-semibold">
                {`${incident.player.name} (${incident.player.team.name})`}
              </h2>
              <p className="text-sm text-gray-600">
                Match: {incident.match.homeTeam.name} vs {incident.match.awayTeam.name}
              </p>
              <p className="text-sm text-gray-600">
                Incident Type: {incident.type}
              </p>
              <p className="text-sm text-gray-600">
                Date: {new Date(incident.match.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !loading && incidents.length > 0 && (
          <p className="mt-5 text-sm text-gray-500 text-center">No incidents match your filters.</p>
        )
      )}

      {IncidentType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-2">{IncidentType.player.name}</h2>
            <p className="text-sm text-gray-700">Team: {IncidentType.player.team.name}</p>
            <p className="text-sm text-gray-700 mb-1">
              Match: {IncidentType.match.homeTeam.name} vs {IncidentType.match.awayTeam.name}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              Incident Type: {IncidentType.type}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              Suspension: {IncidentType.suspension || 'None'}
            </p>
            <p className="text-sm text-gray-700 mb-3">
              Date: {new Date(IncidentType.match.date).toLocaleString()}
            </p>

            <button
              onClick={() => setIncidentType(null)}
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
