"use client";
import styles from "../../../styles/Home.module.css";
import Header from "./Header";
import Image from "next/image";
import BarberShop from "../../../public/Assets/barber_shop.jpg";
import Logo from "../../../public/Assets/Logo_rectangle.png";
import SL from "../../../public/Assets/SL_logo.png";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Barber from "./Barber";
import CheckBooking from "./checkBooking";
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
    <div className="flex h-screen w-full flex-col items-center">
      <Header />
      <div className="relative flex size-full items-center justify-center">
        <div className={styles.imageBackground}></div>

        <div className="flex w-4/5 items-center justify-between h-full overflow-hidden max-md:w-11/12 max-md:flex-col max-md:overflow-y-scroll">
          <div
            className="m-2.5 flex max-w-md flex-col items-center p-6 backdrop-blur-lg"
            style={{ borderRadius: "40px" }}
          >
            <div className="flex w-4/5 flex-col items-center justify-center">
              <Image src={Logo} alt="Barber Shop Logo" />
            </div>

            <div className="flex w-full items-center justify-start py-2 text-xl text-white max-md:justify-center max-md:text-sm">
              <IoLocation size={30} />
              <p className="">Blekingegatan 59, 116 62 Stockholm</p>
            </div>

            <div className="flex items-center justify-start p-2 max-md:justify-center rounded-full">
              <div style={{ borderRadius: "50%", width: "7%" }}>
                <Image
                  src={SL}
                  alt="SL_logo_tunnelbanan"
                />
              </div>
              <div>
                <h2 className="ml-2 font-semibold text-white max-md:text-sm">
                  SKANSTULL
                </h2>
              </div>
            </div>

            <div className="flex w-full items-center justify-start p-2 max-md:justify-center">
              <FaPhoneAlt size={20} color={"white"} />
              <p className="ml-2 text-xl text-white max-md:text-sm">
                070-041 98 19
              </p>
            </div>

            <div className="p-2 text-white">
              <p className="text-base/6 italic max-md:text-center max-md:text-sm">
                Step into our shop, take a seat, and let our expert barbers give
                you the look you’ve been searching for. Whether it’s a sharp
                cut, a clean shave, or a beard tune-up, we’re here to make sure
                you look and feel your best.
                <br />
                More than just a cut, it’s an experience!
              </p>
            </div>
            <div className="mt-4 hidden items-center font-semibold italic max-md:flex max-sm:flex-col max-sm:text-center max-sm:text-sm">
              Scroll down to book an appointment <MdSwipeUp className="ml-2" />
            </div>
          </div>

          {choice == null && (
            <div className="relative m-2.5 flex w-2/5 items-center justify-center rounded-2xl p-6 max-md:w-11/12">
              <div
                className={styles.logoWallpaper}
                style={{ borderRadius: "15px" }}
              ></div>

              <div className="flex w-4/5 flex-col items-center justify-center rounded-xl p-3 backdrop-blur-md">
                <h1 className="text-center text-xl font-bold text-black max-lg:text-sm">
                  Make your choice
                </h1>
                <button
                  className="m-3 w-4/5 rounded-xl border-2 border-black p-3 text-center text-black max-lg:text-sm max-sm:text-xs md:hover:bg-black md:hover:text-white"
                  onClick={() => setChoice("APT")}
                >
                  Book an appointment
                </button>
                <button
                  className="m-3 w-4/5 rounded-xl border-2 border-black p-3 text-black max-lg:text-sm max-sm:text-xs md:hover:bg-black md:hover:text-white"
                  onClick={() => setChoice("RES")}
                >
                  Check your reservation
                </button>
              </div>
            </div>
          )}

          {choice == "APT" && <Barber onCancel={() => setChoice(null)} />}
          {choice == "RES" && <CheckBooking onCancel={() => setChoice(null)} />}
        </div>
      </div>
    </div>
  );
}

export default Home;

//className="absolute h-full max-md:top-8 max-md:flex max-md:h-3/4 max-md:items-center"
