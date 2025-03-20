'use client';
import HomeNav from './Components/HomeNav';
import { useState } from 'react';
import { MdAdminPanelSettings } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { GiWhistle, GiSoccerField } from "react-icons/gi";
import Link from 'next/link';
import Calendar from './Components/Calendar';

export default function Homepage() {
    const features = [
        { icon: <MdAdminPanelSettings size={60} />, title: "Admin", description: "Manage users, teams, matches, and system settings efficiently." },
        { icon: <GrUserManager size={60} />, title: "Team Manager", description: "Oversee team rosters, match strategies, and player communication." },
        { icon: <GiWhistle size={60} />, title: "Referee", description: "Submit match results, log incidents, and manage disciplinary actions." },
        { icon: <GiSoccerField size={60} />, title: "Field Owner", description: "Manage bookings, monitor field availability, and track maintenance." }
    ];

    return (
        <main className="bg-gray-100 text-black min-h-screen">
            <HomeNav />
            <div className="flex flex-col items-center justify-center px-4 py-10">
                <h1 className="text-4xl font-extrabold mb-4 text-center">
                    Streamline Football Operations with Our All-in-One Platform
                </h1>
                <p className="text-lg max-w-2xl text-center opacity-80">
                    Simplify team management, match coordination, and field bookings with dedicated dashboards for Admins, Team Managers, Referees, and Field Owners.
                </p>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white border border-gray-300 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                            <div className="text-gray-700 mb-3">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-sm opacity-80">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center max-w-3xl">
                    <h2 className="text-2xl font-bold mb-4">Key Features & Core Benefits</h2>
                    <ul className="text-left list-disc list-inside space-y-2">
                        <li><strong>Admin Control:</strong> Manage users, teams, matches, and system settings with comprehensive oversight.</li>
                        <li><strong>Team Management:</strong> Organize player rosters, set tactics, and prepare match strategies efficiently.</li>
                        <li><strong>Referee Tools:</strong> Manage match results, submit incident reports, and handle disciplinary actions.</li>
                        <li><strong>Field Owner Solutions:</strong> Oversee bookings, monitor field availability, and manage maintenance schedules.</li>
                        <li><strong>User-Specific Dashboards:</strong> Tailored interfaces for enhanced usability and efficiency.</li>
                        <li><strong>Seamless Booking System:</strong> Manage field reservations and coordinate match schedules with ease.</li>
                        <li><strong>Data-Driven Insights:</strong> Access comprehensive reports on performance, bookings, and match statistics.</li>
                        <li><strong>Secure & Scalable:</strong> Role-based access ensures secure control for all user types.</li>
                        <li><strong>Mobile-ready Design:</strong> Optimized for on-the-go access.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-2">Future Enhancements</h2>
                    <p className="opacity-80">Look forward to mobile app integration, advanced analytics, and social media sharing for enhanced engagement.</p>
                    <ul><li>Scaffolding: <Link href='./referee'>Referee page   </Link></li>
                    <li><Link href='./fieldowner'>Field owner page   </Link></li>
                    <li><Link href='./teammanager'>Team Manager page   </Link></li>
                    <li><Link href='./admin'>Admin page   </Link></li>
                    </ul> 
                </div>
            </div>
        </main>
    );
}
