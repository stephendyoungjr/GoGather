import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/HomePage.css";

const HomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const navigate = useNavigate();

    if (!sessionUser) {
        navigate("/"); // Redirect to LandingPage if not logged in
    }

    return (
        <div className="home-page">
            <h1>Welcome back, {sessionUser.username}!</h1>
            <button onClick={() => navigate("/itineraries")}>View Itineraries</button>
            <button onClick={() => navigate("/events")}>View Events</button>
            <button onClick={() => navigate("/favorites")}>View Favorites</button>
        </div>
    );
};

export default HomePage;
