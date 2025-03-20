"use client";
import React from "react";
import { TbSoccerField } from "react-icons/tb";
import { MdEventAvailable } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { MdSportsSoccer } from "react-icons/md"; 
import { MdNotifications } from "react-icons/md"; 
import { IoMdLogOut } from "react-icons/io";

export default function FieldOwnerSideBar() {
  return (
    <div className="w-64 bg-white text-black border-r border-gray-300 flex flex-col h-full">

      <ul className="flex flex-col space-y-2 p-4 text-xl">
        <li className="hover:bg-gray-200 rounded-md"><a href="/fieldowner/SideBarLinks/FieldOverview" className="flex items-center px-4 py-3"><TbSoccerField size={24} className="mr-3" /> Field Overview</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="/fieldowner/SideBarLinks/Bookings" className="flex items-center px-4 py-3"><MdEventAvailable size={24} className="mr-3" /> Bookings</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="/fieldowner/SideBarLinks/FieldMaintenance" className="flex items-center px-4 py-3"><FaTools size={24} className="mr-3" /> Field Maintenance</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="/fieldowner/SideBarLinks/MatchSchedule" className="flex items-center px-4 py-3"><MdSportsSoccer size={24} className="mr-3" /> Match Schedule</a></li>
        <li className="hover:bg-gray-200 rounded-md"><a href="/fieldowner/SideBarLinks/NotificationsPage" className="flex items-center px-4 py-3"><MdNotifications size={24} className="mr-3" /> Notifications</a></li>
      </ul>

    </div>
  );
}

