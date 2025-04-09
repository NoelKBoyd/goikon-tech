'use client';
import TeamManagerNav from '@/app/Components/TeamManagerNav';
import TeamManagerSideBar from '@/app/Components/TeamManagerSideBar';
import TeamManagerFooter from '@/app/Components/TeamManagerFooter';
import BasicTable from '@/app/Components/PlayerStats';

const TeamRoster = () => {
  return (
    <div>
      <header>
        <TeamManagerNav />
      </header>

      <main className="grid w-full grid-cols-[260px_auto] bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <TeamManagerSideBar className="col-start-1 col-end-2" />

        {/* Main Content */}
        <div className="col-start-2 col-end-3 p-10">
          <h1 className="text-3xl font-bold mb-8 text-center">Team Roster</h1>

          <div className="bg-white p-6 rounded-lg shadow-md overflow-auto">
            <BasicTable />
          </div>
        </div>
      </main>

      <footer>
        <TeamManagerFooter />
      </footer>
    </div>
  );
};

export default TeamRoster;
