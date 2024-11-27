import { useState } from "react";
//icons
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

function Footer() {
  const [hover, setHover] = useState('');

  return (
    <div className="flex w-full items-center justify-around py-2 backdrop-blur">
      <div className="flex justify-center items-center">
        {/* <h2>Join us on Instagram</h2> */}
        <FaInstagram
          className="hover:scale-110 hover:cursor-pointer"
          color={`${hover ==='IG' ?"white" : "rgb(174, 183, 191, 0.4)"}`}
          size={35}
          onMouseOver={() => setHover('IG')}
          onMouseLeave={() => setHover(false)}
        />
      </div>
      <div className="flex w-11/12 items-center justify-center">
        <p className="text-zinc-600">© Sodermalm Barbershop</p>
      </div>
      <FaTiktok
          className="hover:scale-110 hover:cursor-pointer"
          color={`${hover ==='TikTok' ? "white" : "rgb(174, 183, 191, 0.4)"}`}
          size={35}
          onMouseOver={() => setHover('TikTok')}
          onMouseLeave={() => setHover(false)}
        />
    </div>
  );
}

export default Footer;
