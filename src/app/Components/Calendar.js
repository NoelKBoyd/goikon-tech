'use client';

import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay } from 'date-fns';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [matches, setMatches] = useState([]);
  const [hoveredMatch, setHoveredMatch] = useState(null);

  useEffect(() => {
    fetch('/api/auth/admin/matches/getMatches')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched Matches:', data); // ADD THIS
        setMatches(data.matches);
      })
      .catch(err => console.error('Error fetching matches:', err));
  }, []);
  

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button onClick={prevMonth} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Prev</button>
      <div className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</div>
      <button onClick={nextMonth} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Next</button>
    </div>
  );

  const renderDays = () => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day, i) => (
          <div key={i} className="text-center font-medium">{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'yyyy-MM-dd');
        const dayMatches = (matches || []).filter(match =>
            format(new Date(match.date), 'yyyy-MM-dd') === formattedDate
          );          
          
        days.push(
          <div
            key={day}
            className={`relative p-2 text-center border border-gray-300 cursor-pointer ${
              !isSameMonth(day, monthStart) ? 'text-gray-400' : ''
            } ${isSameDay(day, selectedDate) ? 'bg-black text-white rounded-full' : ''}`}
            onClick={() => setSelectedDate(day)}
            onMouseEnter={() => setHoveredMatch(dayMatches)}
            onMouseLeave={() => setHoveredMatch(null)}
          >
            {format(day, 'd')}
            {dayMatches.length > 0 && <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div key={day} className="grid grid-cols-7">{days}</div>);
      days = [];
    }

    return <div>{rows}</div>;
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="relative max-w-md mx-auto bg-white p-4 border-2 border-black rounded-lg shadow">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {hoveredMatch && hoveredMatch.length > 0 && (
        <div className="absolute bg-black text-white p-2 rounded shadow top-0 left-1/2 transform -translate-x-1/2 mt-2 z-10" style={{top: '40px'}}>
          {hoveredMatch.map(matches => (
            <div key={matches.id}>
              Match: {matches.homeTeam.name} vs {matches.awayTeam.name} <br />
              Field: {matches.field.location} | Referee: {matches.referee.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
