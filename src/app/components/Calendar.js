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
import "@schedule-x/theme-default/dist/index.css";
import { useEffect } from "react";

function Calendar() {
  const plugins = [createEventsServicePlugin(), createEventModalPlugin()];

  const calendar = useNextCalendarApp(
    {
      views: [
        createViewDay(),
        createViewWeek(),
        createViewMonthGrid(),
        createViewMonthAgenda(),
      ],
      events: [
        {
          id: "1",
          title: "Event 1",
          start: "2024-11-08 08:00",
          end: "2024-11-08 10:00",
          description: "Coupe de cheveux",
        },
      ],
      selectedDate: "2024-11-08",
    },
    plugins,
  );

  // useEffect(() => {
  //   // get all events
  //   calendar.eventsService.getAll()
  // }, [])

  return (
    <div className="flex h-lvh items-center justify-center bg-black">
      <ScheduleXCalendar className="bg-black" calendarApp={calendar} />
    </div>
  );
}

export default Calendar;
