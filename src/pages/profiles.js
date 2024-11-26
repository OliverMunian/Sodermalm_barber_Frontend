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

  // console.log(selectedDaysOff)

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
    console.log("log i : ", i);
    const isSelected = selectedDaysOff.includes(i);
    console.log("isSelected: ", isSelected);
    console.log("selectedDaysOff: ", selectedDaysOff);
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
    <div>
      <Header />
      <ToastContainer />
      {!create && !connected && (
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
                className={`max-sm:hover:none mt-4 flex w-6/12 justify-center rounded-xl p-4 ${mail && password ? "border-2 border-green-500 hover:bg-green-700" : "border-2 border-gray-400 hover:cursor-default"}`}
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
          <div className="max-lg:w-4/ relative mt-4 flex w-3/4 flex-col items-center overflow-hidden rounded-3xl p-10 max-md:mt-16">
            <div className={style.logoWallpaper}></div>

            <div className="flex max-md:flex-col max-md:items-center">
              <div className="flex w-1/3 items-center max-md:m-2 max-md:w-6/12">
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
                <div className="flex w-64 justify-between">
                  <button
                    className="mt-4 flex justify-center rounded-xl border-2 border-red-500 p-3 text-red-500 hover:bg-red-700 hover:text-white"
                    onClick={() => setCreate(false)}
                  >
                    <p>Cancel</p>
                  </button>
                  <button
                    className={`mt-4 flex justify-center rounded-xl p-3 ${username && mail && password ? "border-2 border-blue-500 bg-blue-500 hover:bg-blue-700" : "border-2 border-gray-400 text-zinc-400 hover:cursor-default"}`}
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

      {connected && (
        <div className="relative flex h-screen items-center justify-center overflow-hidden">
          <div className={style.logoWallpaper}></div>
          <div
            className="mt-2 h-full overflow-y-scroll rounded-2xl border-2 border-zinc-300"
            style={{ width: "90%", backgroundColor: "#141218" }}
          >
            <div className="flex flex-col items-center p-3">
              <div className="flex w-full items-center justify-around p-3 max-md:flex-col">
                <div className="w-40 max-md:m-2 max-md:w-2/5">
                  <Image
                    src={Logo}
                    alt="Logo_sodermalm"
                    className="rounded-xl bg-black p-4"
                  />
                </div>
                <div className="flex w-full items-center justify-between">
                  <div className="flex w-11/12 flex-col items-center justify-between">
                    <h1 className="text-center text-3xl font-bold text-white max-lg:text-xl">
                      Hello {username}
                    </h1>
                    <p className="max-lg:text-md text-center italic text-zinc-400">
                      Happy to see you again !
                    </p>
                    <button
                      className="mt-5 flex w-2/5 items-center justify-center rounded-2xl border-2 p-2"
                      onClick={() => LogOut()}
                    >
                      <h1>Disconnect</h1>
                      <VscDebugDisconnect className="ml-2" />
                    </button>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="flex h-32 w-32 flex-col items-center justify-center overflow-hidden rounded-full border-2 border-zinc-400 hover:cursor-pointer max-md:h-20 max-md:w-20"
                      onClick={() => fileInputRef.current.click()}
                    >
                      {imageSrc ? (
                        // Utilisation de ReactCrop pour l'aperçu et le découpage
                        <img
                          src={`${BACKEND_ADRESS}/assets${imageSrc}`}
                          alt="Profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <>
                          <MdAddAPhoto size={35} />
                          <p className="text-center text-sm italic text-white">
                            Add your profile picture
                          </p>
                        </>
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
