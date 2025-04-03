'use client';
import TeamManagerNav from '@/app/Components/TeamManagerNav';
import TeamManagerSideBar from '@/app/Components/TeamManagerSideBar';
import TeamManagerFooter from '@/app/Components/TeamManagerFooter';
import { useState } from 'react';
import PlayerStats from '@/app/Components/PlayerStats';

const PlayerManagement = () => {
    return (
        <div>
            <header>
                <TeamManagerNav/>
            </header>

            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen'>
                <TeamManagerSideBar className='col-start-1 col-end-2'/>

                <div className= 'col-start-2 col-end-3 pt-10'>
                    <PlayerStats/>
                </div>
            </main>

            <footer>
                <TeamManagerFooter/>
            </footer>
        </div>
    );
};

export default PlayerManagement;