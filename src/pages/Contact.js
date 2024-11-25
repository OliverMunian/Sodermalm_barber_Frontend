import styles from "../../styles/Home.module.css";
import "../../src/app/globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
//images
import Logo from "../../public/Assets/Logo.png";
import Wallpaper from "../../public/Assets/wallpaper.jpg";
//icons
import { BiMailSend } from "react-icons/bi";

function Contact() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const BACKEND_ADRESS = "https://sodermalm-baber-backend.vercel.app";

  const fields = [name, lastName, email, text];

  function Submit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      fetch(`${BACKEND_ADRESS}/send-email`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: subject,
          text: text,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            toast.success("Your message has been sent !", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setName("");
            setLastName("");
            setEmail("");
            setSubject("");
            setText("");
          } else {
            toast.error("Oops! An error occurred, please try again", {
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
    } else {
      toast.error("Oops! Your email is invalid !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setEmail("");
    }
  }
  return (
    <div>
      <ToastContainer />
      <Header />
      <div className="relative h-screen">
        <div className={styles.imageBackground}></div>
        <div className="flex h-full items-center justify-center">
          <div className="relative flex h-5/6 w-4/6 items-center justify-around rounded-xl p-3 max-lg:overflow-y-scroll max-md:h-full max-md:w-full max-md:flex-col">
            <div className="bg-custom-wallpaper absolute top-0 flex items-center justify-center rounded-lg p-5 max-lg:flex-col">
              <div className="m-2 flex w-2/5 flex-col rounded-xl p-4 backdrop-blur-lg max-lg:w-11/12">
                <div className="flex items-center justify-around max-xl:flex-col">
                  <div className="w-2/4 items-center overflow-hidden rounded-2xl">
                    <Image src={Logo} />
                  </div>
                  <h1 className="text-lg font-semibold italic text-black underline max-xl:text-sm">
                    CONTACT US
                  </h1>{" "}
                  <BiMailSend className="ml-1" color="black" size={25} />
                </div>
                <p className="mt-3 italic text-black max-xl:text-center max-xl:text-sm">
                  You need an specific information ? <br />
                  If you have any questions or specific requests regarding this
                  form, please don’t hesitate to reach out to us. We’re here to
                  assist you and ensure your request is processed smoothly. You
                  can contact us via phone, or use the comment section at the
                  end of the form to provide details about your inquiry.
                </p>
              </div>

              <div className="flex w-3/5 flex-col items-center justify-center rounded-xl border-2 border-zinc-500 bg-zinc-300 p-3 max-lg:w-11/12">
                <h1 className="font-semibold italic text-black max-md:text-sm">
                  Please complete the following information in the form below
                </h1>
                <form className="flex w-full flex-col">
                  <input
                    className="m-2 rounded-lg p-2 text-black outline-none"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="m-2 rounded-lg p-2 text-black outline-none"
                    placeholder="Lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input
                    className="m-2 rounded-lg p-2 text-black outline-none"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <input
                    className="m-2 rounded-lg p-2 text-black outline-none"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <textarea
                    className="m-2 rounded-lg p-2 text-black outline-none"
                    placeholder="Enter your message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </form>
                <button
                  className={`w-3/6 rounded-xl border-2 p-2 font-semibold ${fields.every((value) => value !== "") ? "border-green-800 bg-green-500 text-white hover:cursor-pointer hover:bg-green-800" : "border-gray hover:cursor-default"}`}
                  onClick={() =>
                    fields.every((value) => value !== "") && Submit()
                  }
                >
                  Submit
                </button>
              </div>
            </div>

            {/* <div className="flex w-2/5 flex-col p-4 backdrop-blur-lg rounded-xl max-md:w-11/12">
              <div className="flex items-center justify-around max-xl:flex-col">
                <div className="w-2/4 items-center overflow-hidden rounded-2xl">
                  <Image src={Logo} />
                </div>
                <h1 className="text-lg font-semibold italic text-black underline max-xl:text-sm">
                  CONTACT US 
                </h1>{" "}
                <BiMailSend className="ml-1 " color='black' size={25}/>
              </div>
              <p className="italic text-black mt-3 max-xl:text-center max-xl:text-sm">
                You need an specific information ? <br />
                If you have any questions or specific requests regarding this
                form, please don’t hesitate to reach out to us. We’re here to
                assist you and ensure your request is processed smoothly. You
                can contact us via phone, or use the comment section at the end
                of the form to provide details about your inquiry.
              </p>
            </div>

            <div className="flex w-3/5 flex-col items-center justify-center rounded-xl border-2 border-zinc-500 bg-zinc-300 p-3 max-md:w-11/12">
              <h1 className="font-semibold italic text-black max-md:text-sm">
                Please complete the following information in the form below
              </h1>
              <form className="flex w-full flex-col">
                <input
                  className="m-2 rounded-lg p-2 text-black outline-none"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="m-2 rounded-lg p-2 text-black outline-none"
                  placeholder="Lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  className="m-2 rounded-lg p-2 text-black outline-none"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  className="m-2 rounded-lg p-2 text-black outline-none"
                  placeholder="Enter your message"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </form>
              <button
                className={`w-3/6 rounded-xl border-2 p-2 font-semibold ${fields.every((value) => value !== "") ? "border-green-800 bg-green-500 text-white hover:bg-green-800" : "border-gray"}`}
              >
                Submit
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
