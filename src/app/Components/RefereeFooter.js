import { FaClipboard, FaFileAlt, FaBook, FaHeadset } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

export default function RefereeFooter() {
    return (
        <div className="w-full h-20 bg-white border-t border-gray-400 flex items-center justify-between px-6 fixed bottom-0 left-0">
    
          <div>
            <a href="/logout" className="flex items-center text-black hover:bg-red-500 hover:text-white px-6 py-3 rounded-md text-xl">
              <IoMdLogOut size={24} className="mr-2" /> Logout
            </a>
          </div>
    
          <div className="flex justify-center items-center w-full">
            <ul className="flex space-x-8 pt-3 pb-3">
              <li className="hover:bg-gray-200 rounded-md"><a href="/privacy-policy" className="px-6 py-3 flex items-center space-x-2"><FaClipboard className="h-5 w-5" /> Referee Guidelines</a></li>
              <li className="hover:bg-gray-200 rounded-md"><a href="/terms-of-service" className="px-6 py-3 flex items-center space-x-2"><FaBook className="h-5 w-5" />Policies</a></li>
              <li className="hover:bg-gray-200 rounded-md"><a href="/contact" className="px-6 py-3 flex items-center space-x-2"><FaHeadset className="h-5 w-5" />Support</a></li>
            </ul>
          </div>
    
        </div>
      );
    }
    