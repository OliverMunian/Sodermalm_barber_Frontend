import "../../src/app/globals.css";
import Header from "@/app/components/Header";
import Footer from "./components/Footer";
import Link from "next/link";

function Custom404() {
  return (
    <div className="bg-barber-wallpaper min-h-screen bg-cover">
      <Header />
      <div className="flex flex-grow flex-col items-center justify-center h-screen ">
        <h1 className="font-chakrapetch text-3xl font-bold">404</h1>
        <p className="font-chakrapetch text-3xl font-bold">Page Not Found</p>
        <p className="text-sm ">
          Oops ! This page doesn't exist, press the button below to come back
        </p>
        <Link href="/">
          <div className="h-30 flex w-36 mt-2 items-center justify-center rounded-lg bg-orange-300 p-3 text-center hover:cursor-pointer hover:bg-orange-500">
            <p className="font-bold font-chakrapetch"> Go back to home</p>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Custom404;
