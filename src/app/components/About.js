import styles from "../../../styles/Home.module.css";
// import "../../app/global.css";
import { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import Image from "next/image";

import Footer from "@/app/components/Footer";
import Logo from "../../../public/Assets/Logo_rectangle.png";
import SL from "../../../public/Assets/SL_logo.png";
//icons
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";

const containerStyle = {
  width: "300px",
  height: "300px",
};

const center = {
  lat: 59.3108277,
  lng: 18.0758558,
};

const infosSaloon = [
  {
    icon: (
      <FaLocationDot
        color="black"
        className="text-5xl max-xl:text-4xl max-md:text-2xl"
      />
    ),
    title: "Location",
    description: (
      <>
        Blekingegatan 59, <br />
        11662 Stockholm
      </>
    ),
  },
  {
    icon: (
      <FaPhoneAlt
        color="black"
        className="text-5xl max-xl:text-4xl max-md:text-2xl"
      />
    ),
    title: "+4670-041 98 19",
    description: (
      <>
        Monday-Saturday: 10:00-20:00, <br />
        Sunday: 11:00-19:00
      </>
    ),
  },
  {
    icon: (
      <FaTrainSubway
        color="black"
        className="text-5xl max-xl:text-4xl max-md:text-2xl"
      />
    ),
    title: "Subway",
    description: "Skanstull",
    image: SL,
  },
];

const displayInfosSaloon = infosSaloon.map((element, i) => {
  if (element.image) {
    return (
      <div key={i} className="flex h-1/3 w-10/12 items-center justify-around max-md:flex-col max-md:h-full">
        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-white max-lg:h-20 max-lg:w-20 max-md:h-16 max-md:w-16">
          {element.icon}
        </div>
        <div className="ml-2 flex w-8/12 flex-col items-start justify-center max-md:w-full max-md:items-center">
          <h1 className="mb-3 text-3xl font-semibold max-xl:text-2xl font-chakrapetch">
            {element.title}{" "}
          </h1>
          <div className="flex items-center">
            <div className="mr-2 h-10 w-10 max-md:h-7 max-md:w-7">
              <Image src={element.image} alt="Logo_SL" />
            </div>
            <p className="text-sm uppercase">{element.description}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      key={i}
      className="flex h-1/3 w-10/12 items-center justify-around max-md:flex-col max-md:h-full border-b-2 border-gray-500"
      style={{ borderBottom: "0.75px grey solid" }}
    >
      <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-white max-lg:h-20 max-lg:w-20 max-md:h-16 max-md:w-16">
        {element.icon}
      </div>
      <div className="ml-2 flex w-8/12 flex-col items-start justify-center max-md:w-full max-md:items-center">
        <h1 className="max-md:text-md mb-3 text-3xl font-semibold max-xl:text-2xl max-lg:text-xl font-chakrapetch">
          {element.title}
        </h1>
        <p className="text-sm max-md:text-xs max-md:text-center">{element.description}</p>
      </div>
    </div>
  );
});

function About() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
    version: "weekly", // Remplacez par votre clé API valide
    libraries: ["places"], // Si vous avez besoin de bibliothèques supplémentaires comme 'places'
  });

  const [map, setMap] = useState(null);

  const place = {
    name: "Södermalms Barbershop",
    address: "Blekingegatan 59, 116 62 Stockholm",
    latitude: 59.3108277,
    longitude: 18.0758558,
  };

  const darkModeStyles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#484848",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
  ];

  const onLoad = useCallback((map) => {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return <p>Error loading Google Maps. Check the API key or permissions.</p>;
  }

  if (!isLoaded) {
    return <p>Loading...</p>; // Gestion du chargement
  }

  return (
    <div
      className="flex h-screen w-full max-lg:flex-col"
      style={{ backgroundColor: "#47403c" }}
    >
      <div className="flex w-1/3 items-center justify-center max-lg:mt-10 max-lg:h-2/4 max-lg:w-full max-lg:justify-around">
        <div className="flex h-full w-11/12 flex-col items-center justify-around">
          <h1 className="text-5xl uppercase text-white font-chakrapetch font-bold">
            Discover the path to a unique experience{" "}
          </h1>
          <p className="text-white max-md:text-sm">
            Whether you're in the heart of the city or nearby, reaching our
            salon is quick and easy. Conveniently located in the city center, we
            are ready to welcome you. Follow our directions, and let us guide
            you to the destination where style and well-being meet. See you
            soon!
          </p>
          <div className="flex w-full items-center justify-start">
            <button className="rounded-lg bg-orange-300 p-3 font-bold text-black hover:bg-orange-500">
              Take a look
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-2/3 max-lg:h-2/4 max-lg:w-full max-md:flex-col max-md:items-center max-md:justify-center">
        <div className="flex w-1/2 items-center justify-center max-md:w-full max-md:h-full">
          <div className="relative h-4/6 w-8/12 overflow-hidden rounded-3xl max-md:h-5/6 max-md:w-10/12">
            <GoogleMap
              mapContainerClassName="absolute inset-0"
              center={center}
              zoom={11}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                styles: darkModeStyles, // Applique le style sombre
                disableDefaultUI: true, // Retire les contrôles par défaut (zoom, type de carte, etc.)
              }}
            >
              <MarkerF
                position={{ lat: place.latitude, lng: place.longitude }}
              />
            </GoogleMap>
            <div className="absolute h-full w-full bg-orange-300 opacity-10"></div>
          </div>
        </div>

        <div className="flex w-1/2 items-center md:flex-col max-md:w-full">
          {displayInfosSaloon}
        </div>
      </div>

      {/* <div className="relative h-screen">
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex w-3/5 flex-col items-center justify-center rounded-2xl border-2 border-white p-4 max-md:w-10/12">

            <div className="flex flex-col items-center justify-center bg-neutral-50 rounded-xl p-3 m-2">
              <div className="flex items-center max-sm:items-start">
                <IoLocation color="black" className="mr-2 max-sm:mr-0" size={30} />
                <p className="text-xl text-black max-sm:text-center max-sm:text-md">
                  Blekingegatan 59, 116 62 Stockholm
                </p>
              </div>
              <div className="mt-2 flex items-center justify-center">
                <div className="w-2/12 rounded-full" style={{ width: "7%" }}>
                  <Image
                    src={SL}
                    className="rounded-full"
                    alt="SL_logo_tunnelbanan"
                  />
                </div>
                <h2 className="ml-2 text-xl font-semibold text-black max-md:text-sm">
                  SKANSTULL
                </h2>
              </div>
              <div className="mt-2 flex items-center justify-center">
                <FaPhoneAlt size={20} color={"black"} />
                <p className="ml-2 text-xl text-black max-md:text-sm">
                  070-041 98 19
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h1 className="font-semibold uppercase text-black underline">
                  Our opening hours
                </h1>
                <div className="flex italic text-black max-sm:flex-col max-sm:items-center">
                  <h3>Monday until Saturday :</h3>
                  <p className="ml-1 text-black">10:00 - 20:00</p>
                </div>
                <div className="flex italic text-black">
                  <h3>Sunday :</h3>
                  <p className="ml-1">11:00 - 19:00</p>
                </div>
              </div>
            </div>

            <div className="relative h-52 w-full overflow-hidden rounded-3xl md:h-88 lg:h-[300px]">
              <GoogleMap
                mapContainerClassName="absolute inset-0"
                center={center}
                zoom={11}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                  styles: darkModeStyles, // Applique le style sombre
                  disableDefaultUI: true, // Retire les contrôles par défaut (zoom, type de carte, etc.)
                }}
              >
                <MarkerF
                  position={{ lat: place.latitude, lng: place.longitude }}
                />
              </GoogleMap>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default About;
