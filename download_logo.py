import requests
import os

url = "https://todozorras.com.ar/img/logo-1648042967.jpg"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    
    os.makedirs("img", exist_ok=True)
    with open("img/logo.jpg", "wb") as f:
        f.write(response.content)
    print("Logo downloaded successfully to img/logo.jpg")
except Exception as e:
    print(f"Error downloading logo: {e}")
