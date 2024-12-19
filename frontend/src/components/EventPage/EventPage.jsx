import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import EventPageHeader from "../EventPageHeader/EventPageHeader";
import EventPageBody from "../EventPageBody/EventPageBody";

function EventPage() {
  const { eventId } = useParams();
  const event = useSelector((state) =>
    state.events.eventsList.find((e) => e.id.toString() === eventId)
  );

  if (!event) {
    return (
      <div className="event-page-container">
        <h2>Event not found</h2>
      </div>
    );
  }

  return (
    <div className="body flex-container">
      <div className="event-page-container">
        <EventPageHeader event={event} />
        <EventPageBody event={event} />
      </div>
    </div>
  );
}

export default EventPage;
