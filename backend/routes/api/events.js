const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

const { Event, Registration, Category, Favorite, User } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');

/* GET */

// Load all events
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const events = await Event.findAll({ include: Category });
    console.log('All events loaded successfully');
    res.json({ events });
  })
);

// Load registered events
router.get(
  '/registrations',
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not logged in.' });
    }
    const registrations = await Registration.findAll({
      where: { userId: user.id },
      include: [Event],
    });
    const registeredEvents = registrations.map((reg) => reg.Event);
    console.log('Registered events for user:', registeredEvents);
    res.json(registeredEvents);
  })
);

// Load favorite events
router.get(
  '/favorites',
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not logged in.' });
    }
    const userJoinData = await User.findByPk(user.id, { include: Event });
    if (!userJoinData) {
      return res.status(404).json({ message: 'No user data found.' });
    }
    const favorites = userJoinData.Events;
    console.log('Favorite events for user:', favorites);
    res.json(favorites);
  })
);

// Fetch created events
router.get(
  '/created',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const createdEvents = await Event.findAll({
      where: { host: user.username },
      include: [Category],
    });
    res.json(createdEvents);
  })
);

// Fetch available images
router.get(
  '/images',
  asyncHandler(async (req, res) => {
    const imagesDir = path.join(__dirname, '../../public/images');
    fs.readdir(imagesDir, (err, files) => {
      if (err) {
        console.error('Error reading images directory:', err);
        return res.status(500).json({ error: 'Failed to load images.' });
      }
      const imagePaths = files.map((file) => `/public/images/${file}`);
      res.json(imagePaths);
    });
  })
);

/* POST */

// Register for an event
router.post(
  '/:id/registration',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { ticketCount } = req.body;
    const eventId = req.params.id;
    const userId = req.user.id;

    const registeredEvent = await Registration.create({ eventId, userId, ticketCount });
    const event = await Event.findByPk(eventId);

    console.log('User registered for event:', event.toJSON());
    res.json(event);
  })
);

// Favorite an event
router.post(
  '/:id/favorite',
  requireAuth,
  asyncHandler(async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user.id;

    const favoriteEvent = await Favorite.create({ eventId, userId });
    const event = await Event.findByPk(eventId);

    console.log('Event added to favorites:', event.toJSON());
    res.json(event);
  })
);

// Search for events
router.post(
  '/search',
  asyncHandler(async (req, res) => {
    const { query } = req.body;
    const results = await Event.findAll({
      where: {
        title: {
          [Op.iLike]: `%${query}%`,
        },
      },
    });
    console.log('Search results:', results);
    res.json(results);
  })
);

// Create an event
router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { title, image, time, summary, ticketPrice, categoryId } = req.body;
    const host = req.user.username; // Use logged-in user's username as the host

    const newEvent = await Event.create({
      title,
      image: image || '/public/images/default.png', // Default image if none provided
      host,
      time,
      summary,
      ticketPrice,
      categoryId,
    });

    // Fetch the created event along with its associated Category
    const createdEvent = await Event.findByPk(newEvent.id, {
      include: Category,
    });

    console.log('Event created:', createdEvent.toJSON());
    res.status(201).json(createdEvent);
  })
);

/* DELETE */

// Unregister from an event
router.delete(
  '/:id/registration',
  requireAuth,
  asyncHandler(async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user.id;

    const registration = await Registration.findOne({ where: { eventId, userId } });
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found.' });
    }
    await registration.destroy();
    console.log('User unregistered from event:', eventId);
    res.json(eventId);
  })
);

// Remove event from favorites
router.delete(
  '/:id/favorites',
  requireAuth,
  asyncHandler(async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user.id;

    const favorite = await Favorite.findOne({ where: { eventId, userId } });
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found.' });
    }
    await favorite.destroy();
    console.log('Event removed from favorites:', eventId);
    res.json(eventId);
  })
);

// Delete a created event
router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const eventId = req.params.id;

    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    if (event.host !== user.username) {
      return res.status(403).json({ message: 'Forbidden: Only the creator can delete this event.' });
    }

    // Deleting dependent records before deleting the event
    await Registration.destroy({ where: { eventId } });
    await Favorite.destroy({ where: { eventId } });

    await event.destroy();
    console.log('Event deleted successfully:', eventId);
    res.json({ message: 'Event deleted successfully.', eventId });
  })
);

module.exports = router;
