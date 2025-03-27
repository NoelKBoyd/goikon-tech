'use client';

import { useState } from 'react';
import RefereeFooter from './RefereeFooter';

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
const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        const parsedMatchID = parseInt(matchid, 10);
        const parsedHomeTeamScore = parseInt(homeTeamScore, 10);
        const parsedAwayTeamScore = parseInt(awayTeamScore, 10);
        const parsedTimeStamp = timeStamp;

        if (isNaN(parsedMatchID)) {
            setError('Match ID must be a valid integer.');
            return;
        }

        if (isNaN(parsedHomeTeamScore) || isNaN(parsedAwayTeamScore)) {
            setError('Home Team Score and Away Team Score must be valid integers.');
            return;
        }

        if (!parsedTimeStamp || isNaN(Date.parse(parsedTimeStamp))) {
            setError('Match End TimeStamp must be a valid date and time.');
            return;
        }

        try {
            const response = await fetch('/api/auth/matchresult', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    matchid: parsedMatchID,
                    homeTeamScore: parsedHomeTeamScore,
                    awayTeamScore: parsedAwayTeamScore,
                    status,
                    timeStamp: parsedTimeStamp, 
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
                setSuccess(true);
            }
        } catch (error) {
            console.error('Error during match result submission:', error);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex items-center justify-center flex-grow bg-gray-100">
                {success ? (
                    <div className="bg-white border border-green-400 rounded-lg shadow-xl p-8 w-96 text-center">
                        <h2 className="text-2xl font-semibold text-green-600 mb-4">Match Result Submitted Successfully!</h2>
                        <button
                            onClick={() => {
                                setSuccess(false);
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
                            }}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Submit Another Match Result
                        </button>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-8 w-96">
                        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Submit Match Result</h2>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Enter Match ID</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={matchid}
                                    onChange={(e) => setMatchID(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Home Team Score</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={homeTeamScore}
                                    onChange={(e) => setHomeTeamScore(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Away Team Score</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={awayTeamScore}
                                    onChange={(e) => setAwayTeamScore(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Match Status</label>
                                <select
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={timeStamp}
                                    onChange={(e) => setTimeStamp(e.target.value)}
                                    placeholder="YYYY-MM-DDTHH:MM"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Number Of Assists</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={assists}
                                    onChange={(e) => setAssists(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Number Of Yellow Cards</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    value={yellowCard}
                                    onChange={(e) => setYellowCard(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Number Of Red Cards</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    value={redCard}
                                    onChange={(e) => setRedCard(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Total Penalties Awarded</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={penalties}
                                    onChange={(e) => setPenalties(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Shots On Target</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={shotsOnTarget}
                                    onChange={(e) => setShotsOnTarget(e.target.value)}
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            >
                                Submit Report
                            </button>
                        </form>
                    </div>
                )}
            </main>
            <div className="mt-auto w-full mb-15">
                <RefereeFooter />
            </div>
        </div>
    );
}
