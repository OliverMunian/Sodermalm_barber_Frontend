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
    day: null,
    schedule: null,
    customerName: null,
    customerLastName: null,
    numberBooking: null,
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
      day: null,
      schedule: null,
      customerName: null,
      customerLastName: null,
      numberBooking: null,
    }));
    setDispay(false);
    setInput("");
  }

  return (
    <div className="relative flex w-2/4 flex-col items-center justify-center rounded-xl p-5">
      <div
        className={styles.logoWallpaper}
        style={{ borderRadius: "15px" }}
      ></div>
      {!display && (
        <div className="flex w-3/5 flex-col items-center justify-center rounded-2xl border-2 border-zinc-400 bg-white p-2">
          <h1 className="font-semibold text-black">Check your reservation</h1>
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
              className={`my-2 flex items-center rounded-xl border-2 p-2 text-white 
              ${input.length > 1 ? "border-green-800 bg-green-500 " : "border-zinc-400 bg-white text-zinc-400 cursor-default"}`}
              onClick={() => input.length > 1 ? Verify() : undefined}
            >
              Verify <FaCheck className="ml-3" />
            </button>
          </div>
        </div>
      )}
      {display && (
        <div className="flex w-3/5 flex-col items-center justify-center rounded-2xl border-2 border-zinc-400 bg-white p-2">
          <div
            className="flex w-full flex-col items-center justify-center border-zinc-500"
            style={{ borderBottom: "0.75px grey solid" }}
          >
            <h1 className="font-semibold text-black">Your reservation</h1>
            <p className="italic text-black" style={{ fontSize: "9px" }}>
              {booking.numberBooking}
            </p>
          </div>
          <div className="mt-2 flex flex-col items-center justify-center">
            <h2 className="font-semibold italic text-black">
              {booking.customerName} {booking.customerLastName}
            </h2>
            <p className="text-black">
              {dayjs(booking.day, "DD-MM-YYYY").format("D MMMM, YYYY")} -{" "}
              {booking.schedule}
            </p>
            <div>
              <h1 className="text-xl font-semibold text-black">
                {booking.barber}
              </h1>
            </div>
          </div>
          <button
            className="w-2/5 rounded-xl border-2 border-blue-700 bg-blue-400 p-2"
            onClick={() => Clear()}
          >
            <h1 className="text-white">Ok</h1>
          </button>
        </div>
      )}
    </div>
  );
}

export default checkBooking;
