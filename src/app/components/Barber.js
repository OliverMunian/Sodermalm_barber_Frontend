"use client";
import Rudy from "../../../public/Assets/Barbers_Profiles/Rudy.jpg";
import Esteban from "../../../public/Assets/Barbers_Profiles/Esteban.jpg";
import Wallpaper from "../../../public/Assets/wallpaper.jpg";
import Image from "next/image";
import { useState } from "react";
import Reservation from "./Reservation";
//extensions
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, EffectCards } from "swiper/modules";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
//Icons
import { MdSwipeLeft } from "react-icons/md";
import { TbHandClick } from "react-icons/tb";
import { IoPlaySkipForwardCircleSharp } from "react-icons/io5";
import { TbArrowBack } from "react-icons/tb";
import TimeSlots from "./TimeSlots";
import FormSubmit from "./Form";
import zIndex from "@mui/material/styles/zIndex";

function Barber(props) {
  const [hover, setHover] = useState(false);
  const [selected, setSelected] = useState(null);
  const [barberChoosen, setBarberChoosen] = useState({
    name: null,
    src: null,
    alt: null,
  });
  //States
  const [nextForm, setNextForm] = useState(false);
  const [scheduleForm, setScheduleForm] = useState(true);
  const [subscribe, setSubscribe] = useState(false);
  const [date, setDate] = useState(null);
  const [slotSelected, setSlotSelected] = useState(null);
  let daySelected = date;

  const barberProfiles = [
    {
      src: Rudy,
      description: "Everyday in an Olympic competition",
      name: "Rudy",
      alt: "Barber_cutting_profile_picture",
      width: 200,
      height: 200,
    },
    {
      src: Esteban,
      description: "A real Swiss army knife",
      name: "Esteban",
      alt: "Barber_profile_picture",
      width: 200,
      height: 200,
    },
  ];

  const displayBarberProfiles = barberProfiles.map((data, i) => {
    return (
      <SwiperSlide key={`${data.name}-${i}`}>
        <div
          className="relative flex justify-center"
          style={{ overflow: "hidden" }}
        >
          <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{
              borderRadius: "50%",
              border: selected == i ? "4px solid green" : "3px solid white",
              backgroundColor:
                selected === i ? "rgba(0, 255, 0, 0.1)" : "transparent",
            }}
            // onTouchStart={() => setHover(i)}
            // onTouchEnd={() => toggleChoice(i, data)}
            onClick={() => toggleChoice(i, data)}
          >
            <Image
              src={data.src}
              style={{ borderRadius: "50%" }}
              alt={data.description}
              width={data.width}
              height={data.height}
            />
            {/* <div
              className="absolute flex size-full flex-col items-center justify-center bg-black max-sm:display-none"
              style={{
                opacity: "0.8",
                display: hover === i ? "flex" : "none", // 'flex' pour conserver la centration
              }}
            >
              <h1 className="font-semibold italic text-white">{data.name}</h1>
              <p className="text-center italic text-white">
                "{data.description}"
              </p>
            </div> */}
          </div>
        </div>
      </SwiperSlide>
    );
  });

  //Function
  function toggleChoice(index, data) {
    if (selected == index) {
      setSelected(null);
      setBarberChoosen({ name: null, src: null });
      setDate(false)
      setSubscribe(false)
      setSlotSelected(false)
      setNextForm(false)
    } else {
      setSelected(index);
      setBarberChoosen({ name: data.name, src: data.src, alt: data.alt });
      setSubscribe(false)
      setSlotSelected(false)
      setNextForm(false)
    }
  }

  function backChoiceBarber(){
    daySelected = null
    setDate(null)
    setSubscribe(false)
    setSlotSelected(false)
    setNextForm(false)
  }

  function handleDateChange(newDate) {
    if (newDate) {
      setDate(newDate.format("DD-MM-YYYY"));
    } else {
      console.warn("handleDateChange received an invalid date:", newDate);
    }
  }

  function validateDate() {
    if (date == null) {
      toast.warning("Please select a date for your appointment", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark", // Exemples de configuration supplémentaire
      });
    }
    if (date !== null) {
      setScheduleForm(false);
    }
  }

  function cancelSchedule() {
    setScheduleForm(true);
    setSubscribe(false);
    setDate(null);
  }

  //Book le creneau horaire choisi
  const validateSlot = (slot) => {
    setSlotSelected(slot);
    // setSubscribe(true);
  };

  function displayFormSubmit() {
    setSubscribe(true);
  }

  function cancelSubmit() {
    setSubscribe(false);
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* <div
        className="h-full w-full rounded-3xl bg-black opacity-85"
        style={{ width: "100%", height: "100%" }}
      ></div> */}

      {!nextForm && (
        <div className="flex size-full flex-col items-center justify-center rounded-3xl bg-black p-2">
          <div className="mb-5 flex w-full flex-col items-center">
            <div className="flex items-center">
              <p className="italic">
                Swipe left or right to choose your barber
              </p>
              <MdSwipeLeft className="ml-3" size={20} />
            </div>
            <div className="flex items-center">
              <p className="italic">Click to select your barber</p>
              <TbHandClick className="ml-3" size={20} />
            </div>
          </div>
          <Swiper
            spaceBetween={50}
            // allowTouchMove={selected}
            effect={"cards"}
            cardsEffect={{
              slideShadows: false, // Ajoute ceci pour désactiver l'ombre des cartes
            }}
            grabCursor={true}
            modules={[EffectCards]}
            centeredSlides={false}
            slidesPerView={"auto"}
            pagination={{
              clickable: true, // Active une pagination cliquable sur mobile
            }}
          >
            {displayBarberProfiles}
          </Swiper>
          <div
            className="mt-4 w-full flex-col items-center justify-center"
            style={{ display: barberChoosen.name ? "flex" : "none" }}
          >
            <h2>
              You've selected{" "}
              <span className="font-bold">{barberChoosen.name}</span>
            </h2>
            <div
              className="mt-3 pb-5 hover:cursor-pointer"
              onClick={() => {setNextForm(true); setScheduleForm(true)}}
            >
              <IoPlaySkipForwardCircleSharp
                size={30}
                hover={{ color: "green" }}
              />
              <p className="text-sm italic">Next</p>
            </div>
          </div>
        </div>
      )}

      {nextForm && (
        <div
          className="flex w-full items-center rounded-3xl bg-black p-2 max-xl:flex-col"
          // style={{ backgroundColor: "black" }}
        >
          <div className="my-2 flex flex-col items-center justify-center">
            <div
              className="w-2/5 rounded-full max-xl:w-1/4"
              // style={{width: '40%'}}
            >
              <Image
                src={barberChoosen.src}
                alt={barberChoosen.alt}
                className="rounded-full"
              />
            </div>
            <p className="text-2xl font-semibold italic text-white">
              {barberChoosen.name}
            </p>
            <div
              className="my-2 flex items-center hover:cursor-pointer"
              onClick={() => {backChoiceBarber()}}
            >
              <TbArrowBack size={20} />
              <p className="italic text-white">Choose another barber</p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center">
            {!scheduleForm && daySelected && !subscribe && (
              <TimeSlots
                date={daySelected}
                onSelect={validateSlot}
                display={() => displayFormSubmit()}
                cancel={() => cancelSchedule()}
              />
            )}

            {scheduleForm && (
              <div className="flex flex-col items-center max-md:mt-6 max-md:border-t max-md:pt-4">
                <h2 className="text-2xl font-semibold italic">Choose a day</h2>
                <Reservation
                  pickDate={(date) => handleDateChange(date)}
                  // onCancel={() => cancelDate()}
                  onValidate={(params) => validateDate(params)}
                  className="h-full"
                />
              </div>
            )}

            {subscribe && (
              <div className="w-full">
                <div className="flex w-full justify-center">
                  <p className="italic">
                    {dayjs(daySelected, "DD-MM-YYYY").format("D MMMM, YYYY")} at{" "}
                    {slotSelected}
                  </p>
                </div>
                <FormSubmit cancel={cancelSubmit} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Barber;
