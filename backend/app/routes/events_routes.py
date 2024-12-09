from flask import Blueprint, request, jsonify
import requests
import os

# Define the blueprint for event routes
events_bp = Blueprint('events', __name__)

# Get the Eventbrite API key from environment variables
EVENTBRITE_API_KEY = os.getenv('EVENTBRITE_API_KEY')

@events_bp.route('', methods=['GET'])
def get_events():
    """
    Fetch events from the Eventbrite API based on the specified category.
    If no category is provided, default to 'music'.
    """
    # Retrieve category from query parameters
    category = request.args.get('category', 'music')  # Default to 'music' category

    # Construct the Eventbrite API URL
    url = f"https://www.eventbriteapi.com/v3/events/search/?categories={category}"

    # Send a GET request to the Eventbrite API with the Authorization header
    try:
        response = requests.get(
            url,
            headers={"Authorization": f"Bearer {EVENTBRITE_API_KEY}"}
        )
        
        # Handle non-200 responses
        if response.status_code != 200:
            return jsonify({
                "error": "Failed to fetch events from Eventbrite",
                "status_code": response.status_code,
                "details": response.json()
            }), response.status_code

        # Return the API response
        return jsonify(response.json())

    except requests.exceptions.RequestException as e:
        # Handle connection errors or other request exceptions
        return jsonify({
            "error": "An error occurred while connecting to Eventbrite",
            "details": str(e)
        }), 500
