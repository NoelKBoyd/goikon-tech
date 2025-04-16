'use client';

import { useState } from 'react';
import AddTrainingSessionForm from './AddTrainingSessionForm';

export default function TrainingScheduleComponent() {
  const [trainingSessions, setTrainingSessions] = useState([
    {
      id: 1,
      date: '2025-04-16',
      time: '17:00 - 18:30',
      location: 'Main Field',
      focus: 'Passing & Ball Control',
    },
    {
      id: 2,
      date: '2025-04-18',
      time: '16:30 - 18:00',
      location: 'Indoor Arena',
      focus: 'Tactical Drills',
    },
  ]);

  const handleAddSession = (session) => {
    setTrainingSessions((prev) => [...prev, session]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      <AddTrainingSessionForm onAdd={handleAddSession} />

      <div className="p-6 bg-white shadow-md border-2 border-black rounded-lg shadow w-full h-fit">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Training Schedule</h2>
        <div className="space-y-4">
          {trainingSessions.map((session) => (
            <div
              key={session.id}
              className="p-4 border-2 border-black rounded-lg shadow bg-gray-50 hover:bg-gray-100 transition duration-150"
            >
              <p className="text-gray-700">
                <span className="font-semibold">📅 Date:</span> {new Date(session.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">⏰ Time:</span> {session.time}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">📍 Location:</span> {session.location}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">🎯 Focus:</span> {session.focus}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
