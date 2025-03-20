import Image from "next/image";
import { VscAccount } from "react-icons/vsc";
import { FcConferenceCall } from "react-icons/fc";

export default function TeamManagerNav() {
    return (
      <div className="w-full h-20 bg-white-500 flex items-end text-xl m-0 pl-0 border-b-1 border-gray-400">

        <div className="h-full flex items-center pl-15">
          <div>
            <FcConferenceCall className="h-18 w-18"/>
          </div>
        </div>

      <div className="flex justify-center items-center w-full">
        <ul className="object-center flex space-x-8">
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="" className="px-6 py-3">Dashboard</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="" className="px-6 py-3">Team Roster</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="" className="px-6 py-3">Upcoming Matches</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="" className="px-6 py-3">Training Schedule</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="" className="px-6 py-3">Messages</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="" className="px-6 py-3">Settings</a></li>
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