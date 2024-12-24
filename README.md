
# GoGather Project

## Database Schema Design

![db-schema]

[db-schema]: ./images/dbschema.png

## Wireframe

![wireframe]

[wireframe]: ./images/wireframe.png
---
# GoGather Application

GoGather is an interactive web application where users can explore, create, register, favorite, and search for events. It features a robust event management system, including full CRUD (Create, Read, Update, Delete) functionality for events and registrations, as well as partial CRUD for favorites. The application also includes a dynamic search bar and category filters for better navigation.

---

## Features

### Event Management
- **Full CRUD**:
  - Create new events with details such as title, time, summary, ticket price, and category.
  - Read event details, including category information.
  - Update event information (host only).
  - Delete created events (host only).

### Registration Management
- **Full CRUD**:
  - Register for events.
  - View registered events.
  - Unregister from events.

### Favorites
- **Partial CRUD**:
  - Favorite events.
  - View favorite events.
  - Remove events from favorites.

### Search and Filtering
- **Dynamic Search**: Search for events by title.
- **Category Tab**: Browse events by categories.

### User Authentication
- Secure user authentication using sessions.
- Login, signup, and logout functionality.

---

## API Endpoints

### Events

#### GET Endpoints
- **`/api/events/`**: Fetch all events (includes categories).
- **`/api/events/registrations`**: Fetch all events the user is registered for.
- **`/api/events/favorites`**: Fetch all events the user has favorited.
- **`/api/events/created`**: Fetch all events created by the logged-in user.
- **`/api/events/images`**: Fetch all available event images.

#### POST Endpoints
- **`/api/events/:id/registration`**: Register for an event by ID (requires ticket count).
- **`/api/events/:id/favorite`**: Favorite an event by ID.
- **`/api/events/search`**: Search for events by title.
- **`/api/events/`**: Create a new event.

#### DELETE Endpoints
- **`/api/events/:id/registration`**: Unregister from an event by ID.
- **`/api/events/:id/favorites`**: Remove an event from favorites by ID.
- **`/api/events/:id`**: Delete an event by ID (host only).

### Session

#### GET Endpoints
- **`/api/session/`**: Restore the session for the logged-in user.

#### POST Endpoints
- **`/api/session/`**: Log in using credentials (email or username).

#### DELETE Endpoints
- **`/api/session/`**: Log out the current session.

### Users

#### POST Endpoints
- **`/api/users/`**: Sign up for a new account.

### Static Routes
- Serve the React frontend in production for both static assets and dynamic routing.

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd GoGather
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add required environment variables as specified in `.env.example`.

4. **Database Setup**:
   - Run migrations: `npx sequelize-cli db:migrate`
   - Seed the database: `npx sequelize-cli db:seed:all`

5. **Start the Server**:
   ```bash
   npm start
   ```

6. **Access the Application**:
   - Navigate to `http://localhost:3000` in your browser.

---

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: Secure sessions with cookies

---

## Future Enhancements
- Enhance search functionality to include filters like date and location.
- Add user profiles to display activity history and created events.
- Introduce event recommendations based on user interests.
