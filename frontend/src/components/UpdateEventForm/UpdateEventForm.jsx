import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateEvent } from '../../store/events';

function UpdateEventForm({ categories }) {
  const { eventId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const event = useSelector((state) =>
    state.events.created.find((e) => e.id.toString() === eventId)
  );

  const [title, setTitle] = useState(event?.title || '');
  const [image, setImage] = useState(event?.image || '');
  const [images, setImages] = useState([]); // Available images
  const [time, setTime] = useState(event?.time || '');
  const [summary, setSummary] = useState(event?.summary || '');
  const [ticketPrice, setTicketPrice] = useState(event?.ticketPrice || '');
  const [categoryId, setCategoryId] = useState(event?.categoryId || categories[0]?.id || '');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/events/images');
      if (response.ok) {
        const imagePaths = await response.json();
        setImages(imagePaths);
      }
    };
    fetchImages();
  }, []);

  const validateForm = () => {
    const validationErrors = [];

    // Validate date range
    const eventDate = new Date(time);
    const minDate = new Date('2024-01-01');
    const maxDate = new Date('2025-12-31');
    if (eventDate < minDate || eventDate > maxDate) {
      validationErrors.push('Date must be between 01/01/2024 and 12/31/2025.');
    }

    // Validate ticket price
    if (ticketPrice < 0) {
      validationErrors.push('Ticket price must be at least $0.');
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const updatedEvent = await dispatch(
        updateEvent({
          id: eventId,
          title,
          image,
          time,
          summary,
          ticketPrice,
          categoryId,
        })
      );

      if (updatedEvent) {
        alert('Event updated successfully!');
        history.push(`/events/${eventId}`);
      }
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      } else {
        setErrors(['An unexpected error occurred. Please try again.']);
      }
    }
  };

  if (!event) return <h2>Loading...</h2>;

  return (
    <div className="create-event-container">
      <form onSubmit={handleSubmit} className="create-event-form">
        <h2>Edit Event</h2>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} style={{ color: 'red' }}>
              {error}
            </li>
          ))}
        </ul>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Image</label>
        <select value={image} onChange={(e) => setImage(e.target.value)} required>
          <option value="">Select an image</option>
          {images.map((imgPath, idx) => (
            <option key={idx} value={imgPath}>
              {imgPath.split('/').pop()} {/* Show only file name */}
            </option>
          ))}
        </select>
        {image && <img src={image} alt="Selected" style={{ maxWidth: '100%', marginTop: '10px' }} />}
        <label>Time</label>
        <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} required />
        <label>Summary</label>
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} required />
        <label>Ticket Price</label>
        <input
          type="number"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(e.target.value)}
          min="0"
          required
        />
        <label>Category</label>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit" className="edit-event-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UpdateEventForm;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useHistory } from 'react-router-dom';
// import { updateEvent } from '../../store/events';

// function UpdateEventForm({ categories }) {
//   const { eventId } = useParams();
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const event = useSelector((state) =>
//     state.events.created.find((e) => e.id.toString() === eventId)
//   );

//   const [title, setTitle] = useState(event?.title || '');
//   const [image, setImage] = useState(event?.image || '');
//   const [images, setImages] = useState([]); // State for images
//   const [time, setTime] = useState(event?.time || '');
//   const [summary, setSummary] = useState(event?.summary || '');
//   const [ticketPrice, setTicketPrice] = useState(event?.ticketPrice || '');
//   const [categoryId, setCategoryId] = useState(event?.categoryId || categories[0]?.id || '');
//   const [errors, setErrors] = useState([]);

//   // Fetch available images
//   useEffect(() => {
//     const fetchImages = async () => {
//       const response = await fetch('/api/events/images');
//       if (response.ok) {
//         const imagePaths = await response.json();
//         setImages(imagePaths);
//       }
//     };
//     fetchImages();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors([]);

//     try {
//       const updatedEvent = await dispatch(
//         updateEvent({
//           id: eventId,
//           title,
//           image,
//           time,
//           summary,
//           ticketPrice,
//           categoryId,
//         })
//       );

//       if (updatedEvent) {
//         alert('Event updated successfully!');
//         history.push(`/events/${eventId}`);
//       }
//     } catch (res) {
//       const data = await res.json();
//       if (data && data.errors) {
//         setErrors(data.errors);
//       } else {
//         setErrors(['An unexpected error occurred. Please try again.']);
//       }
//     }
//   };

//   if (!event) return <h2>Loading...</h2>;

//   return (
//     <div className="create-event-container">
//       <form onSubmit={handleSubmit} className="create-event-form">
//         <h2>Edit Event</h2>
//         <ul>
//           {errors.map((error, idx) => (
//             <li key={idx} style={{ color: 'red' }}>
//               {error}
//             </li>
//           ))}
//         </ul>
//         <label>Title</label>
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//         <label>Image</label>
//         <select value={image} onChange={(e) => setImage(e.target.value)} required>
//           <option value="">Select an image</option>
//           {images.map((imgPath, idx) => (
//             <option key={idx} value={imgPath}>
//               {imgPath.split('/').pop()} {/* Show only file name */}
//             </option>
//           ))}
//         </select>
//         {image && <img src={image} alt="Selected" style={{ maxWidth: '100%', marginTop: '10px' }} />}
//         <label>Time</label>
//         <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} required />
//         <label>Summary</label>
//         <textarea value={summary} onChange={(e) => setSummary(e.target.value)} required />
//         <label>Ticket Price</label>
//         <input type="number" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} required />
//         <label>Category</label>
//         <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>
//         <button type="submit" className="edit-event-btn">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }

// export default UpdateEventForm;
