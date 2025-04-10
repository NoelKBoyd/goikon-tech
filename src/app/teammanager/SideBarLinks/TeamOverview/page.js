'use client';
import TeamManagerNav from '@/app/Components/TeamManagerNav';
import TeamManagerSideBar from '@/app/Components/TeamManagerSideBar';
import TeamManagerFooter from '@/app/Components/TeamManagerFooter';
import TeamStats from '@/app/Components/TeamStats';
import BasicTable from '@/app/Components/PlayerStats';

const TeamOverview = () => {
  return (
    <div>
      <header>
        <TeamManagerNav />
      </header>

      <main className="grid w-full grid-cols-[260px_auto] bg-gray-100 min-h-screen">
        <TeamManagerSideBar className="col-start-1 col-end-2" />

        <div className="col-start-2 col-end-3 p-10 space-y-10">
          <h1 className="text-3xl font-bold text-center">Team Overview</h1>

          <div className="grid grid-cols-1 row-start-1 lg:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6 h-fit">
              <TeamStats />
            </div>

            <div className="bg-white row-start-1 row-end-2 col-start-2 col-end-3 shadow-md rounded-lg p-6 pb-20">
              <h2 className="text-xl font-semibold mb-4">Player Stats</h2>
              <BasicTable />
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <TeamManagerFooter />
      </footer>
    </div>
  );
};

export default TeamOverview;