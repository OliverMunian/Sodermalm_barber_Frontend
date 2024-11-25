import styles from "../../styles/Home.module.css";
import "../../src/app/globals.css";
import { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import Image from "next/image";
import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Logo from "../../public/Assets/Logo_rectangle.png";
import SL from "../../public/Assets/SL_logo.png";

const containerStyle = {
  width: "300px",
  height: "300px",
};

const center = {
  lat: 59.3108277,
  lng: 18.0758558,
};

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
    <div>
      <Header />
      <div className="relative h-screen">
        <div className={styles.imageBackground}></div>
        <div className="flex h-screen w-full items-center justify-center">
          <div className="bg-custom-wallpaper flex w-3/5 flex-col items-center justify-center rounded-2xl border-2 border-white p-4 max-md:w-10/12">
            <div className="w-2/5 overflow-hidden rounded-lg bg-black p-3">
              <Image src={Logo} alt="Logo" />
            </div>

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
      </div>
      <Footer />
    </div>
  );
}

export default About;
