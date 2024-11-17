"use client";
import "../../src/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import style from "../../styles/Home.module.css";
import Header from "../app/components/Header";
// import Wallpaper from "../../public/Assets/barber_shop.jpg";
import Logo from "../../public/Assets/Logo_rectangle.png";
import "swiper/css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";

//icons
import { FaLockOpen } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

function Profiles() {
  const BACKEND_ADRESS = "http://localhost:4000";

  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [create, setCreate] = useState(false);

  function SignIn() {
    fetch(`${BACKEND_ADRESS}/users/signin`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email: mail, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          console.log("vous etes connecté");
          toast.success("You're connected to your profile !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          console.log("une erreur est survenue");
          toast.error(
            "Oops ! Impossible to connect, please verify your email and your password",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            },
          );
        }
      });
  }

  function SignUp(e) {
    e.preventDefault();
    fetch(`${BACKEND_ADRESS}/users/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: mail,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          toast.success("Your Profile has been created", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setCreate(false);
          setUsername("");
          setPassword("");
        } else {
          console.log("impossible de creer l'utilisateur");
          toast.error("Oops ! Impossible to create your profile", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  }
  return (
    <div>
      <Header />
      <ToastContainer />
      {!create && (
        <div
          className={style.imageBackground}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="flex w-3/6 flex-col items-center rounded-3xl bg-black p-6 max-lg:w-4/5">
            <div className="w-5/12 rounded-2xl border-2 border-black bg-black p-2">
              <Image src={Logo} alt="Logo_sodermalm" />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-center text-2xl italic text-white max-md:text-lg">
                Please login to access to your profile
              </h1>
              <form className="flex w-full flex-col items-center">
                <input
                  placeholder="Email"
                  type="email"
                  className="m-2 w-full rounded-xl p-4 text-black"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
                <input
                  placeholder="Password"
                  className="m-2 w-full rounded-xl p-4 text-black max-md:m-1"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>
              <p className="italic text-cyan-300 underline hover:cursor-pointer hover:text-cyan-600 max-md:text-lg">
                Forgotten password ?
              </p>
              <p
                className="italic text-cyan-300 underline hover:cursor-pointer hover:text-cyan-600 max-md:text-lg"
                onClick={() => setCreate(true)}
              >
                Create an account
              </p>
              <button
                className={`mt-4 flex w-6/12 justify-center rounded-xl p-4 ${mail && password ? "border-2 border-green-500 hover:bg-green-700" : "border-2 border-gray-400 hover:cursor-default"}`}
                onClick={(e) => {
                  e.preventDefault();
                  SignIn();
                }}
              >
                <p
                  className={`${mail && password ? "text-white" : "text-gray-400"}`}
                >
                  Connection
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
      {create && (
        <div
          className={style.imageBackground}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="relative mt-4 flex w-3/4 flex-col items-center overflow-hidden rounded-3xl p-10 max-lg:w-4/ max-md:mt-16">
            <div className={style.logoWallpaper}></div>

            <div className="flex max-md:flex-col max-md:items-center">
              <div className="flex w-1/3 items-center max-md:w-6/12 max-md:m-2">
                <Image
                  src={Logo}
                  alt="Logo_sodermalm"
                  className="rounded-xl bg-black p-4"
                />
              </div>

              <div className="mx-3 w-2/3 rounded-2xl border-2 border-gray-400 bg-white p-4 max-md:w-full">
                <h1 className="text-2xl font-semibold text-black max-md:text-lg">
                  Create your account
                </h1>
                <form className="flex w-full flex-col items-center">
                  <div className="w-full">
                    <p className="text-gray-400">Full Name:</p>
                    <div className="flex items-center border-2 px-2 text-gray-400">
                      <input
                        placeholder="Ex: John Doe"
                        type="text"
                        className="w-full p-2 text-black outline-none placeholder:text-gray-300 max-md:p-3"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <CgProfile />
                    </div>
                  </div>

                  <div className="w-full">
                    <p className="text-gray-400">Your Email:</p>
                    <div className="flex items-center border-2 px-2 text-gray-400">
                      <input
                        type="email"
                        className="w-full p-2 text-black outline-none placeholder:text-gray-300 max-md:p-3"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                      />
                      <MdAlternateEmail />
                    </div>
                  </div>

                  <div className="flex w-full flex-col text-gray-400">
                    <p className="text-gray-400">Your password:</p>
                    <div className="flex items-center border-2 px-2">
                      <input
                        type="Password"
                        className="w-full p-2 text-black outline-none placeholder:text-gray-300 max-md:p-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <FaLockOpen />
                    </div>
                  </div>
                </form>
                <div className="flex justify-between w-64">
                  <button
                    className='mt-4 flex justify-center rounded-xl border-2 border-red-500 p-3 hover:bg-red-700 hover:text-white text-red-500'
                    onClick={() => setCreate(false)}
                  >
                    <p>Cancel</p>

                  </button>
                  <button
                    className={`mt-4 flex justify-center rounded-xl p-3 ${username && mail && password ? "border-2 border-blue-500 bg-blue-500 hover:bg-blue-700" : "border-2 border-gray-400 hover:cursor-default"}`}
                    onClick={(e) => {
                      username && mail && password ? SignUp(e) : undefined;
                    }}
                  >
                    <p
                      className={`${mail && password ? "text-white" : "text-gray-400"}`}
                    >
                      Create account
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profiles;
