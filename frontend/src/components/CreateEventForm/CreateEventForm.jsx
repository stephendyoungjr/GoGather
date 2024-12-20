import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewEvent } from '../../store/events';

function CreateEventForm({ categories }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [time, setTime] = useState('');
  const [summary, setSummary] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      await dispatch(
        createNewEvent({
          title,
          image,
          time,
          summary,
          ticketPrice,
          categoryId,
        })
      );

      // Reset form after successful submission
      setTitle('');
      setImage('');
      setTime('');
      setSummary('');
      setTicketPrice('');
      setCategoryId(categories[0]?.id || '');
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-event-form">
      <h2>Create a New Event</h2>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx} className="error-text">
            {error}
          </li>
        ))}
      </ul>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label htmlFor="time">Time</label>
        <input
          id="time"
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label htmlFor="summary">Summary</label>
        <textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
          className="textarea-field"
        />
      </div>
      <div className="form-group">
        <label htmlFor="ticketPrice">Ticket Price</label>
        <input
          id="ticketPrice"
          type="number"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(e.target.value)}
          required
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="select-field"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="create-event-btn">
        Create Event
      </button>
    </form>
  );
}

export default CreateEventForm;
