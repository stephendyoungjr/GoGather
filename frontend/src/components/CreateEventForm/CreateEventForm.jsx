import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewEvent } from '../../store/events';

function CreateEventForm({ categories }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]); // Available images
  const [time, setTime] = useState('');
  const [summary, setSummary] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/events/images'); // Fetch available images
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
      const newEvent = await dispatch(
        createNewEvent({
          title,
          image,
          time,
          summary,
          ticketPrice,
          categoryId,
        })
      );
      if (newEvent) {
        history.push('/profile'); // Redirect to profile after successful creation
      }
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  return (
    <div className="create-event-container">
      <form onSubmit={handleSubmit} className="create-event-form">
        <h2>Create a New Event</h2>
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
        <button type="submit" className="create-event-btn">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEventForm;

// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { createNewEvent } from '../../store/events';

// function CreateEventForm({ categories }) {
//   const dispatch = useDispatch();

//   const [title, setTitle] = useState('');
//   const [image, setImage] = useState('');
//   const [images, setImages] = useState([]); // Available images
//   const [time, setTime] = useState('');
//   const [summary, setSummary] = useState('');
//   const [ticketPrice, setTicketPrice] = useState('');
//   const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
//   const [errors, setErrors] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       const response = await fetch('/api/events/images'); // Fetch available images
//       if (response.ok) {
//         const imagePaths = await response.json();
//         setImages(imagePaths);
//       }
//     };
//     fetchImages();
//   }, []);

//   const validateForm = () => {
//     const validationErrors = [];

//     // Validate date range
//     const eventDate = new Date(time);
//     const minDate = new Date('2024-01-01');
//     const maxDate = new Date('2025-12-31');
//     if (eventDate < minDate || eventDate > maxDate) {
//       validationErrors.push('Date must be between 01/01/2024 and 12/31/2025.');
//     }

//     // Validate ticket price
//     if (ticketPrice < 0) {
//       validationErrors.push('Ticket price must be at least $0.');
//     }

//     return validationErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors([]);

//     const validationErrors = validateForm();
//     if (validationErrors.length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       await dispatch(
//         createNewEvent({
//           title,
//           image,
//           time,
//           summary,
//           ticketPrice,
//           categoryId,
//         })
//       );
//       setTitle('');
//       setImage('');
//       setTime('');
//       setSummary('');
//       setTicketPrice('');
//       setCategoryId(categories[0]?.id || '');
//     } catch (res) {
//       const data = await res.json();
//       if (data && data.errors) setErrors(data.errors);
//     }
//   };

//   return (
//     <div className="create-event-container">
//       <form onSubmit={handleSubmit} className="create-event-form">
//         <h2>Create a New Event</h2>
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
//         <input
//           type="number"
//           value={ticketPrice}
//           onChange={(e) => setTicketPrice(e.target.value)}
//           min="0"
//           required
//         />
//         <label>Category</label>
//         <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>
//         <button type="submit" className="create-event-btn">
//           Create Event
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateEventForm;


