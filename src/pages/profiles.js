"use client";
import "../../src/app/globals.css";
import style from "../../styles/Home.module.css";
import Header from "../app/components/Header";
// import Wallpaper from "../../public/Assets/barber_shop.jpg";
import Logo from "../../public/Assets/Logo_rectangle.png";
import "swiper/css";
import { useState } from "react";
import Image from "next/image";

function Profiles() {
  return (
    <div>
      <Header />
      <div
        className={style.imageBackground}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="flex w-3/6 flex-col items-center rounded-3xl bg-black p-6">
          <div className="w-3/12 rounded-2xl border-2 border-black bg-black p-2">
            <Image src={Logo} />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-center text-2xl italic text-white">
              Please login to access to your profile
            </h1>
            <form className="flex w-full flex-col items-center">
              <input
                placeholder="Email"
                className="m-2 w-full rounded-xl p-4 text-black"
              />
              <input
                placeholder="Password"
                className="m-2 w-full rounded-xl p-4 text-black"
              />
            </form>
            <p className="italic text-cyan-300 underline">
              Forgotten password ?
            </p>
            <p className="italic text-cyan-300 underline">Create an account</p>
            <button className="mt-4 flex w-6/12 justify-center rounded-xl border-2 border-gray-400 p-4">
              <p className="text-gray-400">Submit</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
