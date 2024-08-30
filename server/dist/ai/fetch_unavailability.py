import os
import requests
from dotenv import load_dotenv

def get_unavailability():
    # Load environment variables from .env file
    load_dotenv()

    # Load the API key from an environment variable
    api_key = os.getenv('AI_API_KEY')

    # Define the API URL
    api_url = os.getenv("REACT_APP_API_URL")
    endpoint = "/unavailability/all"
    url = f'${api_url}{endpoint}'

    # Define headers with the API key
    headers = {
        "Authorization": f"Bearer {api_key}"
    }

    response = requests.get(url, headers=headers)

    data = response.json()

    filtered_data = [item for item in data if item["is_unavailable"] == True]

    return filtered_data
