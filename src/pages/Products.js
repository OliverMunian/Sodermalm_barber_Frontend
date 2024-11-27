import styles from "../../styles/Home.module.css";
import "../../src/app/globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
//icons
import { FaClockRotateLeft } from "react-icons/fa6";
import { RiToolsFill } from "react-icons/ri";


function Products() {
  return (
    <div>
      <Header />
      <div className="bg-custom-wallpaper flex h-screen items-center justify-center">
        <div className="flex w-9/12 flex-col items-center justify-center rounded-2xl border-2 border-zinc-500 bg-zinc-300 p-2">
          <div className="flex items-center ">
            <RiToolsFill className="mr-2 text-2xl" color="black"/>
          <h1 className="text-center text-3xl font-semibold italic text-black">
            Our Products Will Be Available Soon!
          </h1>
          <FaClockRotateLeft className="ml-2 text-2xl" color="black"/>
          </div>
          <p className="text-center text-black mt-3">
            We are excited to share our carefully crafted products with you, but
            they are not yet available for purchase. <br /> We are committed to
            bringing you exceptional quality and ensuring your complete
            satisfaction. <br /> Stay tuned—our products will be launching soon,
            and we can’t wait to serve you!
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Products;
