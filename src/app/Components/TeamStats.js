'use client';

export default function TeamStats() {
  const teamStats = {
    name: 'Example FC',
    wins: 10,
    losses: 5,
    goals: 30,
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg border border-gray-300 max-w-md mx-auto text-center">
      <h2 className="text-lg font-semibold text-gray-800">Team Stats</h2>
      <div className="mt-4">
        <p className="text-gray-700">
          <span className="font-semibold ">Team:</span> {teamStats.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Total Wins:</span> {teamStats.wins}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Total Losses:</span> {teamStats.losses}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Total Team Goals:</span> {teamStats.goals}
        </p>
      </div>
    </div>
  );
}
