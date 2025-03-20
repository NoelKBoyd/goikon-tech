"use client";
import React from "react";
import { FaTachometerAlt, FaUserCog, FaUsers, FaFutbol, FaChartLine, FaCog } from 'react-icons/fa';

export default function AdminSideBar() {
  return (
    <div className="w-64 bg-white text-black border-r border-gray-300 flex flex-col h-full">

      <ul className="flex flex-col space-y-2 p-4 text-xl">
        <li className="hover:bg-gray-200 rounded-md"><a href="/admin/Dashboard" className="flex items-center px-4 py-3"><FaTachometerAlt size={24} className="mr-3" /> Dashboard</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="/admin/UserManagment" className="flex items-center px-4 py-3"><FaUserCog size={24} className="mr-3" /> Users</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="/admin/TeamsPage" className="flex items-center px-4 py-3"><FaUsers size={24} className="mr-3" /> Teams</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="/admin/Matches" className="flex items-center px-4 py-3"><FaFutbol size={24} className="mr-3" /> Matches</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="/admin/Reports" className="flex items-center px-4 py-3"><FaChartLine size={24} className="mr-3" /> Reports</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="/admin/SettingsPage" className="flex items-center px-4 py-3"><FaCog size={24} className="mr-3" /> Settings</a></li>
      </ul>

    </div>
  );
}
