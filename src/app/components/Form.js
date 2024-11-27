import { useState } from "react";
//extensions
import { ToastContainer, toast } from "react-toastify";
//icons
import { MdCancel } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
//images
import Logo from "../../../public/Assets/Logo.png";

function FormSubmit(props) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validate, setValidate] = useState(false);
  const day = props.day;
  const slot = props.slot;
  const barberId = props.barberId;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const BACKEND_ADRESS = "https://sodermalm-barber-frontend.vercel.app";

  function BookAppointment(e) {
    e.preventDefault();
    setValidate(true);
    if (!emailRegex.test(email)) {
      setEmail("");
      toast.error("Your email is not correct !", {
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

    fetch(`${BACKEND_ADRESS}/bookings/${barberId}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        lastname: lastName,
        email: email,
        day: day,
        schedule: slot,
      }),
    })
      .then((response) => response.json()) // Traite la réponse en JSON
      .then((data) => {
        console.log(data);
        if (data) {
          fetch(`${BACKEND_ADRESS}/send-email`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              to: email,
              subject: `Sodermalm Barbershop - Reservation number ${data.data.reservationNumber}`,
              html: textHTML,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                setValidate(true);
                toast.success(
                  "Appointment validated! You will receive a confirmation on your email",
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
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Oops! Something went wrong. Please try again later.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }

  const textHTML = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>Reservation Confirmation</title>
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
          <a href="https://sodermalm-barber-frontend.vercel.app/">
            <img class="logo" src="https://i.imgur.com/oij0l9R.png" alt="Logo" />
          </a>
        </div>
        <h1 style="color: white">Booking confirmation</h1>
        <p>Hello ${name},</p>
        <p>
          Your reservation is confirmed <strong>${day}</strong> at
          <strong>${slot}</strong>.
        </p>
        <p>Thank you for choosing us !</p>
  
        <p style="font-style: italic; font-size: 9px">
          Remember: if you can't keep your appointment, please cancel it
        </p>
        <p class="footer">Blekingegatan 59, 116 62 Stockholm - Skanstull</p>
        <p class="footer">Phone number: +4670-041 98 19</p>
        <p class="footer">© Sodermalm Barbershop</p>
      </div>
    </body>
  </html>  
`;

  return (
    <div className="my-2 mb-2 w-full rounded-3xl bg-white p-4">
      {!validate && (
        <div>
          <div className="flex w-full justify-center">
            <div className="w-full">
              <h1 className="text-left text-xl font-semibold italic text-black">
                Enter your details below:
              </h1>
            </div>
          </div>
          <form className="flex flex-col items-center">
            <input
              placeholder="First name"
              className="m-2 w-full rounded-lg border-b border-white bg-gray-200 p-3 text-black outline-none"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              placeholder="Last name"
              className="m-2 w-full rounded-lg border-b border-white bg-gray-200 p-3 text-black outline-none"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <input
              placeholder="Email"
              className="m-2 w-full rounded-lg border-b border-white bg-gray-200 p-3 text-black outline-none"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="flex w-full justify-around">
              <button
                className="mt-3 flex items-center rounded-xl border-2 border-red-800 px-6 py-2 hover:bg-red-500"
                onClick={props.cancel}
              >
                <p className="text-red-800">Cancel</p>
                <MdCancel className="ml-2 text-red-800" size={20} />
              </button>
              <button
                className="mt-3 flex rounded-xl border-2 border-green-800 px-6 py-2 hover:bg-green-500"
                onClick={(e) => BookAppointment(e)}
              >
                <p className="text-green-800">Submit</p>
                <FaCalendarCheck className="ml-2 text-green-800" size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
      {validate && (
        <div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center text-black">
              Your appointment has been booked successfully.
            </h1>
            <GrValidate size={25} color={"green"} />
          </div>
        </div>
      )}
    </div>
  );
}

export default FormSubmit;
