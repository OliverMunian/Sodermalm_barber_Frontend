import styles from "../../../styles/Home.module.css";
import Image from "next/image";
import Logo from "../../../public/Assets/Logo_round.png";
import { useState } from "react";
import { MdEventAvailable } from "react-icons/md";
import { motion } from "framer-motion";
import Link from "next/link";

function Header() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [book, setBook] = useState(false);

  const array = [
    { title: "Home", link: "" },
    { title: "About us", link: "About" },
    { image: Logo, alt: "Background_barber_saloon" },
    { title: "Products", link: "Products" },
    { title: "Contact", link: "Contact" },
    // { button: "Book appointment" },
  ];
  const displayMenu = array.map((data, i) => {
    if (data.image) {
      return (
        <div key={i}>
          <Image src={Logo} width={80} height={80} alt={data.alt} />
        </div>
      );
    }

    // if (data.button) {
    //   return (
    //     <div
    //       key={i}
    //       className="relative cursor-pointer overflow-hidden text-2xl text-white"
    //       onMouseOver={() => setBook(true)}
    //       onMouseLeave={() => setBook(false)}
    //       style={{ borderRadius: "50px" }}
    //     >
    //       <motion.div
    //         style={{
    //           width: "30px",
    //           height: "30px",
    //           borderRadius: "50%",
    //           position: "absolute",
    //           left: "10px",
    //           top: "10px",
    //         }}
    //         animate={{
    //           scale: book ? 20 : 1,
    //           backgroundColor: book ? "white" : "black",
    //         }}
    //         transition={{
    //           ease: "easeIn",
    //           duration: 0.5,
    //         }}
    //       ></motion.div>

    //       <button
    //         className="shadow-black-500/50 flex items-center p-3 shadow-lg hover:cursor-pointer"
    //         style={{ border: "2px solid white", borderRadius: "50px" }}
    //       >
    //         <div
    //           className="rounded-full bg-zinc-500 p-2"
    //           style={{
    //             backgroundColor: book ? "black" : "",
    //             zIndex: 1,
    //           }}
    //         >
    //           <MdEventAvailable color={"white"} />
    //         </div>
    //         <h2
    //           className="ml-2 font-extralight"
    //           style={{
    //             color: book ? "black" : "white",
    //             fontWeight: book ? "550" : "",
    //             zIndex: 2,
    //           }}
    //         >
    //           Book appointment
    //         </h2>
    //       </button>
    //     </div>
    //   );
    // }

    return (
      <div
        key={i}
        className="cursor-pointer text-2xl text-white"
        onMouseOver={() => setHoverIndex(i)}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <Link href={`/${data.link}`}>
          <h2
            className="text-base font-light sm:text-xl md:text-2xl"
            style={{
              textDecoration:
                hoverIndex == i ? "underline white solid" : "none",
              textDecorationThickness: "0.25px",
              textUnderlineOffset: "10px",
            }}
          >
            {data.title}
          </h2>
        </Link>
      </div>
    );
  });

  return (
    <div className="flex w-full justify-center bg-black p-4 font-sans">
      <div className="flex w-full items-center justify-around">
        {displayMenu}
      </div>
    </div>
  );
}

export default Header;
