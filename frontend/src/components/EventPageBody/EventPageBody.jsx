import React from 'react';

function EventPageBody({ event }) {
  return (
    <div className="event-body-container">
      <div className="event-summary">
        <h2 className="min-margin" style={{ textDecoration: 'underline' }}>Event Overview</h2>
        <p style={{ textAlign: 'justify' }}>{event.summary}</p>
      </div>
    </div>
  );
}

export default EventPageBody;
