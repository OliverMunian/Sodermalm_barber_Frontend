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

  const textHTML = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>Message has been received !</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f4f4f9;
        }
        .email-container {
          background: black;
          padding: 20px;
          border-radius: 8px;
          max-width: 600px;
          margin: 0 auto;
          color: "white";
        }
        h1 {
          color: #ffffff;
        }
        p {
          font-size: 16px;
          line-height: 1.5;
          color: #ffffff;
        }
        .logo {
          max-width: 250px;
          margin-bottom: 20px;
        }
        .footer {
          font-size: 12px;
          text-align: center;
          margin-top: 5px;
          color: #aaa;
        }
      </style>
    </head>
    <body style="background-color: #f4f4f9">
      <div class="email-container" style="background-color: black">
      <div style="display: flex; justify-content: center">
      <a href="https://sodermalm-baber-backend.vercel.app /">
        <img class="logo" src="https://i.imgur.com/oij0l9R.png" alt="Logo" />
      </a>
    </div>
        <h1 style="color: white">Your message has been received !</h1>
        <p>Hello ${name},</p>
        <p>
         We received your messsage, our team is going to give you an answer as soon as possible.
        </p>
        <p>Thank you.</p>

        <p>Best regards,</p>

        <p style="font-style:italic">Sodermalm Barbershop</p>
  
        <p class="footer">
          Blekingegatan 59, 116 62 Stockholm - Skanstull
        </p>
        <p class="footer">Phone number: +4670-041 98 19</p>
        <p class="footer">© Sodermalm Barbershop</p>
      </div>
    </body>
  </html>  
`;

  function Submit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      fetch(`${BACKEND_ADRESS}/send-email`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "Sodermalm Barbershop - Contact",
          html: textHTML,
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
<div className="flex flex-col min-h-screen bg-barber-wallpaper bg-cover">
  <ToastContainer/>
  {/* Header */}
  <Header />

  {/* Contenu principal qui prend l'espace restant */}
  <div className="flex-grow flex items-end justify-center max-md:flex-col">
    <div className="flex w-2/4 flex-col items-center justify-center rounded-xl p-3 max-xl:w-full">
      <h1 className="text-center font-semibold italic text-white max-md:text-sm">
        Please complete the following information in the form below
      </h1>
      <form className="flex w-10/12 flex-col max-xl:w-11/12 max-md:w-9/12">
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
        className={`w-3/6 rounded-xl p-2 font-semibold ${
          fields.every((value) => value !== "")
            ? "bg-green-500 text-white hover:cursor-pointer hover:bg-green-800"
            : "border-2 border-gray-400 text-gray-400 hover:cursor-default"
        }`}
        onClick={() => fields.every((value) => value !== "") && Submit()}
      >
        Submit
      </button>
    </div>
    <div className="flex flex-col items-end justify-end p-3">
      <h1 className="font-chakrapetch text-right text-6xl max-md:text-5xl font-bold uppercase">
        Get in touch with your barber
      </h1>
      <div className="w-2/4 max-lg:w-3/4 ">
        <p className="mt-3 text-right italic text-white max-xl:text-sm max-md:text-xs">
          You need specific information? <br />
          If you have any questions or specific requests regarding this form,
          please don’t hesitate to reach out to us. We’re here to assist you and
          ensure your request is processed smoothly.
        </p>
      </div>
    </div>
  </div>

  {/* Footer */}
  <Footer />
</div>

  );
}

export default Contact;
