import Link from "next/link";
import React from "react";
import fox from "../public/fox.png";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { FcSearch } from "react-icons/fc";
import {BsBellFill} from 'react-icons/bs'

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 z-50 w-full transition-all bg-[#111111] shadow-sm shadow-[#111111] pb-2">
      <div className="flex justify-between mt-3">
        <div className="flex items-center space-x-2 md:space-x-10">
          <Link href="/">
            <Image src={fox} alt="fox" className="w-8 h-8  ml-5 md:-mr-6" />
          </Link>
          <p className="text-white md:font-bold md:text-lg">FoxMovies</p>
          <ul className="hidden space-x-4 md:flex ">
            <li className="text-sm cursor-pointer font-semibold text-white">Home</li>
            <li className="headerLink">TV Shows</li>
            <li className="headerLink">Movies</li>
            <li className="headerLink">New & Popular</li>
            <li className="headerLink">My List</li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 text-sm mr-5">
            <FcSearch className="hidden lg:inline h-6 w-6 cursor-pointer"/>
            <p className="hidden lg:inline cursor-pointer headerLink">Kids</p>
            <BsBellFill className='hidden lg:inline h-5 w-5 cursor-pointer text-gray-200'/>
        <img
          src={session?.user?.image}
          alt=""
          className="md:w-8 md:h-8 w-6 h-6 rounded-lg cursor-pointer"
          onClick={()=>signOut('google')}
        />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
