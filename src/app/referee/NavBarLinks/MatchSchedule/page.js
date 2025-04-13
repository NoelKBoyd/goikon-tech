'use client';

import RefereeNav from '@/app/Components/RefereeNav';
import RefereeSideBar from '@/app/Components/RefereeSideBar';
import RefereeFooter from '@/app/Components/RefereeFooter';
import AssignedMatchesDashboard from '@/app/Components/RefereeAssignedMatchesDashboard';

const MatchSchedule = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">

      <header>
        <RefereeNav />
      </header>


      <div className="flex flex-1 overflow-hidden">

        <div >
          <RefereeSideBar />
        </div>


        <div className="flex-1 p-10 overflow-y-auto">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Match Schedule</h2>
            <AssignedMatchesDashboard />
          </div>
        </div>
      </div>

      <footer className="w-full bg-white shadow-md mt-auto">
        <RefereeFooter />
      </footer>
    </div>
  );
};

export default MatchSchedule;
