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

  function SignUp() {
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
          <div className="mt-4 flex w-3/6 flex-col items-center rounded-3xl bg-black p-6 max-lg:w-4/5">
            <div className="w-3/12 rounded-2xl border-2 border-black bg-black p-2 max-md:w-5/12">
              <Image src={Logo} alt="Logo_sodermalm" />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-center text-2xl italic text-white max-md:text-lg">
                Please complete the form to create an account
              </h1>
              <form className="flex w-full flex-col items-center">
                <input
                  placeholder="Username"
                  type="email"
                  className="m-2 w-full rounded-xl p-4 text-black max-md:p-3"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  placeholder="Email"
                  type="email"
                  className="m-2 w-full rounded-xl p-4 text-black max-md:p-3"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
                <input
                  placeholder="Password"
                  className="m-2 w-full rounded-xl p-4 text-black max-md:p-3"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>
              <p
                className="italic text-cyan-300 underline hover:cursor-pointer"
                onClick={() => setCreate(false)}
              >
                Back
              </p>
              <button
                className={`mt-4 flex w-6/12 justify-center rounded-xl p-4 ${username && mail && password ? "border-2 border-green-500 hover:bg-green-700" : "border-2 border-gray-400 hover:cursor-default"}`}
                onClick={(e) => {
                  e.preventDefault();
                  SignUp();
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
      )}
    </div>
  );
}

export default Profiles;
