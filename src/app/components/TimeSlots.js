import styles from "../../../styles/Home.module.css";
import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
//icons
import { IoPlaySkipForwardCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";

dayjs.extend(customParseFormat);

function TimeSlots(props) {
  const selectedDate = dayjs(props.date, "DD-MM-YYYY");

  const [selectedSlot, setSelectedSlot] = useState(false);
  const [index, setIndex] = useState(null);

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

  const handleSlotSelection = (slot, i) => {
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

  function handleClick() {
    if (selectedSlot) {
      props.onSelect(selectedSlot); // Remonte la valeur vers le parent
    } else {
      props.onSelect(null); // Informe le parent qu'aucun slot n'est sélectionné
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col items-center justify-center pb-3">
        <div className="flex items-center justify-center">
          <h6 className="text-center text-lg font-semibold italic">
            Please choose a slot
          </h6>
          <FaClockRotateLeft className="ml-2" />
        </div>
        <div>
          <p className="text-sm italic">
            {" "}
            {dayjs(props.date, "DD-MM-YYYY").format("D MMMM, YYYY")}
          </p>
        </div>
      </div>
      <div className={styles.customScrollbar}>
        <List>
          {filteredTimeSlots.map((slot, i) => (
            <ListItem key={i}>
              <ListItemButton
                className="m-2 mb-3 rounded-lg p-4"
                onClick={() => handleSlotSelection(slot, i)}
                selected={selectedSlot === slot}
                style={{
                  width: "100%",
                  backgroundColor: index === i ? "black" : "white",
                  borderRadius: "20px",
                  border:
                    index === i ? "2px solid #3c8042" : "2px solid transparent",
                }}
              >
                <ListItemText
                  className="mb-3 flex justify-center text-black"
                  primary={slot}
                  style={{ color: index === i ? "white" : "black" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
      {selectedSlot && (
        <h6 className="text-center text-xl font-semibold italic">
          Your time slot: {selectedSlot}
          {/* {dayjs(props.date, "DD-MM-YYYY").format("D MMMM, YYYY")} */}
        </h6>
      )}
      <div className="flex w-full items-center justify-between pt-3">
        <button
          className="m-1 flex w-3/4 items-center justify-center rounded-xl border-2 border-red-500 p-2 font-semibold hover:bg-red-800"
          onClick={props.cancel}
        >
          <p className="text-red-500">Cancel</p>{" "}
          <MdCancel className="ml-2 text-red-500" size={20} />
        </button>
        <button
          className={`m-1 flex w-3/4 items-center justify-center rounded-xl border-2 p-2 font-semibold ${
            selectedSlot
              ? "border-green-500 hover:bg-green-800"
              : "border-gray-500 hover:bg-transparent"
          } ${selectedSlot ? "hover:cursor-pointer" : "hover:cursor-default"}`}
          onClick={selectedSlot ? handleClick : undefined}
        >
          <p
            className="text-green-500"
            style={{ color: !selectedSlot && "grey" }}
          >
            Next
          </p>{" "}
          <IoPlaySkipForwardCircleSharp
            className="ml-2 text-green-500"
            size={20}
            style={{ color: !selectedSlot && "grey" }}
          />
        </button>
      </div>
    </div>
  );
}

export default TimeSlots;
