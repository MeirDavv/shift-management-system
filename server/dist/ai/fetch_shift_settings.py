import os
import requests
from dotenv import load_dotenv

def get_shift_settings():
    # Load environment variables from .env file
    load_dotenv()

    # Load the API key from an environment variable
    api_key = os.getenv('AI_API_KEY')

    # Define the API URL
    api_url = os.getenv("REACT_APP_BASE_URL")
    endpoint = "/shiftSettings/all"
    url = f'${api_url}{endpoint}'

    # Define headers with the API key
    headers = {
        "Authorization": f"Bearer {api_key}"
    }

    response = requests.get(url, headers=headers)

    data = response.json()
    organized_data = {row['id']:{'min_employee_count':row['min_employee_count'],'max_employee_count':row['max_employee_count']} for row in data}
    return organized_data

