'use client';

import RefereeNav from '@/app/Components/RefereeNav';
import RefereeSideBar from '@/app/Components/RefereeSideBar';
import RefereeFooter from '@/app/Components/RefereeFooter';
import SubmitReport from '@/app/Components/IncidentReport';
import ViewIncidents from '@/app/Components/ViewIncidents';

const IncidentReports = () => {
  return (
    <div>
      <header>
        <RefereeNav />
      </header>

      <main className="grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen">
        <RefereeSideBar />

        <div className="col-start-2 col-end-3 p-8">
          <div className="grid grid-cols-2 gap-6 h-full">
            <div className="overflow-auto">
              <SubmitReport />
            </div>
            <div className="overflow-auto">
              <ViewIncidents />
            </div>
          </div>
        </div>
      </main>

      <footer>
        <RefereeFooter />
      </footer>
    </div>
  );
};

export default IncidentReports;
