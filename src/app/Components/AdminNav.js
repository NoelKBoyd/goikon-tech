import Image from "next/image";
import { VscAccount } from "react-icons/vsc";
import { FcConferenceCall } from "react-icons/fc";

export default function AdminNav() {
    return (
      <div className="w-full h-20 bg-white-500 flex items-end text-xl m-0 pl-0 border-b-1 border-gray-400">

        <div className="h-full flex items-center pl-15">
          <div>
            <a href="/admin">
              <FcConferenceCall className="h-18 w-18"/>
            </a>
          </div>
        </div>

      <div className="flex justify-center items-center w-full">
        <ul className="object-center flex space-x-8">
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="/admin/Dashboard" className="px-10 py-3">Dashboard</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="/admin/UserManagment" className="px-10 py-3">User Managment</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="/admin/TeamsPage" className="px-10 py-3">Teams</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="/admin/Matches" className="px-10 py-3">Matches</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="/admin/Reports" className="px-10 py-3">Reports</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="/admin/SettingsPage" className="px-10 py-3">Settings</a></li>
        </ul>
      </div>

        <div className="h-full flex items-center pr-15">
          <div>
            <VscAccount className="h-12 w-12 "/>
          </div>
        </div>

      </div>
    );
  }
  