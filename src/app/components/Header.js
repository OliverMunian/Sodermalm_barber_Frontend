'use client'
import styles from "../../../styles/Home.module.css";
import Image from "next/image";
import Logo from "../../../public/Assets/Logo_rectangle.png";
import { useState, useEffect } from "react";
import { MdEventAvailable } from "react-icons/md";
import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
//icons
import { GiHamburgerMenu } from "react-icons/gi";
import { setDate } from "date-fns";

function Header() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [active]);

  const array = [
    { title: "Home", link: "" },
    { title: "Services", link: "#Services" },
    { title: "About us", link: "#About" },
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
    <div className="flex w-full items-center justify-evenly bg-transparent p-4 font-sans max-sm:justify-between">
      <div className="w-1/5 max-md:w-1/6">
        <Link href="/">
          <Image src={Logo} className="w-2/4 max-lg:w-full" alt="Logo_barber" />
        </Link>
      </div>
      <div
        className="flex w-2/5 items-center justify-around rounded-md max-md:w-3/5 max-sm:hidden"
        style={{ border: "1px solid white" }}
      >
        {displayMenu}
      </div>
      <div className="max-md:1/6 flex w-1/5 items-center justify-center max-sm:hidden">
        <Link href="/Contact">
          <div className="rounded-lg bg-white p-3 font-bold text-black hover:bg-zinc-200 max-md:text-xs">
            Contact us
          </div>
        </Link>
      </div>

      <div className="z-30 hidden max-sm:flex">
        <MotionConfig
          transition={{
            duration: "0.5s",
            ease: "easeInOut",
          }}
        >
          <motion.button
            className="relative h-16 w-16"
            onClick={() => setActive((prev) => !prev)}
          >
            <motion.span
              className="absolute h-1 w-10 bg-white"
              style={{
                top: "35%",
                left: "50%",
                translateX: "-50%",
              }}
              animate={active ? "open" : "closed"}
              transition={{ duration: 0.2 }}
              variants={{
                open: { rotate: 45, top: "50%" },
                closed: { rotate: 0, top: "35%" },
              }}
            />
            <motion.span
              className="absolute h-1 w-10 bg-white"
              style={{
                left: "50%",
                translateX: "-50%",
              }}
              animate={active ? "open" : "closed"}
              transition={{ duration: 0.2 }}
              variants={{
                open: {
                  rotate: -45,
                },
                closed: {
                  rotate: 0,
                },
              }}
            />
            <motion.span
              className="absolute h-1 w-5 bg-white"
              style={{
                top: "65%",
                left: "50%",
              }}
              animate={active ? "open" : "closed"}
              transition={{ duration: 0.2 }}
              variants={{
                open: {
                  top: "50%",
                  rotate: 45,
                  translateX: "-50%",
                },
                closed: {
                  top: "65%",
                  rotate: 0,
                },
              }}
            />
          </motion.button>
        </MotionConfig>
      </div>
      {active && (
        <div className="fixed left-0 top-0 z-20 flex h-screen w-full flex-col items-center justify-center bg-black opacity-90">
          <Link href='/' onClick={()=>setActive(false)}>
            <h1 className="font-chakrapetch my-2 text-5xl font-bold hover:cursor-pointer hover:text-orange-300">
              Home
            </h1>
          </Link>
          <Link href='/#Services' onClick={()=>setActive(false)}>
            <h1 className="font-chakrapetch my-2 text-5xl font-bold hover:cursor-pointer hover:text-orange-300">
              Services
            </h1>
          </Link>
          <Link href='/#About' onClick={()=>setActive(false)}>
            <h1 className="font-chakrapetch my-2 text-5xl font-bold hover:cursor-pointer hover:text-orange-300">
              About
            </h1>
          </Link>
          <Link href='/Contact' onClick={()=>setActive(false)}>
            <h1 className="font-chakrapetch my-2 text-5xl font-bold hover:cursor-pointer hover:text-orange-300">
              Contact us
            </h1>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
