import styles from "../../styles/Home.module.css";
import "../../src/app/globals.css";
import Header from "@/app/components/Header";
import Logo from "../../public/Assets/Logo_rectangle.png";
import SL from "../../public/Assets/SL_logo.png";
import Image from "next/image";

function About() {
  return (
    <div>
      <Header />
      <div className="relative h-screen">
        <div className={styles.imageBackground}></div>
        <div className="flex w-full items-center justify-center">
          <div className="flex justify-center items-center w-2/5 backdrop-blur border-2 border-white rounded-2xl">
            <div className="w-2/5 overflow-hidden rounded-lg p-3 backdrop-blur">
              <Image src={Logo} />
            </div>
            
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
