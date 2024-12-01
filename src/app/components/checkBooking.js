import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { toast } from "react-toastify";
import styles from "../../../styles/Home.module.css";
import { useState } from "react";
//icons
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

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
  const BACKEND_ADRESS = "http://localhost:4000";

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
          <a href="https://sodermalm-baber-backend.vercel.app /">
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
    <div className="flex h-96 w-96 flex-col items-center justify-center max-md:h-80 max-md:w-80">
      {!display && (
        <div
          className="flex size-full flex-col items-center justify-center rounded-2xl p-2 backdrop-blur-md"
          style={{ border: "1px solid white" }}
        >
          <h1 className="my-3 text-center text-2xl font-semibold text-white">
            Check your reservation
          </h1>
          <input
            placeholder="Your booking number"
            style={{ border: "1px solid white" }}
            className="w-full rounded-xl border-white bg-transparent p-2 font-semibold uppercase text-white outline-none backdrop-blur-md placeholder:lowercase placeholder:text-zinc-300"
            maxLength={6}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
          />
          <p className="text-xs italic text-white">
            Reservation number contains 6 caracters{" "}
          </p>
          <p className="text-xs italic text-red-500">{error}</p>
          <div className="my-3 flex w-full items-center justify-around">
            <button
              className="my-2 flex items-center rounded-md bg-orange-300 px-5 py-2 text-white hover:bg-orange-400"
              // style={{backgroundColor:'#524956'}}
              onClick={props.onCancel}
            >
              Cancel
            </button>
            <button
              className={`my-2 flex items-center rounded-md px-5 py-2 text-white ${input.length > 5 ? "bg-green-500 hover:bg-green-800" : "cursor-default bg-white text-zinc-400"}`}
              onClick={() => (input.length > 5 ? Verify() : undefined)}
            >
              Verify
            </button>
          </div>
        </div>
      )}

      {display && (
        <div
          className="flex size-full items-center justify-center rounded-2xl p-2 backdrop-blur-sm"
          style={{ border: "1px solid white" }}
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-semibold text-white">Your reservation</h1>
            <div
              className="w-11/12"
              style={{ border: "0.75px solid white" }}
            ></div>
            <p className="italic text-white" style={{ fontSize: "9px" }}>
              {booking.numberBooking}
            </p>
            <h2 className="font-semibold italic text-white">
              {booking.customerName} {booking.customerLastName}
            </h2>
            <p className="text-center text-white">
              {dayjs(booking.day, "DD-MM-YYYY").format("D MMMM, YYYY")} -{" "}
              {booking.schedule}
            </p>
            <div className="flex w-full items-center justify-between p-2">
              <button
                className="w-2/5 rounded-xl bg-green-400 p-2 hover:bg-green-700"
                onClick={() => Clear()}
              >
                <h1 className="text-white">Ok</h1>
              </button>
              <button
                className="w-2/5 rounded-xl bg-orange-300 p-2 hover:bg-orange-400"
                onClick={() => CancelBooking()}
              >
                <h1 className="text-white">Cancel</h1>
              </button>
            </div>
          </div>

          <div className="flex h-72 w-3/4 flex-col items-center justify-between overflow-hidden rounded-lg border-2 border-orange-500 bg-orange-100">
            <div className="flex w-full items-center">
              <div className="w-3/4 rounded-md bg-white p-3">
                <h1 className="text-xl font-semibold text-black">
                  {booking.barber}
                </h1>
                <p className="text-sm text-zinc-400">Master Barber</p>
              </div>
              <div className="ml-3 flex h-full flex-col items-end justify-around">
                <FaTiktok color="#34345b" />
                <FaInstagram color="#34345b" />
              </div>
            </div>

            <div className="h-3/4 overflow-hidden border-black pt-6">
              <img
                src={booking.barberPicture}
                className="h-full w-full"
                alt="barber_picture_profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default checkBooking;
