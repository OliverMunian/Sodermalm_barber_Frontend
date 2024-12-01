"use client";
import "../../src/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import style from "../../styles/Home.module.css";
import Header from "../app/components/Header";
// import Wallpaper from "../../public/Assets/barber_shop.jpg";
import Logo from "../../public/Assets/Logo_rectangle.png";
import "swiper/css";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import Calendar from "@/app/components/Calendar";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

//icons
import { FaLockOpen } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { ImScissors } from "react-icons/im";
import { MdAddAPhoto } from "react-icons/md";
import { VscDebugDisconnect } from "react-icons/vsc";

function Profiles() {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 });
  const BACKEND_ADRESS = "http://localhost:4000";
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [create, setCreate] = useState(false);
  const [connected, setConnected] = useState(false);
  const [appointment, setAppointment] = useState([]);
  const [selectedDaysOff, setSelectedDaysOff] = useState([]);
  const daysOff = ["SÖ", "MÅ", "TI", "ON", "TO", "FR", "LÖ"];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const isConnected = localStorage.getItem("isConnected");
    const savedUsername = localStorage.getItem("username");
    const saveId = localStorage.getItem("id");
    const saveImg = localStorage.getItem("url");
    const savedDaysOff = localStorage.getItem("daysOff");
    if (isConnected === "true") {
      setConnected(true);
      setUsername(savedUsername);
      setId(saveId);
      setImageSrc(saveImg);
      if (savedDaysOff) {
        try {
          setSelectedDaysOff(JSON.parse(savedDaysOff));
        } catch {
          setSelectedDaysOff([]);
        }
      }
      if (id) {
        fetch(`${BACKEND_ADRESS}/bookings/all/${id}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              const customersApts = [data.data];
              setAppointment((prev) => {
                const newAppointments = customersApts.filter(
                  (newItem) => !prev.some((item) => item._id === newItem._id),
                );
                return [...prev, ...newAppointments];
              });
            } else {
              console.log("Une erreur est survenue");
            }
          });
      }
    }
  }, [id]);

  function LogOut() {
    setConnected(false);
    setUsername("");
    setId("");
    setSelectedDaysOff([]);
    setImageSrc(null);
    setAppointment([]);
    localStorage.clear();
  }

  function SignIn() {
    fetch(`${BACKEND_ADRESS}/users/signin`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email: mail, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
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
          setConnected(true);
          setUsername(data.data.username);
          setImageSrc(data.data.profilePicture);
          setId(data.data._id);
          localStorage.setItem("isConnected", "true");
          localStorage.setItem("username", data.data.username);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("id", data.data._id);
          localStorage.setItem("url", data.data.profilePicture);
          if (data.data.daysOff) {
            setSelectedDaysOff([data.data.daysOff]);
            localStorage.setItem("daysOff", data.data.daysOff);
          }
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
    if (!emailRegex.test(mail)) {
      toast.error("Your email is not correct", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setMail("");
    } else {
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
            setMail("");
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
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);

      fetch(`${BACKEND_ADRESS}/users/${id}/profile-photo`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log("Photo uploaded successfully:", data.profilePicture);
            setImageSrc(data.profilePicture);
            localStorage.setItem("url", data.profilePicture);
          } else {
            console.error("Failed to upload photo:", data.message);
          }
        })
        .catch((error) => {
          console.error("Upload error:", error);
        });
    }
  };

  function toggleDaysOff(index) {
    setSelectedDaysOff((prev) => {
      const updatedDaysOff = prev.includes(index)
        ? prev.filter((day) => day !== index) // Retire l'index si déjà présent
        : [...prev, index]; // Ajoute l'index s'il n'est pas présent
      return updatedDaysOff;
    });
  }

  function updateDaysOff() {
    fetch(`${BACKEND_ADRESS}/users/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ daysOff: selectedDaysOff }),
    })
      .then((response) => response.json())
      .then((dataDaysOff) => {
        console.log(dataDaysOff);
        if (dataDaysOff.result) {
          localStorage.removeItem("daysOff");
          localStorage.setItem("daysOff", JSON.stringify(selectedDaysOff));
          toast.success("Your days off has been updated !", {
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
          toast.error("Oops ! Impossible to update your days off", {
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

  const dayOffDisplay = daysOff.map((days, i) => {
    const isSelected = selectedDaysOff.includes(i);
    return (
      <div
        key={i}
        className={`mx-2 flex h-10 w-10 items-center justify-center rounded-full border-2 p-2 hover:cursor-pointer ${isSelected ? "bg-white" : "bg-transparent"}`}
        onClick={() => toggleDaysOff(i)}
      >
        <h1 style={{ color: isSelected ? "#141218" : "white" }}>{days}</h1>
      </div>
    );
  });

  return (
    <div className="bg-barber-wallpaper flex h-screen flex-col bg-cover">
      <Header />
      <ToastContainer />
      {!create && !connected && (
        <div className="flex h-full w-full px-3 max-lg:flex-col-reverse max-lg:items-end max-lg:justify-center">
          <div className="flex w-3/4 flex-col items-center justify-center p-6 max-lg:w-full">
            <div className="flex w-3/4 flex-col items-center">
              <h1 className="text-center text-sm italic text-white">
                Please login to access to your profile
              </h1>

              <form className="flex w-full flex-col items-center">
                <input
                  placeholder="Email"
                  type="email"
                  className="m-2 w-full rounded-xl border-2 border-white p-4 text-black shadow-xl outline-none"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
                <input
                  placeholder="Password"
                  className="m-2 w-full rounded-xl border-2 border-white p-4 text-black shadow-xl outline-none"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>
              <p className="italic text-orange-300 underline hover:cursor-pointer hover:text-orange-500 max-md:text-lg">
                Forgotten password ?
              </p>
              <p
                className="italic text-orange-300 underline hover:cursor-pointer hover:text-orange-500 max-md:text-lg"
                onClick={() => setCreate(true)}
              >
                Create an account
              </p>
              <button
                className={`max-sm:hover:none mt-4 flex w-6/12 justify-center rounded-xl p-4 ${mail && password ? "bg-green-500 hover:bg-green-800" : "border-2 border-gray-400 hover:cursor-default"}`}
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

          <div className="flex items-end justify-end">
            <h1 className="font-chakrapetch text-right text-6xl font-bold uppercase text-white max-lg:text-5xl">
              Welcome Back to Your Barber Space
            </h1>
          </div>
        </div>
      )}

      {create && (
        <div className="flex h-full w-full px-3 max-lg:flex-col-reverse max-lg:items-end max-lg:justify-center">
          <div className="flex w-3/4 flex-col items-center justify-center max-lg:w-full">
            <div className="w-2/3 max-md:w-full">
              <h1 className="text-center text-sm italic text-white max-md:text-lg">
                Complete informations below
              </h1>

              <form className="flex w-full flex-col items-center">
                <input
                  placeholder="Your name"
                  type="text"
                  className="m-2 w-full rounded-xl p-4 text-black shadow-xl outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="m-2 w-full rounded-xl p-4 text-black shadow-xl outline-none"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
                <input
                  type="Password"
                  placeholder="Your password"
                  className="m-2 w-full rounded-xl p-4 text-black shadow-xl outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>

              <div className="flex w-64 justify-between">
                <button
                  className="flex justify-center rounded-xl bg-orange-300 p-3 text-white hover:bg-orange-500"
                  onClick={() => setCreate(false)}
                >
                  <p>Cancel</p>
                </button>
                <button
                  className={`flex justify-center rounded-xl p-3 ${username && mail && password ? "bg-green-500 hover:bg-green-700" : "border-2 border-gray-400 text-zinc-400 hover:cursor-default"}`}
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
          <div className="flex items-end justify-end">
            <h1 className="font-chakrapetch text-right text-6xl font-bold uppercase text-white max-lg:text-5xl">
              Welcome in the barber team
            </h1>
          </div>
        </div>
      )}

      {connected && (
        <div className="relative flex h-screen items-center justify-center overflow-hidden">
          <div
            className="mt-2 h-5/6 overflow-y-scroll rounded-2xl border-2 border-zinc-300 w-11/12"
            style={{backgroundColor: "#141218" }}
          >
            <div className="flex flex-col items-center p-3">
              <div className="flex w-full items-center justify-around p-3 max-md:flex-col">
                <div className="flex w-full items-center justify-between">
                  <div className="flex w-11/12 flex-col items-center justify-between">
                    <h1 className="text-center text-6xl font-bold text-white">
                      Hello {username}
                    </h1>
                    <p className="max-lg:text-md text-center italic text-zinc-400">
                      Happy to see you again !
                    </p>
                    <button
                      className="flex w-2/5 items-center justify-center rounded-2xl bg-orange-300 p-3 hover:bg-orange-500"
                      onClick={() => LogOut()}
                    >
                      <h1 className="font-bold">Disconnect</h1>
                    </button>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-zinc-400 hover:cursor-pointer max-md:h-20 max-md:w-20"
                      onClick={() => fileInputRef.current.click()}
                    >
                      {!imageSrc ? (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-black p-3">
                          <MdAddAPhoto size={25} />
                          <p className="text-center text-xs italic text-white">
                            Add your profile picture
                          </p>
                        </div>
                      ) : (
                        <img
                          src={`${BACKEND_ADRESS}/assets${imageSrc}`}
                          alt="picture_profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          className="bg-orange-300 text-transparent"
                        />
                      )}
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex w-full items-center">
                <div className="w-full border-b-2 border-dotted border-zinc-400"></div>
                <ImScissors size={50} color={"gray"} />
                <div className="w-full border-b-2 border-dotted border-gray-500"></div>
              </div>
            </div>

            <div className="p-2">
              <div className="flex justify-around max-lg:flex-col">
                <div className="my-2 flex flex-col items-center justify-center">
                  <h1 className="text-xl text-white">Select your days off</h1>
                  <div className="my-3 flex">{dayOffDisplay}</div>

                  <button
                    className="rounded-xl border-2 p-3"
                    onClick={() => updateDaysOff()}
                  >
                    Update
                  </button>
                </div>
                <div className="my-2 flex flex-col items-center justify-center">
                  <h1 className="text-xl text-white">
                    Select your lunch break
                  </h1>
                  <div className="my-3 flex">{dayOffDisplay}</div>

                  <button
                    className="rounded-xl border-2 p-3"
                    onClick={() => updateDaysOff()}
                  >
                    Update
                  </button>
                </div>
              </div>
              <div>
                <Calendar event={appointment} />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default Profiles;
