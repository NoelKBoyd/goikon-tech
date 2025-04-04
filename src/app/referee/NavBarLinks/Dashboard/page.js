'use client';
import React from 'react';
import RefereeNav from '@/app/Components/RefereeNav'; 
import RefereeSideBar from '@/app/Components/RefereeSideBar'; 
import RefereeFooter from '@/app/Components/RefereeFooter';
import AssignedMatchesDashboard from '@/app/Components/RefereeAssignedMatchesDashboard';
import IncidentReport from '@/app/Components/IncidentReport';
import DisciplinaryActions from '@/app/Components/DisciplinaryActions';
const RefereeDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <header>
        <RefereeNav />
      </header>

      <main className="grid grid-cols-[260px_auto] gap-6">
        <RefereeSideBar />

        <div>
          <div className="w-full grid grid-cols-2 gap-6">
            <div className="bg-white p-3 rounded-xl shadow-md">
              <AssignedMatchesDashboard/>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-md">
              <IncidentReport />
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl shadow-md">
              <DisciplinaryActions />
            </div>
          </div>
      </main>

      <footer className="mt-auto w-full mb-20">
        <RefereeFooter />
      </footer>
    </div>
  );
};

export default RefereeDashboard;
