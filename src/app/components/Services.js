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
      <div key={i} className="flex w-full justify-between my-1 py-2" style={{borderBottom: i === 3 ? '': '0.75px solid grey'}}>
        <h1 className="uppercase text-black text-lg">{element.service}</h1>
        <p className="uppercase text-black text-lg">{element.price}</p>
      </div>
    );
  });

  const displayHaircuts = haircuts.map((haircut, i) => {
    return (
      <SwiperSlide key={i}>
        <div className="flex h-full flex-col rounded-lg overflow-hidden">
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
    <div className="flex h-screen w-full flex-col items-center justify-around bg-orange-100 border-blue-500 border-2 py-5">
      <div className="flex justify-between w-11/12 max-lg:flex-col border-red-500 border-2">


        <div className="flex flex-col w-1/4 max-lg:w-full max-xl:w-2/4">
          <h1 className="font-chakrapetch text-5xl font-bold uppercase text-black">
            DISCOVER OUR WORK
          </h1>
          <p className="mt-14 text-sm text-black max-lg:mt-4">
            Every cut is a work of art, and every detail matters. With refined
            techniques and premium products, we enhance your style while staying
            true to your personality.
          </p>
        </div>
        <div className="w-3/5 max-lg:w-full border-2 border-cyan-500">
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




      <div className="flex w-11/12 items-start justify-between border-2 border-purple-500 max-lg:h-2/4">
        <div className="flex items-center justify-center h-full w-2/5">
          <div className="size-64 bg-orange-300 rounded-xl max-lg:size-60">

          </div>
        </div>

        <div className="w-2/4">
          <h1 className="font-chakrapetch text-5xl font-bold uppercase text-black">
            Our prices
          </h1>
          <div className="flex flex-col items-center mt-5">{pricesDisplay}</div>
        </div>
      </div>
    </div>
  );
}

export default Services;
