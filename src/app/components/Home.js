"use client";
import styles from "../../../styles/Home.module.css";
import Image from "next/image";
import BarberShop from "../../../public/Assets/barber_shop.jpg";
import Logo from "../../../public/Assets/Logo_rectangle.png";
import SL from "../../../public/Assets/SL_logo.png";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Barber from "./Barber";
import CheckBooking from "./checkBooking";
//components
import Header from "./Header";
import About from "./About";
import Services from "./Services";
import Team from "./Team";
import Footer from "./Footer";
//icons
import { IoLocation } from "react-icons/io5";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdSwipeUp } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { heIL } from "@mui/x-date-pickers/locales";

function Home() {
  // const router = useRouter();  // Initialisation de router

  const [hoverIcon, setHoverIcon] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [choice, setChoice] = useState(null);

  //   function selectedBarber(params) {
  //     setBarberChoosen(params.name);
  //     if (barberChoosen) {
  //       setBarberChoosen(null);
  //     }
  //   }

  return (
    <div className="bg-barber-wallpaper relative flex h-screen w-full flex-col items-center bg-cover">
      <Header />
      <div className="flex h-full w-11/12 flex-col items-start">
        <div className="flex w-full items-start max-md:justify-center">
          {choice == null && (
            <div
              className="flex h-96 w-96 flex-col items-center justify-evenly rounded-2xl p-6 backdrop-blur-sm max-lg:h-80 max-lg:max-w-80"
              style={{ border: "1px solid white" }}
            >
              <button
                className="w-4/5 rounded-xl bg-orange-300 p-3 text-center text-black max-lg:text-sm max-sm:text-xs md:hover:bg-orange-500"
                onClick={() => setChoice("APT")}
              >
                Make an appointment
              </button>
              <button
                className="w-4/5 rounded-xl border-2 border-white p-3 text-white max-lg:text-sm max-sm:text-xs md:hover:bg-white md:hover:text-black"
                onClick={() => setChoice("RES")}
              >
                Check your reservation
              </button>
            </div>
          )}

          {choice == "APT" && <Barber onCancel={() => setChoice(null)} />}
          {choice == "RES" && <CheckBooking onCancel={() => setChoice(null)} />}
        </div>

        <div className="flex w-full items-end justify-between max-md:mt-10 max-md:flex-col-reverse max-md:justify-end max-sm:w-full md:h-full">
          <div className="flex w-2/6 items-end p-2 text-white max-md:w-full max-md:items-start md:h-full">
            <p className="text-sm max-md:text-center">
              Step into our shop, take a seat, and let our expert barbers give
              you the look you’ve been searching for. Whether it’s a sharp cut,
              a clean shave, or a beard tune-up, we’re here to make sure you
              look and feel your best.
              <br />
              More than just a cut, it’s an experience !
            </p>
          </div>
          <div>
            <h1 className="font-chakrapetch text-right text-6xl font-bold max-lg:text-5xl max-md:text-5xl max-sm:text-5xl">
              WHEN STYLE <br />
              MEETS PRECISION
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

//className="absolute h-full max-md:top-8 max-md:flex max-md:h-3/4 max-md:items-center"
