"use client";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About"
import Image from "next/image";
import BarberShop from "../../public/Assets/barber_shop.jpg";
import Logo from "../../public/Assets/Logo_rectangle.png";
import SL from "../../public/Assets/SL_logo.png";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Profiles from "../pages/profiles";
import Services from "./components/Services";
import Team from "./components/Team";
import Footer from "./components/Footer";
//icons
import { IoLocation } from "react-icons/io5";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function index() {
  // const router = useRouter();  // Initialisation de router

  const [hoverIcon, setHoverIcon] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);

  return (
    <div className="flex w-full flex-col items-center sm:items-start">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Söldermalms barbershop</title>
      </Head>
      <ToastContainer />
      <Home />
      <About/>
      <Services/>
      <Team/>
      <Footer/>
    </div>
  );
}

export default index;
