from fastapi import FastAPI, HTTPException, Body
from astrapy import DataAPIClient
from dotenv import load_dotenv
import os
import requests
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from all origins. Replace "*" with specific origins for more security, e.g., ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all HTTP headers
)
# AstraDB Configuration
ASTRA_DB_URL = os.getenv("ASTRA_DB_URL")
ASTRA_DB_KEYSPACE = os.getenv("ASTRA_DB_KEYSPACE")
ASTRA_DB_TOKEN = os.getenv("APPLICATION_TOKEN")
client = DataAPIClient(ASTRA_DB_TOKEN)
db = client.get_database_by_api_endpoint(
    ASTRA_DB_URL,
    keyspace=ASTRA_DB_KEYSPACE,
)

# Langflow Configuration
BASE_API_URL = "https://api.langflow.astra.datastax.com"
LANGFLOW_ID = os.getenv("LANGFLOW_ID")
FLOW_ID = os.getenv("FLOW_ID")
APPLICATION_TOKEN = os.getenv("APPLICATION_TOKEN")

# Chatbot API
@app.post("/chatbot")
async def chatbot(message: str = Body(..., embed=True)):
    """
    Send a message to Langflow and retrieve the chatbot's response.
    """
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{FLOW_ID}"
    headers = {"Authorization": f"Bearer {APPLICATION_TOKEN}", "Content-Type": "application/json"}
    payload = {"input_value": message, "output_type": "chat", "input_type": "chat"}

    response = requests.post(api_url, json=payload, headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error communicating with Langflow.")
    
    # Extract and return just the message from the nested response
    langflow_response = response.json()
    try:
        message = langflow_response['outputs'][0]['outputs'][0]['artifacts']['message']
        return {"result": message}
    except (KeyError, IndexError) as e:
        raise HTTPException(status_code=500, detail=f"Unexpected response structure from Langflow: {str(e)}")

# Chart Data API

@app.get("/chart-data")
async def get_chart_data():
    """
    Retrieve data from the 'hackathondb' collection for charting.
    """
    try:
        collection = db.get_collection("hackathondb")
        data = collection.find()
        return list(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))