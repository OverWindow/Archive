import requests

url = "https://api.edenai.run/v2/image/object_detection"

payload = {
    "response_as_dict": True,
    "attributes_as_list": False,
    "show_original_response": False,
    "providers": "google",
    "file_url": "https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg"
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjlkNjdjYzctODM5ZS00MTI3LWE1MTktOWE4Njc3MzVjNTNmIiwidHlwZSI6ImFwaV90b2tlbiJ9.k7kK6IVUdSGcfqZ0Qa_ShC8W7yX4C3qt8eniawk3OKw"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())