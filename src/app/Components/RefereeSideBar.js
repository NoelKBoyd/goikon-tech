"use client";
import React from "react";
import { FaCalendarCheck, FaClipboardCheck, FaExclamationTriangle, FaBan, FaChartBar } from 'react-icons/fa';

export default function RefereeSideBar() {
  return (
    <div className="w-64 bg-white text-black border-r border-gray-300 flex flex-col h-full">

      <ul className="flex flex-col space-y-2 p-4 text-xl">
        <li className="hover:bg-gray-200 rounded-md"><a href="/referee/SideBarLinks/UpcomingMatches" className="flex items-center px-4 py-3"><FaCalendarCheck size={24} className="mr-3" /> Upcoming Matches</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="/referee/SideBarLinks/SubmitResults" className="flex items-center px-4 py-3"><FaClipboardCheck size={24} className="mr-3" /> Submit Results</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="/referee/SideBarLinks/IncidentReports" className="flex items-center px-4 py-3"><FaExclamationTriangle size={24} className="mr-3" /> Incident Reports</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="/referee/SideBarLinks/DisciplinaryActions" className="flex items-center px-4 py-3"><FaBan size={24} className="mr-3" /> Disciplinary Actions</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="/referee/SideBarLinks/MatchStatistics" className="flex items-center px-4 py-3"><FaChartBar size={24} className="mr-3" /> Match Statistics</a></li>
      </ul>

    </div>
  );
}

