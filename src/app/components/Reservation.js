import styles from "../../../styles/Home.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
  const disableSundays = (date) => {
    // Vérifie si le jour de la semaine est un dimanche (0)
    return date.day() == [0,1];
  };
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="portrait"
          minDate={dayjs()}
          shouldDisableDate={disableSundays} 
          onChange={props.pickDate}
          onAccept={props.onValidate}
          onClose={props.onCancel}
          sx={{
            borderRadius: "20px",
            backgroundColor: "transparent",
            color: "white",
            "& .MuiDayPicker-root": {
              color: "white",
              backgroundColor: "white",
            },
            "& .Mui-selected": {
              backgroundColor: "#444",
            },
            "& .MuiTypography-root": {
              color: "white",
            },
            "& .MuiButtonBase-root": {
              color: "white",
            },
            "& .MuiPickersDay-today": {
              borderColor: "green", // Change le contour de la date d'aujourd'hui
              borderWidth: "2px",
              borderStyle: "dotted",
            },
            "& .MuiPickersCalendarHeader-switchViewButton": {
              color: "white", // Change la couleur de l'icône de switch entre mois/année
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
