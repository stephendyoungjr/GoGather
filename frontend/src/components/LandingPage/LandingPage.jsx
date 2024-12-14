import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadAllEvents } from '../../redux/slices/eventSlice';
import '../../styles/LandingPage.css';

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const eventsObj = useSelector((state) => state.events.events);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(loadAllEvents())
            .then(() => setLoading(false))
            .catch(() => setLoading(false)); // Stop loading even if there’s an error
    }, [dispatch]);

    if (loading) return <p>Loading events...</p>;

    if (!eventsObj || Object.keys(eventsObj).length === 0) {
        return <p>No events available at this time.</p>;
    }

    const events = Object.values(eventsObj);

    const handleClick = (event) => {
        navigate(`/events/${event.id}`);
    };

    return (
        <main className="grid-container">
            {events
                .sort((a, b) => b.id - a.id)
                .map((event) => (
                    <article key={event.id} className="grid-item" onClick={() => handleClick(event)}>
                        <div className="image-container-square">
                            <p className="name">{event.name}</p>
                            <img src={event.previewImage} alt={`${event.name} preview`} />
                        </div>
                        <div className="spot-preview-text">
                            <div>
                                <p style={{ maxWidth: '12em' }}>{event.location}</p>
                                <p>
                                    <span style={{ fontWeight: 'bold' }}>{event.date}</span>
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
        </main>
    );
};

export default LandingPage;
