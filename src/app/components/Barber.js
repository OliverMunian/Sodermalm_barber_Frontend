"use client";
import Wallpaper from "../../../public/Assets/wallpaper.jpg";
import Image from "next/image";
import { useState, useEffect } from "react";
import Reservation from "./Reservation";
//extensions
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, EffectCards } from "swiper/modules";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
//Icons
import { MdSwipeDown } from "react-icons/md";
import { MdSwipeLeft } from "react-icons/md";
import { TbHandClick } from "react-icons/tb";
import { IoPlaySkipForwardCircleSharp } from "react-icons/io5";
import { TbArrowBack } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import TimeSlots from "./TimeSlots";
import FormSubmit from "./Form";
import zIndex from "@mui/material/styles/zIndex";

function Barber(props) {
  const [hover, setHover] = useState(false);
  const [selected, setSelected] = useState(null);
  const [barberChoosen, setBarberChoosen] = useState({
    id: null,
    name: null,
    src: null,
    alt: null,
    daysOff: null,
  });
  //States
  const [nextForm, setNextForm] = useState(false);
  const [scheduleForm, setScheduleForm] = useState(true);
  const [subscribe, setSubscribe] = useState(false);
  const [date, setDate] = useState(null);
  const [slotSelected, setSlotSelected] = useState(null);
  const BACKEND_ADRESS = "https://sodermalm-baber-backend.vercel.app";
  const [barberProfile, setBarberProfile] = useState([]);
  const [daysOff, setDaysOff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  let daySelected = date;

  const barberProfiles = barberProfile.map((data) => ({
    id: data._id,
    src: `${BACKEND_ADRESS}/assets${data.profilePicture}`, // Ajoutez le chemin complet
    daysOff: data.daysOff,
    name: data.username,
    alt: "Barber_cutting_profile_picture",
    width: 200,
    height: 200,
  }));

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

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  useEffect(() => {
    console.log('les images sont chargés !')
    console.log(loadedImages)
    if (loadedImages === barberProfiles.length) {
      setLoading(false);
    }
  }, [loadedImages, barberProfiles]);

  const displayBarberProfiles = barberProfiles.map((data, i) => {
    return (
      <SwiperSlide key={`${data.name}-${i}`}>
        <div
          className="relative flex justify-center"
          style={{ overflow: "hidden" }}
        >
          <div
            className={
              "relative flex h-52 w-44 items-center justify-center overflow-hidden rounded-lg backdrop-blur-lg max-md:h-44 max-md:w-40"
            }
            style={{
              border: selected == i ? "3px solid green" : "3px solid white",
              backgroundColor:
                selected === i ? "rgba(0, 255, 0, 0.2)" : "transparent",
            }}
            // onTouchStart={() => setHover(i)}
            // onTouchEnd={() => toggleChoice(i, data)}
            onClick={() => toggleChoice(i, data)}
          >
            <img
              src={data.src}
              alt={data.alt}
              onLoad={handleImageLoad}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div className="absolute flex h-full w-full flex-col items-start justify-end">
              <div
                className="w-full"
                style={{ borderBottom: "2px #f3bd7f solid" }}
              >
                <h1 className="pl-2 font-bold">{data.name}</h1>
              </div>
              <div className="w-full bg-orange-100">
                <p className="pl-2 text-sm text-zinc-500">Master barber</p>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    );
  });

  //Function
  function toggleChoice(index, data) {
    console.log(data.id);
    if (selected == index) {
      setSelected(null);
      setBarberChoosen({ name: null, src: null, id: null, daysOff: null });
      setDate(false);
      setSubscribe(false);
      setSlotSelected(false);
      setNextForm(false);
    } else {
      setSelected(index);
      setBarberChoosen({
        id: data.id,
        name: data.name,
        src: data.src,
        alt: data.alt,
        daysOff: data.daysOff,
      });
      setSubscribe(false);
      setSlotSelected(false);
      setNextForm(false);
    }
  }

  function backChoiceBarber() {
    daySelected = null;
    setDate(null);
    setSubscribe(false);
    setSlotSelected(false);
    setNextForm(false);
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
    console.log("slot:", slot);
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
    <div className="flex w-full items-center justify-start max-md:justify-center">
      {!nextForm && (
        <div
          className="flex h-96 w-96 flex-col items-center justify-center rounded-3xl p-2 backdrop-blur-md max-md:h-80 max-md:w-80"
          style={{ border: "1px solid white" }}
        >
          <div className="mb-5 flex flex-col items-center">
            <div className="flex items-center text-center">
              <p className="italic max-md:text-sm">
                Swipe left or right to choose your barber
              </p>
              <MdSwipeLeft className="ml-3" size={20} />
            </div>
            <div className="flex items-center text-center">
              <p className="italic max-md:text-sm">
                Click to select your barber
              </p>
              <TbHandClick className="ml-3" size={20} />
            </div>
          </div>
          <div className="w-full">
            {loading ? (
              <div className="flex h-full w-full items-center justify-center">
                <div className="loader text-white text-xl">Loading...</div>
              </div>
            ) : (
              <Swiper
                spaceBetween={100}
                effect={"cards"}
                cardsEffect={{
                  slideShadows: false,
                }}
                grabCursor={true}
                modules={[EffectCards]}
                centeredSlides={false}
                slidesPerView={"auto"}
                pagination={{
                  clickable: true,
                }}
              >
                {displayBarberProfiles}
              </Swiper>
            )}
            {/* <Swiper
              spaceBetween={100}
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
            </Swiper> */}
          </div>

          {barberChoosen.name ? (
            <div className="mt-4 flex flex-col items-center justify-center">
              {/* <h2>
                You've selected{" "}
                <span className="font-bold">{barberChoosen.name}</span>
              </h2> */}
              <div
                className="hover:cursor-pointer"
                onClick={() => {
                  setNextForm(true);
                  setScheduleForm(true);
                }}
              >
                <IoPlaySkipForwardCircleSharp
                  size={30}
                  hover={{ color: "green" }}
                />
                <p className="text-sm italic">Next</p>
              </div>
            </div>
          ) : (
            <div>
              <button
                className="m-3 flex w-11/12 items-center justify-center rounded-xl bg-orange-300 p-2 font-semibold hover:bg-orange-500"
                onClick={props.onCancel}
              >
                <p className="text-white">Cancel</p>{" "}
              </button>
            </div>
          )}
        </div>
      )}

      {nextForm && (
        <div
          className="flex items-center rounded-3xl p-2 backdrop-blur-md max-lg:w-full max-lg:justify-around max-lg:overflow-y-scroll max-md:h-80 max-md:flex-col"
          style={{ border: "1px solid white" }}
        >
          <div className="my-2 flex flex-col items-center justify-center">
            <div
              className="relative flex h-44 w-36 items-center justify-center overflow-hidden rounded-lg"
              style={{
                border: "3px solid green",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
              }}
            >
              <img
                src={barberChoosen.src}
                alt={barberChoosen.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div className="bg-red absolute flex h-full w-full flex-col items-start justify-end">
                <div
                  className="w-full"
                  style={{ borderBottom: "2px #f3bd7f solid" }}
                >
                  <h1 className="pl-2 font-bold">{barberChoosen.name}</h1>
                </div>
                <div className="w-full bg-orange-100">
                  <p className="pl-2 text-sm text-zinc-500">Master barber</p>
                </div>
              </div>
            </div>
            {/* <p className="text-2xl font-semibold italic text-white">
              {barberChoosen.name}
            </p> */}
            <div
              className="my-2 flex items-center hover:cursor-pointer"
              onClick={() => {
                backChoiceBarber();
              }}
            >
              <p className="text-center text-sm italic text-white">
                Choose another barber
              </p>
              <TbArrowBack size={20} />
            </div>
          </div>

          <div
            className={`max-md:w-full ${!scheduleForm && daySelected && !subscribe ? "w-full" : ""} ${subscribe ? "w-full" : ""}`}
          >
            {!scheduleForm && daySelected && !subscribe && (
              <TimeSlots
                date={daySelected}
                barber={barberChoosen.id}
                onSelect={validateSlot}
                display={() => displayFormSubmit()}
                cancel={() => cancelSchedule()}
              />
            )}

            {scheduleForm && (
              <div className="flex flex-col items-center overflow-y-scroll max-md:mt-6 max-md:pt-2">
                <div className="hidden w-full max-md:flex max-md:items-center max-md:justify-center">
                  <h1>Scroll drown and pick up a date</h1>
                  <MdSwipeDown className="ml-2" />
                </div>
                <Reservation
                  pickDate={(date) => handleDateChange(date)}
                  daysOff={barberChoosen.daysOff}
                  // onCancel={() => cancelDate()}
                  onValidate={(params) => validateDate(params)}
                />
              </div>
            )}

            {subscribe && (
              <div className="w-11/12">
                <div className="flex w-full justify-center">
                  <p className="text-center italic">
                    {dayjs(daySelected, "DD-MM-YYYY").format("D MMMM, YYYY")} at{" "}
                    {slotSelected}
                  </p>
                </div>
                <FormSubmit
                  cancel={cancelSubmit}
                  barberId={barberChoosen.id}
                  slot={slotSelected}
                  day={daySelected}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Barber;
