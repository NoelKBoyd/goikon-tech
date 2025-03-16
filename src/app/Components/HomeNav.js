import { FcConferenceCall } from "react-icons/fc";

export default function HomeNav() {
    return (
      <div className="w-full h-20 bg-white-500 flex items-end text-xl m-0 pl-0">

        <div className="h-full flex items-center pl-15">
          <div>
            <a href="/"><FcConferenceCall className="h-18 w-18"/></a>
          </div>
        </div>

      <div className="flex justify-center items-center w-full pl-36">
        <ul className="object-center flex space-x-40 border-b-1 border-gray-400">
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="/" className="px-10 py-3">Home</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="" className="px-10 py-3">About</a></li>
          <li className="inline hover:bg-gray-200 pb-3 pt-3"><a href="" className="px-10 py-3">Contact Us</a></li>
        </ul>
      </div>

        <div className="h-full flex items-center">
            <ul className="flex justify-center items-center space-x-8 pr-10 w-full">
                <li className="inline bg-gray-800 text-white rounded-md border border-black hover:bg-white hover:text-black duration-250"><a href="/login" className="px-5 h-10">Login</a></li>
                <li className="inline border border-white hover:border-black rounded-md duration-250"><a href="/signup" className="px-5 py-5">Register</a></li>
            </ul>
        </div>

      </div>
    );
  }