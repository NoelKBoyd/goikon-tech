'use client';
import TopNav from './Components/TopNav';
import { useState } from 'react';
import { MdAdminPanelSettings } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { GiWhistle } from "react-icons/gi";
import { GiSoccerField } from "react-icons/gi";

export default function Homepage() {
    const features = [
        { icon: <MdAdminPanelSettings size={100} />, title: "Admin", description: "Manage users, teams, matches, and system settings efficiently." },
        { icon: <GrUserManager size={100} />, title: "Team Manager", description: "Oversee team rosters, match strategies, and player communication." },
        { icon: <GiWhistle size={100} />, title: "Referee", description: "Submit match results, log incidents, and manage disciplinary actions." },
        { icon: <GiSoccerField size={100} />, title: "Field Owner", description: "Manage bookings, monitor field availability, and track maintenance." }
    ];

    return (
        <main>
            <TopNav />
            <div className="flex items-center justify-center">
                <div className="text-center max-w-3xl pt-10">
                    <h1 className="text-3xl font-bold mb-4">
                        Streamline Football Operations with Our All-in-One Platform
                    </h1>
                    <p className="text-lg">
                        Our Football Management Website simplifies team management, match coordination, and field bookings with dedicated dashboards for Admins, Team Managers, Referees, and Field Owners.
                    </p>
                    <div className="mt-6 flex justify-center space-x-6">
                        {features.map((feature, index) => (
                            <div key={index} className="group relative cursor-pointer">
                                <div className="border p-2 rounded-lg transition-all duration-300 hover:scale-105">
                                    {feature.icon}
                                    <p className="mt-2 font-bold">{feature.title}</p>
                                </div>
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full
                                                w-48 bg-white text-black text-sm p-2 rounded-lg shadow-lg
                                                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {feature.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
