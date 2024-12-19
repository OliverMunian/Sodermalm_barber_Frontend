import styles from "../../../styles/Home.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
//images
import Taper from "../../../public/Assets/Haircut_models/Taperfade.jpg";
import Lowfade from "../../../public/Assets/Haircut_models/LowFade.jpg";
import Highfade from "../../../public/Assets/Haircut_models/Highfade.jpg";
import BuzzcutMidFade from "../../../public/Assets/Haircut_models/Buzzcut_MidFade.jpg";
//icons
import { FaQuoteLeft } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa6";
import { BsArrowRightCircle } from "react-icons/bs";
import { BsArrowLeftCircle } from "react-icons/bs";


function Services() {
  const haircuts = [
    {
      src: Taper,
      alt: "Haircut_Taper",
    },
    {
      src: Lowfade,
      alt: "Lowfade_Taper",
    },
    {
      src: Highfade,
      alt: "Highfade_Taper",
    },
    {
      src: BuzzcutMidFade,
      alt: "BuzzcutMidFade_Taper",
    },
  ];

  const prices = [
    {
      service: "Haircut",
      price: "250KR",
    },
    {
      service: "Shave",
      price: "150KR",
    },
    {
      service: "Haircut + shave",
      price: "350KR",
    },
    {
      service: "Beard trim",
      price: "150KR",
    },
  ];

  const pricesDisplay = prices.map((element, i) => {
    return (
      <div
        key={i}
        className="my-1 flex w-full justify-between py-2 max-sm:py-1"
        style={{ borderBottom: i === 3 ? "" : "0.75px solid grey" }}
      >
        <h1 className="text-lg uppercase text-black">{element.service}</h1>
        <p className="text-lg uppercase text-black">{element.price}</p>
      </div>
    );
  });

  const displayHaircuts = haircuts.map((haircut, i) => {
    return (
      <SwiperSlide key={i}>
        <div className="flex h-full flex-col overflow-hidden rounded-lg">
          <Image
            src={haircut.src}
            alt={haircut.alt}
            className="object-cover"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </SwiperSlide>
    );
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-around bg-orange-100 py-5" id='Services'>
      <div className="flex w-11/12 justify-between max-lg:flex-col">
        <div className="flex w-1/4 flex-col max-xl:w-2/4 max-lg:w-full">
          <h1 className="font-chakrapetch text-5xl font-bold uppercase text-black">
            DISCOVER OUR WORK
          </h1>
          <p className="mt-14 text-sm text-black max-lg:mt-4">
            Every cut is a work of art, and every detail matters. With refined
            techniques and premium products, we enhance your style while staying
            true to your personality.
          </p>
        </div>
        <div className="w-3/5 max-lg:w-full">
          <Swiper
            slidesPerView={3}
            spaceBetween={50}
            // allowTouchMove={selected}
            effect={"cards"}
            cardsEffect={{
              slideShadows: false, // Ajoute ceci pour désactiver l'ombre des cartes
            }}
            grabCursor={true}
            modules={[Pagination]}
            centeredSlides={false}
            pagination={{
              clickable: true, // Active une pagination cliquable sur mobile
            }}
            className="h-full"
          >
            {displayHaircuts}
          </Swiper>
        </div>
      </div>

      <div className="flex w-11/12 items-start justify-between max-lg:h-2/4 max-lg:pt-2 max-sm:flex-col">
        <div className="flex h-full w-2/6 flex-col items-center justify-center rounded-lg bg-orange-300 p-3 max-sm:w-full">
          <div className="flex w-full justify-start">
            <FaQuoteLeft color="black" size={16} />
          </div>
          <div>
            <p className="text-black">
              It is always a pleasure to be treat by real professionals who know
              how execute exactly what you asked for !
            </p>
          </div>
          <div className="flex w-full justify-end">
            <FaQuoteRight color="black" size={16} />
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="italic text-black"> John.D</p>
            <div className="flex w-1/4">
              <BsArrowLeftCircle size={30} color="black" className="m-1 hover:cursor-pointer" />
              <BsArrowRightCircle size={30} color="black" className="m-1 hover:cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="w-2/4 max-sm:w-full">
          <h1 className="font-chakrapetch text-5xl font-bold uppercase text-black">
            Our prices
          </h1>
          <div className="mt-5 flex flex-col items-center max-sm:mt-1">
            {pricesDisplay}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
