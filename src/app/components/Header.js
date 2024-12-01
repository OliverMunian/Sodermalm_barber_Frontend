import styles from "../../../styles/Home.module.css";
import Image from "next/image";
import Logo from "../../../public/Assets/Logo_rectangle.png";
import { useState } from "react";
import { MdEventAvailable } from "react-icons/md";
import { motion } from "framer-motion";
import Link from "next/link";

function Header() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [book, setBook] = useState(false);

  const array = [
    // { image: Logo, alt: "Background_barber_saloon", link: "" },
    { title: "Home", link: "" },
    { title: "Services", link: "Services" },
    // { title: "Products", link: "Products" },
    { title: "About us", link: "about" },
    // { button: "Book appointment" },
  ];
  const displayMenu = array.map((data, i) => {

    return (
      <div
        key={i}
        className="m-3 cursor-pointer text-2xl text-white"
        onMouseOver={() => setHoverIndex(i)}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <Link href={`/${data.link}`}>
          <h2
            className="text-xl font-light max-md:text-xs"
            style={{
              textDecoration:
                hoverIndex == i ? "underline white solid" : "none",
              textDecorationThickness: "0.25px",
              textUnderlineOffset: "10px",
            }}
          >
            {data.title}
          </h2>
        </Link>
      </div>
    );
  });

  return (
    <div className="flex w-full items-center justify-evenly bg-transparent p-4 font-sans">
      <div className="w-1/5 max-md:w-1/6">
        <Link href="/">
          <Image src={Logo} className="w-2/4 max-lg:w-full" alt="Logo_barber" />
        </Link>
      </div>
      <div
        className="flex w-2/5 items-center justify-around rounded-md max-md:w-3/5"
        style={{ border: "1px solid white" }}
      >
        {displayMenu}
      </div>
      <div className="flex w-1/5 items-center justify-center max-md:1/6">
        <Link href="/contact">
          <button className="rounded-lg bg-white p-3 font-bold text-black hover:bg-zinc-200 max-md:text-xs">
            Contact us
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
