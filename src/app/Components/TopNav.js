import Image from "next/image";
import { VscAccount } from "react-icons/vsc";
import { FcConferenceCall } from "react-icons/fc";

export default function TopNav() {
    return (
      <div className="w-full h-20 bg-white-500 flex items-end text-xl m-0 pl-0">

        <div className="h-full flex items-center pl-15">
          <div>
            <FcConferenceCall className="h-18 w-18"/>
          </div>
        </div>

      <div className="flex justify-center items-center w-full">
        <ul className="object-center flex space-x-8 border-b-1 border-gray-400">
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="" className="px-10 py-3">Dashboard</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="" className="px-10 py-3">User Managment</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="" className="px-10 py-3">Teams</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="" className="px-10 py-3">Matches</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="" className="px-10 py-3">Reports</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="" className="px-10 py-3">Settings</a></li>
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
  