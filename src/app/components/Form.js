import { useState } from "react";
//extensions
import { ToastContainer, toast } from "react-toastify";
//icons
import { MdCancel } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";

function FormSubmit(props) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const day = props.day;
  const slot = props.slot;
  const barberId = props.barberId;
  console.log(day);
  console.log(barberId);
  console.log(slot);
  const BACKEND_ADRESS = "http://localhost:4000";

  function BookAppointment(e) {
    e.preventDefault(); // Empêche le rechargement de la page

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

  return (
    <div className="my-2 mb-2 w-full rounded-3xl bg-white p-4">
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
  );
}

export default FormSubmit;
