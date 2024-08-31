import os
import requests
from dotenv import load_dotenv
import json


def update_availability(shifts):
    # Load environment variables from .env file
    load_dotenv()

    # Load the API key from an environment variable
    api_key = os.getenv('AI_API_KEY')

    # Define the API URL
    api_url = os.getenv("BASE_URL")
    endpoint = "/api/shifts"
    url = f'{api_url}{endpoint}'

    #Define headers with the API key
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    # Send the POST request to update the shifts
    response = requests.post(url, headers = headers, data=json.dumps(shifts))

        # Check the response
    if response.status_code == 200:
        print("Shifts updated successfully.")
    else:
        print(f"Failed to update shifts. Status code: {response.status_code}")
        print(f"Response: {response.text}")