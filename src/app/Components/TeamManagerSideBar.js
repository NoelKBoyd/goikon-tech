"use client";
import React from "react";
import { FaUsers, FaCogs, FaUserPlus, FaCalendarAlt, FaCommentDots } from 'react-icons/fa';

export default function TeamManagerSideBar() {
  return (
    <div className="w-64 bg-white text-black border-r border-gray-300 flex flex-col h-full">

      <ul className="flex flex-col space-y-2 p-4 text-xl">
        <li className="hover:bg-gray-200 rounded-md"><a href="" className="flex items-center px-4 py-3"><FaUsers size={24} className="mr-3" /> Team Overview</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="" className="flex items-center px-4 py-3"><FaCogs size={24} className="mr-3" /> Match Settings</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="" className="flex items-center px-4 py-3"><FaUserPlus size={24} className="mr-3" /> Player Management</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="" className="flex items-center px-4 py-3"><FaCalendarAlt size={24} className="mr-3" /> Calendar</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="" className="flex items-center px-4 py-3"><FaCommentDots size={24} className="mr-3" /> Communications</a></li>
      </ul>

    </div>
  );
}
