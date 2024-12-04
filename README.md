
# GoGather Project

## Database Schema Design

![db-schema]

[db-schema]: ./images/dbschema.png

---

## API Documentation

### Authentication
- **POST** `/auth/signup`  
  Register a new user.

- **POST** `/auth/login`  
  Authenticate a user and return a token.

- **POST** `/auth/logout`  
  Log out the user and invalidate their session.

### Events
- **GET** `/events?category=:category`  
  Fetch events from Eventbrite API filtered by category.

### Favorites
- **GET** `/favorites`  
  Retrieve the current user’s saved favorites.

- **POST** `/favorites`  
  Save a new favorite for the user.

- **DELETE** `/favorites/:id`  
  Remove a favorite by its ID.

### Reviews
- **GET** `/reviews/:place_id`  
  Get all reviews for a specific event or place.

- **POST** `/reviews`  
  Submit a new review.

- **DELETE** `/reviews/:id`  
  Remove a review by its ID.

### Itineraries
- **GET** `/itineraries`  
  Get all itineraries for the current user.

- **POST** `/itineraries`  
  Create a new itinerary.

- **DELETE** `/itineraries/:id`  
  Delete an itinerary by its ID.

---

## Feature List / MVP List

### User Authentication
- Users can sign up, log in, and log out.
- Secure password handling with hashing.

### Search for Events and Places
- Allow users to search for events by category (e.g., food, entertainment, outdoors).
- Fetch event details using the Eventbrite API.

### Favorites Management
- Users can save places or events to their favorites.
- Include notes for saved favorites.

### Reviews
- Users can leave reviews for events or places with ratings and comments.
- Display an average rating for each event/place based on user reviews.

### Itineraries
- Users can create, view, and manage itineraries.
- Add events/places to itineraries with specific start and end times.

### Interactive Itinerary
- Visualize itinerary items with start/end times clearly displayed.

---

## User Stories

1. **As a user, I want to:**
   - Create an account to save my preferences and activities.
   - Log in to view my saved favorites and itineraries.

2. **As a user, I want to:**
   - Search for local events and places based on categories.
   - View details like event time, location, and reviews.

3. **As a user, I want to:**
   - Add events/places to my favorites for future reference.
   - Write reviews for events/places I have attended.

4. **As a user, I want to:**
   - Plan my day by creating itineraries with specific timings for activities.
   - Share my itinerary with friends.

5. **As a user, I want to:**
   - Manage my reviews and favorites easily from my profile page.

---

