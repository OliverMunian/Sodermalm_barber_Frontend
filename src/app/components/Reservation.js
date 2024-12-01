import styles from "../../../styles/Home.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers"; // Keep only one of these imports

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5686f9", // Modifie la couleur principale
    },
    text: {
      primary: "#FFFF", // Change la couleur du texte principal
    },
  },
  components: {
    MuiStaticDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: "black", // Applique un fond noir à tout le picker
          color: "white", // Change la couleur du texte
        },
      },
    },
  },
});

function Reservation(props) {
  const isPortrait = useMediaQuery("(max-width: 768px)");
  const disableDays = (date) => {
    const disabledDays = props.daysOff;
    return disabledDays.includes(date.day());
  };
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation={isPortrait ? "portrait" : "landscape"}
          minDate={dayjs()}
          shouldDisableDate={disableDays}
          onChange={props.pickDate}
          onAccept={props.onValidate}
          onClose={props.onCancel}
          sx={{
            borderRadius: "20px",
            backgroundColor: "transparent",
            fontWeight: "bold",
            color: "white",
            "& .MuiDayPicker-root": {
              color: "white",
              backgroundColor: "white",
              fontWeight: "bold",
            },
            "& .Mui-selected": {
              backgroundColor: "#444",
              fontWeight: "bold",
            },
            "& .MuiTypography-root": {
              color: "white",
              fontWeight: "bold",
            },
            "& .MuiButtonBase-root": {
              color: "white",
              fontWeight: "bold",
            },
            "& .MuiPickersDay-today": {
              borderColor: "#568bd7", // Change le contour de la date d'aujourd'hui
              borderWidth: "2px",
              borderStyle: "solid",
              color: "black",
              backgroundColor: "white",
            },
            "& .MuiPickersCalendarHeader-switchViewButton": {
              color: "white", // Change la couleur de l'icône de switch entre mois/année
              fontWeight: "bold",
            },
            "& .MuiPickersCalendarHeader-iconButton": {
              color: "white", // Change la couleur des flèches de navigation
            },
          }}
          localeText={{
            cancelButtonLabel: "Cancel",
            okButtonLabel: "OK",
            clearButtonLabel: "Clear",
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default Reservation;
