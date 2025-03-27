'use client';
import { useState } from "react";

export default function AssignedMatches() {
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchAssignedMatches = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        const refereeId = 5; // Replace with dynamic value if needed

        try {
            const response = await fetch(`/api/auth/assignedmatches?refereeId=${refereeId}`);
            const data = await response.json();

            if (response.ok) {
                setMatches(data);
                setSuccess('Matches found successfully');
            } else {
                setError(data.message || 'An error occurred');
            }
        } catch (err) {
            console.error('Error fetching assigned matches:', err);
            setError('Failed to retrieve matches');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 min-h-screen p-6">
            <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg p-8 w-full sm:w-96">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Assigned Matches</h1>

                <button
                    onClick={fetchAssignedMatches}
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
                >
                    Fetch Assigned Matches
                </button>

                {loading && <p className="mt-2 text-sm text-gray-500">Loading matches...</p>}
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                {success && <p className="mt-2 text-sm text-green-500">{success}</p>}

                {matches.length > 0 ? (
                    <div className="space-y-4 mt-4">
                        {matches.map((match) => (
                            <div 
                                key={match.id} 
                                className="border p-4 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 transition duration-200"
                                onClick={() => setSelectedMatch(match)}
                            >
                                <h2 className="text-lg font-semibold text-gray-900">{`${match.homeTeam.name} vs ${match.awayTeam.name}`}</h2>
                                <p className="text-sm text-gray-700">Venue: {match.field.location}</p>
                                <p className="text-sm text-gray-700">Date: {new Date(match.date).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && <p className="mt-4 text-sm text-gray-500">No matches assigned.</p>
                )}

                {/* Match Details Modal */}
                {selectedMatch && (
                    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold text-gray-900">{`${selectedMatch.homeTeam.name} vs ${selectedMatch.awayTeam.name}`}</h2>
                            <p className="text-sm text-gray-700">Venue: {selectedMatch.field.location}</p>
                            <p className="text-sm text-gray-700">Date: {new Date(selectedMatch.date).toLocaleString()}</p>

                            {selectedMatch.result && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Match Result</h3>
                                    <p>{selectedMatch.homeTeam.name}: {selectedMatch.result.homeTeamScore}</p>
                                    <p>{selectedMatch.awayTeam.name}: {selectedMatch.result.awayTeamScore}</p>
                                    <p>Status: {selectedMatch.result.status}</p>
                                </div>
                            )}

                            <button 
                                onClick={() => setSelectedMatch(null)}
                                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
