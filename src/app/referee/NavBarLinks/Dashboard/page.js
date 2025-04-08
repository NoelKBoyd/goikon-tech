'use client';
import React from 'react';
import RefereeNav from '@/app/Components/RefereeNav';
import RefereeSideBar from '@/app/Components/RefereeSideBar';
import RefereeFooter from '@/app/Components/RefereeFooter';
import AssignedMatchesDashboard from '@/app/Components/RefereeAssignedMatchesDashboard';
import IncidentReport from '@/app/Components/IncidentReport';
import DisciplinaryActions from '@/app/Components/DisciplinaryActions';
import RecentActivityFeed from '@/app/Components/RefereeRecentActivity';

const RefereeDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <RefereeNav />
      </header>

      <main className="grid grid-cols-[260px_auto] gap-6">
        <RefereeSideBar />

        <div className="flex flex-col w-full space-y-6">
          <div className="w-full grid grid-cols-2 gap-6">
            <div className="bg-white p-3 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold mb-4 text-center">Match Overview</h2>
              <AssignedMatchesDashboard />
            </div>

            <div className="bg-white p-3 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold mb-4 text-center">Incident Reporting Form</h2>
              <IncidentReport />
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-6">
            <div className="bg-white p-3 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold mb-4 text-center">Disciplinary Action Submission</h2>
              <DisciplinaryActions />
            </div>

            <div className="bg-white p-3 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold mb-4 text-center">Recent Activity Feed</h2>
              <RecentActivityFeed />
            </div>
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
