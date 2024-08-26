import requests

def get_employees():

    api_url = "http://localhost:3001/user/all/names"

    try:
        response = requests.get(api_url)

        if response.status_code == 200:
            employees = response.json()
            return employees

        else:
            print(f"Failed to retrieve data. Status code: {response.status_code}")
            return None

    except Exception as e:
        print(f"An error occured: {e}")
        return None
