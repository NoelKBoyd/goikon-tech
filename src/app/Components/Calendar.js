'use client';

import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay } from 'date-fns';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Prev</button>
        <div className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</div>
        <button onClick={nextMonth} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Next</button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const date = new Date();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium">
          {weekDays[i]}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-2">{days}</div>;
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
        const formattedDate = format(day, 'd');
        const cloneDay = day;
        days.push(
          <div
            key={day}
            className={`p-2 text-center border border-gray-300 cursor-pointer ${
              !isSameMonth(day, monthStart) ? 'text-gray-400' : ''
            } ${
              isSameDay(day, selectedDate) ? 'bg-black text-white rounded-full' : ''
            }`}
            onClick={() => setSelectedDate(cloneDay)}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div key={day} className="grid grid-cols-7">{days}</div>);
      days = [];
    }

    return <div>{rows}</div>;
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 border-2 border-black rounded-lg shadow">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
