import {
  ScheduleXCalendar,
  useNextCalendarApp,
} from "@schedule-x/react/dist/index";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createEventRecurrencePlugin } from "@schedule-x/event-recurrence";
import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function Calendar(props) {
  const today = dayjs().format("YYYY-MM-DD");
  const plugins = [
    createEventsServicePlugin(),
    createEventModalPlugin(),
    createEventRecurrencePlugin(),
  ];
  const [customersApts, setCustomersApts] = useState([]);
  const BACKEND_ADRESS = "https://sodermalm-baber-backend.vercel.app";

  useEffect(() => {
    if (props.event) {
      const flatEvents = props.event.flat(); // Applatissement pour renvoyer un seul tableau

      const allEvent = flatEvents.map((element) => {
        const formatDate = (dateStr) => {
          const [day, month, year] = dateStr.split("-");
          return `${year}-${month}-${day}`;
        };

        const start = element.schedule.split(" - ")[0];
        const end = element.schedule.split("- ")[1];

        return {
          id: element.id,
          title: `${element.name} ${element.lastname}`,
          start: `${formatDate(element.day)} ${start}`,
          end: `${formatDate(element.day)} ${end}`,
          description: element.reservationNumber,
          calendarId: "work",
        };
      });
      setCustomersApts(allEvent);
    }
  }, [props.event]);

  useEffect(() => {
    if (customersApts.length > 0) {
      customersApts.forEach((event) => {
        // calendar.eventsService.getAll()
        calendar.eventsService.add(event);
      });
    }
  }, [customersApts]);

  const customEventRenderer = (event) => {
    return (
      <div
        style={{
          padding: "10px",
          border: "1px solid gray",
          borderRadius: "5px",
        }}
      >
        <button>Cancel appointement</button>
      </div>
    );
  };

  const calendar = useNextCalendarApp(
    {
      views: [
        createViewDay(),
        createViewWeek(),
        createViewMonthGrid(),
        createViewMonthAgenda(),
      ],
      isDark: true,
      calendars: {
        work: {
          colorName: "work",
          lightColors: {
            main: "#1265bc",
            container: "#0000",
            onContainer: "#4390e1",
          },
          darkColors: {
            main: "#1265bc",
            onContainer: "#FFFF",
            container: "#4390e1",
          },
        },
      },
      customRenderer: {
        customEventRenderer, // Applique le rendu personnalisé
      },
      locale: "en-EN",
      selectedDate: today,
      dayBoundaries: {
        start: "09:00",
        end: "20:00",
      },
    },
    plugins,
  );

  return (
    <div className="w-full">
      <ScheduleXCalendar
        calendarApp={calendar}
        key={JSON.stringify(customersApts)}
      />
    </div>
  );
}

export default Calendar;
