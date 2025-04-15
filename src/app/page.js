'use client';
import HomeNav from './Components/HomeNav';
import { useState } from 'react';
import { MdAdminPanelSettings } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { GiWhistle, GiSoccerField } from "react-icons/gi";
import Link from 'next/link';
import Calendar from './Components/Calendar';
import MatchSchedule from './Components/MatchSchedule';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


export default function Homepage() {

    const mountRef = useRef(null);

    useEffect(() => {
        // Set up the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // Transparent background
        mountRef.current.appendChild(renderer.domElement);
        scene.fog = new THREE.FogExp2(0xF3F4F6, 0.1);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft white light
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

         // Load the GLB model
        const loader = new GLTFLoader();
        let model = null;;

        loader.load(
            '/3D-Objects/stadium.glb', // Replace with the path to your GLB file
            (gltf) => {
                model = gltf.scene;
                model.scale.set(0.09, 0.09, 0.09); // Adjust the scale of the model
                model.position.set(0, 0.1, -1); // Adjust the position of the model
                scene.add(model);
            },
            undefined,
            (error) => {
                console.error('An error occurred while loading the GLB model:', error);
            }
        );

        camera.position.z = 0.45;
        camera.position.y = 0.65;
        camera.rotateX(-0.4);

        document.body.onscroll = () => {
            scene.fog.density = Math.min(2, window.scrollY / 1000); // Adjust fog density based on scroll position
        }

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            if (model) {
                model.rotation.y += 0.0015; // Rotate the model for some basic animation
            }
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup on component unmount
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);
    
    const features = [
        { icon: <MdAdminPanelSettings size={60} />, title: "Admin", description: "Manage users, teams, matches, and system settings efficiently." },
        { icon: <GrUserManager size={60} />, title: "Team Manager", description: "Oversee team rosters, match strategies, and player communication." },
        { icon: <GiWhistle size={60} />, title: "Referee", description: "Submit match results, log incidents, and manage disciplinary actions." },
        { icon: <GiSoccerField size={60} />, title: "Field Owner", description: "Manage bookings, monitor field availability, and track maintenance." }
    ];

    return (
        <main className="bg-gray-100 text-black min-h-screen relative">
            {/* Background Canvas */}
            <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-10 fixed"></div>

            {/* Main Content */}
            <header className="bg-white relative z-10">
                <HomeNav />
            </header>
            <div className="flex flex-col items-center justify-center px-4 py-10 relative z-10">
                <div className='flex flex-col items-center justify-center mt-60 mb-20'>
                    <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        Streamline Football Operations with Our All-in-One Platform
                    </h1>
                    <p className="text-xl max-w-2xl text-center opacity-80 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]">
                        Simplify team management, match coordination, and field bookings with dedicated dashboards for Admins, Team Managers, Referees, and Field Owners.
                    </p>
                </div>

                <div className="mt-80 mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

                <div className="mt-16 text-center max-w-3xl mb-50">
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
