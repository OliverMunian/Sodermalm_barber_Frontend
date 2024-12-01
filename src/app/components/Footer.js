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
      <div className="flex w-11/12 items-start border-2 border-green-500 py-5">
        <div className="w-1/4 border-2 border-blue-500">
          <Image src={Logo} className="w-52 rounded-2xl" alt="Logo_barber" />
          <p className="text-sm text-gray-600">
            Blekingegatan 59, 11662 Stockholm
          </p>
          <p className="text-sm text-gray-600">+4670-041 98 19</p>
        </div>
        <div className="w-1/4 border-2 border-red-500">
          <div>
            <h1 className="font-semibold text-black">Menu</h1>
            <p className="mt-3 text-sm text-zinc-600">Home</p>
            <p className="text-sm text-zinc-600">Services</p>
            <p className="text-sm text-zinc-600">About</p>
          </div>
        </div>
        <div className="w-1/4 border-2 border-red-500">
          <div>
            <h1 className="font-semibold text-black">Operational</h1>
            <p className="text-sm text-zinc-600">Mon-Fri: 10:00-20:00</p>
            <p className="text-sm text-zinc-600">Sat-Sun: 11:00-19:00</p>
          </div>
        </div>
      </div>
      <div className="flex w-11/12 items-center justify-between border-2 border-purple-500">
        <div className="flex items-center">
          <FaFacebookF
            size={20}
            className="m-3 text-zinc-500 hover:scale-125"
          />
          <FaInstagram
            size={20}
            className="m-3 text-zinc-500 hover:scale-125"
          />
          <FaTiktok size={20} className="m-3 text-zinc-500 hover:scale-125" />
          <FaTwitter size={20} className="m-3 text-zinc-500 hover:scale-125" />
        </div>
        <div className="flex items-center">
          <p className="text-zinc-500">Copyright</p>
          <FaRegCopyright size={13} className="mx-1 text-zinc-500" />
          <p className="text-zinc-500">Sodermalm Barbershop </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
