import { FaInstagram } from "react-icons/fa";
import { useState } from "react";

function Footer() {
  const [hover, setHover] = useState(false);
  return (
    <div className="flex w-full backdrop-blur">
      <h2>Join us on Instagram</h2>
      <FaInstagram
      className="hover:cursor-pointer hover:scale-125"
        color={`${hover ? "red" : "white"}`}
        size={30}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    </div>
  );
}

export default Footer;
