import requests
from dotenv import load_dotenv
import os

def get_employees():

    # Load environment variables from .env file
    load_dotenv()

    # Access the environment variable
    api_url = os.getenv("BASE_URL")
    endpoint = "/api/user/all/names"
    url = f'{api_url}{endpoint}'

    try:
        response = requests.get(url)

        if response.status_code == 200:
            print("Raw response content:", response.text)  # Print the raw content of the response

            employees = response.json()
            return employees

        else:
            print(f"Failed to retrieve data. Status code: {response.status_code}")
            return None

    except Exception as e:
        print(f"An error occured: {e}")
        return None

emp = get_employees()
print(emp)