'use client';
import AdminNav from "@/app/Components/AdminNav";
import AdminSideBar from "@/app/Components/AdminSideBar";
import AdminFooter from "@/app/Components/AdminFooter";
import { useState } from 'react';

const TeamPage = () => {
    return (
        <div>
            <header>
                <AdminNav />
            </header>

            <main className='grid w-full grid-cols-[260px_auto]'>
                <AdminSideBar className='col-start-1 col-end-2'/>

                <div className='col-start-2 col-end-3 flex justify-center text-center'>
                    <div className="pt-10">
                        <h1>Team Page</h1>
                        
                    </div>
                </div>
            </main>

            <footer>
                <AdminFooter />
            </footer>
        </div>
    );
};

export default TeamPage;