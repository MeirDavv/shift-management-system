import requests
from dotenv import load_dotenv
import os

def get_employees():

    # Load environment variables from .env file
    load_dotenv()

    # Access the environment variable
    api_url = os.getenv("BASE_URL")
    endpoint = "/user/all"
    url = f'{api_url}{endpoint}'

    try:
        response = requests.get(url)

        if response.status_code == 200:
            employees = response.json()
            return employees

        else:
            print(f"Failed to retrieve data. Status code: {response.status_code}")
            return None

    except Exception as e:
        print(f"An error occured: {e}")
        return None
