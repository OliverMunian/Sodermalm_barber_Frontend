'use client'
import { useState } from "react";
import Image from "next/image";
//images
import Logo from "../../../public/Assets/Logo_reverse.png";
//icons
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";

function Footer() {
  const [hover, setHover] = useState("");

  return (
    <div className="flex w-full flex-col items-center justify-center bg-white">
      <div className="flex w-11/12 items-start py-5">
        <div className="w-1/3 mt-2">
          <Image src={Logo} className="w-52 rounded-2xl" alt="Logo_barber" />
          <p className="text-sm text-gray-600 max-md:text-xs">
            Blekingegatan 59, 11662 Stockholm
          </p>
          <p className="text-sm text-gray-600 max-md:text-xs">+4670-041 98 19</p>
        </div>
        <div className="flex w-1/3 flex-col items-start justify-center max-md:items-center">
          <h1 className="font-semibold text-black">Menu</h1>
          <p className="mt-2 text-sm text-zinc-600 max-md:text-xs max-md:mt-0">Home</p>
          <p className="text-sm text-zinc-600 max-md:text-xs">Services</p>
          <p className="text-sm text-zinc-600 max-md:text-xs">About</p>
        </div>
        <div className="flex w-1/3 flex-col max-md:items-end">
          <h1 className="font-semibold text-black">Operational</h1>
          <p className="mt-2 text-sm text-zinc-600  max-md:text-right max-md:text-xs max-md:mt-0">Mon-Fri: 10:00-20:00</p>
          <p className="text-sm text-zinc-600 max-md:text-right max-md:text-xs">Sat-Sun: 11:00-19:00</p>
        </div>
      </div>
      <div className="flex w-11/12 items-center justify-between">
        <div className="flex items-center">
          <FaFacebookF className="m-3 text-xl text-zinc-500 hover:scale-125 hover:cursor-pointer max-sm:text-xs transition" />
          <FaInstagram className="m-3 text-xl text-zinc-500 hover:scale-125 hover:cursor-pointer max-sm:text-xs transition" />
          <FaTiktok className="m-3 text-xl text-zinc-500 hover:scale-125 hover:cursor-pointer max-sm:text-xs transition" />
          <FaTwitter className="m-3 text-xl text-zinc-500 hover:scale-125 hover:cursor-pointer max-sm:text-xs transition" />
        </div>
        <div className="flex items-center">
          <p className="text-zinc-500 max-sm:text-xs">Copyright</p>
          <FaRegCopyright size={13} className="mx-1 text-zinc-500" />
          <p className="text-zinc-500 max-sm:text-xs">Sodermalm Barbershop </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
