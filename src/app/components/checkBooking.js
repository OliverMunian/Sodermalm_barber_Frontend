import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { toast } from "react-toastify";
import styles from "../../../styles/Home.module.css";
import { useState } from "react";
//icons
import { FaCheck } from "react-icons/fa6";

function checkBooking(props) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [booking, setBooking] = useState({
    barber: null,
    barberPicture: null,
    day: null,
    schedule: null,
    customerName: null,
    customerLastName: null,
    numberBooking: null,
    customerMail: null,
  });
  const [display, setDispay] = useState(false);
  const BACKEND_ADRESS = "https://sodermalm-baber-backend.vercel.app";

  function Verify() {
    if (input.length < 6 || input == "") {
      setError("Your reservation should contains 6 caracters");
    } else {
      setError("");
      fetch(`${BACKEND_ADRESS}/bookings/${input}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            const bookingData = data.data;
            setBooking((prev) => ({
              ...prev,
              day: bookingData.day,
              schedule: bookingData.schedule,
              customerName: bookingData.name,
              customerLastName: bookingData.lastname,
              numberBooking: bookingData.reservationNumber,
              customerMail: bookingData.email,
            }));
            fetch(`${BACKEND_ADRESS}/users/${data.data.barber}`, {
              method: "GET",
              headers: { "Content-type": "application/json" },
            })
              .then((response) => response.json())
              .then((userData) => {
                if (userData) {
                  console.log("userData: ", userData);
                  setBooking((prev) => ({
                    ...prev,
                    barber: userData.data.username,
                    barberPicture: `${BACKEND_ADRESS}/assets${userData.data.profilePicture}`,
                  }));
                  setDispay(true);
                }
              });
          } else {
            console.log("Aucun resultat");
            setError("Your reservation doesn't exist !");
          }
        });
    }
  }

  function Clear() {
    setBooking((prev) => ({
      ...prev,
      barber: null,
      barberPicture: null,
      day: null,
      schedule: null,
      customerName: null,
      customerLastName: null,
      numberBooking: null,
      customerMail: null,
    }));
    setDispay(false);
    setInput("");
  }

  function CancelBooking() {
    fetch(`${BACKEND_ADRESS}/bookings/cancel/${booking.numberBooking}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          fetch(`${BACKEND_ADRESS}/send-email`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              to: booking.customerMail,
              subject: `Sodermalm Barbershop - Cancel reservation ${booking.numberBooking}`,
              html: textHTML,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                toast.success(
                  "Booking has been cancelled! You will receive a confirmation on your email box",
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
                Clear();
              }
            });
        } else {
          toast.error("Oops ! An error occured, please try again", {
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

  const textHTML = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>Reservation cancelled</title>
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
          color: #ffffff;
        }
        .logo {
          max-width: 250px;
          margin-bottom: 20px;
        }
        .footer {
          font-size: 12px;
          text-align: center;
          color: #aaa;
        }
      </style>
    </head>
    <body style="background-color: #f4f4f9">
      <div class="email-container" style="background-color: black">
        <div style="display: flex; justify-content: center">
          <a href="https://sodermalm-baber-backend.vercel.app/">
            <img class="logo" src="https://i.imgur.com/oij0l9R.png" alt="Logo" />
          </a>
        </div>
        <h1 style="color: white">Booking cancelled</h1>
        <p>Hello ${booking.customerName},</p>
        <p>
          Your reservation with ${booking.barber} at <strong>${booking.day}</strong> to
          <strong>${booking.schedule}</strong> has been cancelled.
        </p>
        <p>Thank you for choosing us !</p>
        <p class="footer">Blekingegatan 59, 116 62 Stockholm - Skanstull</p>
        <p class="footer">Phone number: +4670-041 98 19</p>
        <p class="footer">© Sodermalm Barbershop</p>
      </div>
    </body>
  </html>  
`;

  return (
    <div className="relative m-2 flex w-2/4 flex-col items-center justify-center rounded-xl p-5 max-lg:w-4/5">
      <div
        className={styles.logoWallpaper}
        style={{ borderRadius: "15px" }}
      ></div>
      {!display && (
        <div className="flex w-4/5 flex-col items-center justify-center rounded-2xl border-2 border-zinc-400 bg-white p-2 max-lg:w-4/5">
          <h1 className="text-center font-semibold text-black">
            Check your reservation
          </h1>
          <input
            placeholder="Booking number"
            className="w-full rounded-xl border-2 border-zinc-400 p-2 uppercase text-black outline-none placeholder:lowercase"
            maxLength={6}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
          />
          <p className="text-xs italic text-zinc-400">
            Reservation number contains 6 caracters{" "}
          </p>
          <p className="text-xs italic text-red-500">{error}</p>
          <div className="flex w-full items-center justify-around">
            <button
              className="my-2 flex items-center rounded-xl border-2 border-red-800 bg-red-500 p-2 text-white"
              onClick={props.onCancel}
            >
              Cancel <FaCheck className="ml-3" />
            </button>
            <button
              className={`my-2 flex items-center rounded-xl border-2 p-2 text-white ${input.length > 5 ? "border-green-800 bg-green-500" : "cursor-default border-zinc-400 bg-white text-zinc-400"}`}
              onClick={() => (input.length > 5 ? Verify() : undefined)}
            >
              Verify <FaCheck className="ml-3" />
            </button>
          </div>
        </div>
      )}
      {display && (
        <div className="max-lg:3/5 flex w-4/5 flex-col items-center justify-center rounded-2xl border-2 border-zinc-400 bg-black p-2">
          <div
            className="flex w-full flex-col items-center justify-center border-zinc-500"
            style={{ borderBottom: "0.75px grey solid" }}
          >
            <h1 className="font-semibold text-white">Your reservation</h1>
            <p className="italic text-white" style={{ fontSize: "9px" }}>
              {booking.numberBooking}
            </p>
          </div>
          <div className="mt-2 flex flex-col items-center justify-center">
            <h2 className="font-semibold italic text-white">
              {booking.customerName} {booking.customerLastName}
            </h2>
            <p className="text-center text-white">
              {dayjs(booking.day, "DD-MM-YYYY").format("D MMMM, YYYY")} -{" "}
              {booking.schedule}
            </p>
            <div className="flex flex-col items-center">
              <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-blue-400">
                <img
                  src={booking.barberPicture}
                  className="h-full w-full"
                  alt="barber_picture_profile"
                />
              </div>
              <h1 className="text-xl font-semibold text-white">
                {booking.barber}
              </h1>
            </div>
          </div>
          <div className="flex w-11/12 items-center justify-around p-2">
            <button
              className="w-2/5 rounded-xl border-2 border-blue-700 bg-blue-400 p-2 hover:bg-blue-700"
              onClick={() => Clear()}
            >
              <h1 className="text-white">Ok</h1>
            </button>
            <button
              className="w-2/5 rounded-xl border-2 border-red-700 bg-red-400 p-2 hover:bg-red-700"
              onClick={() => CancelBooking()}
            >
              <h1 className="text-white">Cancel</h1>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default checkBooking;
