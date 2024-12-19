import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { registerEvent } from '../../store/events';

function RegistrationForm({ event }) {
  const dispatch = useDispatch();

  const registeredList = useSelector((state) => state.events.registered);
  const isRegistered = registeredList.some((regEvent) => regEvent.id === event.id);

  const [ticketCount, setTicketCount] = useState(1);
  const [totalCost, setTotalCost] = useState(event.ticketPrice);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setTotalCost((ticketCount * event.ticketPrice).toFixed(2));
  }, [ticketCount, event.ticketPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(registerEvent({ id: event.id, ticketCount })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div>
      <h3>{`Order Total: (${ticketCount}) x ${event.ticketPrice} = $${totalCost}`}</h3>
      <form className="modal-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} style={{ color: 'red' }}>
              {error}
            </li>
          ))}
        </ul>
        <label>Number of Tickets:</label>
        <input
          type="number"
          value={ticketCount}
          min="1"
          onChange={(e) => setTicketCount(parseInt(e.target.value, 10))}
          required
        />
        <button type="submit" disabled={isRegistered}>
          {isRegistered ? 'Already Registered' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
