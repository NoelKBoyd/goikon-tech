'use client';

import { useEffect, useState } from 'react';

export default function RecentActivityFeed() {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchRecentActivity() {
      try {
        const response = await fetch('/api/auth/recentactivity');
        if (!response.ok) {
          throw new Error('Failed to fetch recent activity');
        }

        const data = await response.json();
        setActivity(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentActivity();
  }, []);

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-4xl mx-auto">
      <h1 className="text-lg font-bold text-center mb-4 text-gray-800">Recent Activity Feed</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div>
          {activity.length === 0 ? (
            <p className="text-center text-gray-500">No recent activity found.</p>
          ) : (
            activity.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-300 py-4"
              >
                {item.homeTeam ? (
                  <div>
                    <h2 className="font-semibold text-gray-800">{item.homeTeam.name} vs {item.awayTeam.name}</h2>
                    <p className="text-sm text-gray-600">Date: {new Date(item.date).toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Location: {item.field?.location}</p>
                    {item.result && (
                      <p className="text-sm text-gray-600">
                        Result: {item.result.homeTeamScore} - {item.result.awayTeamScore}
                      </p>
                    )}
                    {item.incidents?.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mt-2">Incidents:</h3>
                        {item.incidents.map((incident, idx) => (
                          <p key={idx} className="text-sm text-gray-500">
                            {incident.type} - {incident.suspension || 'No suspension'}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      Incident Report: {item.type} (Match ID: {item.match.id})
                    </h2>
                    <p className="text-sm text-gray-600">Player: {item.player.name}</p>
                    <p className="text-sm text-gray-600">Suspension: {item.suspension || 'No suspension'}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
