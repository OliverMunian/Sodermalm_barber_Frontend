import styles from "../../../styles/Home.module.css";
import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
//icons
import { IoPlaySkipForwardCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import { esES } from "@mui/x-date-pickers/locales";
import { MdSwipeDown } from "react-icons/md";

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);

function TimeSlots(props) {
  const BACKEND_ADRESS = "http://localhost:4000";
  const selectedDate = dayjs(props.date, "DD-MM-YYYY");

  const [selectedSlot, setSelectedSlot] = useState(false);
  const [index, setIndex] = useState(null);
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_ADRESS}/bookings/all/${props.barber}`)
      .then((response) => response.json())
      .then((dataBooking) => {
        if (dataBooking.data) {
          setBooking(dataBooking.data);
        }
      });
  }, []);

  const bookingFiltered = booking
    .map((infos) => ({
      date: infos.day,
      schedule: infos.schedule,
    }))
    .filter((element) => {
      const elementDate = dayjs(element.date, "DD-MM-YYYY");
      return elementDate.isSameOrAfter(selectedDate);
    });

  // Crée les créneaux horaires de 9h à 20h pour la date sélectionnée
  const filteredTimeSlots = Array.from({ length: 11 }, (_, i) => {
    const start = selectedDate.hour(9).add(i, "hour");
    const end = start.add(1, "hour");
    return `${start.format("HH:mm")} - ${end.format("HH:mm")}`;
  }).filter((slot) => {
    const now = dayjs();
    const isToday = selectedDate.isSame(now, "day");
    return !isToday || dayjs(slot.split(" - ")[0], "HH:mm").isAfter(now); // Vérifie que l'heure de début est après maintenant
  });

  const finalTimeSlotsFiltered = filteredTimeSlots.map((slot, i) => {
    const slotDate = selectedDate.format("DD-MM-YYYY");

    // Vérifie si le créneau est réservé
    const isBooked = bookingFiltered.some(
      (booking) => booking.date === slotDate && booking.schedule === slot,
    );

    // Retourne les créneaux avec leur état (disponible ou réservé)
    return (
      <ListItem key={i}>
        <ListItemButton
          className="m-2 mb-3 rounded-lg p-4"
          onClick={() => (isBooked ? undefined : handleSlotSelection(slot, i))}
          selected={selectedSlot === slot}
          style={{
            width: "100%",
            backgroundColor:
              index === i ? "white" : isBooked ? "#aab2ba" : "transparent",
            borderRadius: "20px",
            border: index === i ? "2px solid #3c8042" : "2px solid white",
          }}
        >
          <ListItemText
            className="mb-3 flex justify-center text-black"
            primary={slot}
            style={{
              color: index === i ? "black" : isBooked ? "#5e6368" : "white",
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  });

  console.log("ligne 62, filteredTimeSlots: ", filteredTimeSlots);

  const handleSlotSelection = (slot, i) => {
    console.log(props.barber);
    if (index === i) {
      setIndex(null);
      setSelectedSlot(null);
      props.onSelect(null);
    } else {
      setIndex(i);
      setSelectedSlot(slot);
      props.onSelect(slot);
    }
  };

  // function handleClick() {
  //   if (selectedSlot) {
  //     props.onSelect(selectedSlot); // Remonte la valeur vers le parent
  //   } else {
  //     props.onSelect(null); // Informe le parent qu'aucun slot n'est sélectionné
  //   }
  // }

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col items-center justify-center pb-3">
        <div className="flex items-center justify-center">
          <h6 className="text-center text-lg font-semibold italic">
            Please choose a slot
          </h6>
          <p className="hidden max-lg:flex"></p>
          <FaClockRotateLeft className="ml-2" />
        </div>
        <div className="hidden w-full max-lg:flex max-lg:items-start max-lg:justify-center">
          <p className="text-center text-sm">
            Scroll drown and pick up a slot{" "}
          </p>
          <MdSwipeDown className="ml-2" />
        </div>
        <div>
          <p className="text-sm italic">
            {" "}
            {dayjs(props.date, "DD-MM-YYYY").format("D MMMM, YYYY")}
          </p>
        </div>
      </div>
      <div className={styles.customScrollbar}>
        <List>{finalTimeSlotsFiltered}</List>
      </div>
      {selectedSlot && (
        <h6 className="text-center text-xl font-semibold italic">
          {selectedSlot}
        </h6>
      )}
      <div className="flex w-full items-center justify-between pt-3">
        <button
          className="m-1 flex w-3/4 items-center justify-center rounded-xl bg-orange-300 p-2 font-semibold hover:bg-orange-500"
          onClick={props.cancel}
        >
          <p className="text-white">Cancel</p>
        </button>
        <button
          className={`m-1 flex w-3/4 items-center justify-center rounded-xl p-2 font-semibold ${
            selectedSlot
              ? "bg-green-500 hover:bg-green-800"
              : "border-2 border-gray-500 hover:bg-transparent"
          } ${selectedSlot ? "hover:cursor-pointer" : "hover:cursor-default"}`}
          // onClick={selectedSlot ? handleClick : undefined}
          onClick={selectedSlot ? props.display : undefined}
        >
          <p className="text-white" style={{ color: !selectedSlot && "grey" }}>
            Next
          </p>{" "}
        </button>
      </div>
    </div>
  );
}

export default TimeSlots;
