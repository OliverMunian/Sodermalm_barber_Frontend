import styles from "../../../styles/Home.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import Oliver from "../../../public/Assets/Barbers_Profiles/Oliver.png";
import John from "../../../public/Assets/Barbers_Profiles/John.png";

//icons
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Team() {
  const [barberProfile, setBarberProfile] = useState([]);
  const BACKEND_ADRESS = "http://sodermalm-baber-backend.vercel.app";
  const profilesBarber = [
    {
      name: "Oliver",
      statuts: "Master Barber",
      src: Oliver,
    },
    {
      name: "John",
      statuts: "Master Barber",
      src: John,
    },
  ];
  useEffect(() => {
    let isMounted = true;

    fetch(`${BACKEND_ADRESS}/users`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && isMounted) {
          setBarberProfile((prevProfiles) => [...prevProfiles, ...data.data]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const barberDisplay = barberProfile.map((barber, i) => {
    return (
      <div
        key={i}
        className={`flex flex-col items-center rounded-lg ${i % 2 == 0 ? "bg-gray-400" : "bg-zinc-100"}`}
      >
        <div className="flex w-9/12 justify-between py-5">
          <div className="flex flex-col justify-center rounded-lg bg-white p-3">
            <h1 className="font-bold text-black">{barber.username}</h1>
            <p className="text-zinc-400">Master barber</p>
          </div>
          <div className="ml-3 flex h-full flex-col items-end justify-around">
            <FaTiktok
              color="#34345b"
              className="hover:scale-125 hover:cursor-pointer"
            />
            <FaInstagram
              color="#34345b"
              className="hover:scale-125 hover:cursor-pointer"
            />
          </div>
        </div>
        <div className="h-72 w-64">
          <Image
            // src={barber.src}
            src={`${BACKEND_ADRESS}/assets${barber.profilePicture}`}
            alt="Barber_profile_picture"
            className="rounded-xl"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            width={500}
            height={500}
          />
        </div>
      </div>
    );
  });

  return (
    <div
      className="flex w-full flex-col items-center bg-white"
      style={{ borderBottom: "0.75px solid gray" }}
    >
      <div className="mt-14 flex h-2/4 w-11/12 flex-col items-center">
        <h1 className="font-chakrapetch text-5xl font-bold uppercase text-black">
          Meet ours experts
        </h1>
        <div className="mt-5 w-1/4">
          <p className="text-center text-xs text-black">
            Step into the hands of true professionals. Our team of skilled
            barbers combines precision, creativity to deliver exceptional
            results tailored to you. Experience expertise that defines the art
            of barbering
          </p>
        </div>
      </div>

      <div className="mt-5 flex h-2/4 w-11/12 items-center justify-between py-5">
        <div className="rounded-x flex w-11/12 justify-around">
          {barberDisplay}
        </div>
      </div>
    </div>
  );
}

export default Team;
