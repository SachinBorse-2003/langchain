import argparse
import json
import os
import requests
from argparse import RawTextHelpFormatter
from typing import Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Constants
BASE_API_URL = "https://api.langflow.astra.datastax.com"
LANGFLOW_ID = os.getenv("LANGFLOW_ID")
FLOW_ID = os.getenv("FLOW_ID")
APPLICATION_TOKEN = os.getenv("APPLICATION_TOKEN")
ENDPOINT = ""  # Optional endpoint

# Default tweaks (modify as needed)
TWEAKS = {
    "ChatInput-a3qts": {},
    "Prompt-bqRNT": {},
    "OpenAIModel-sJKA8": {},
    "ChatOutput-TA8fZ": {},
    "AstraDB-1873r": {},
    "OpenAIEmbeddings-FrSFP": {},
    "ParseData-SR2Gb": {}
}

def run_flow(message: str, endpoint: str, output_type: str = "chat", input_type: str = "chat",
             tweaks: Optional[dict] = None) -> dict:
    """
    Run a Langflow flow with a given message and optional tweaks.
    """
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{endpoint}"
    payload = {
        "input_value": message,
        "output_type": output_type,
        "input_type": input_type,
    }
    if tweaks:
        payload["tweaks"] = tweaks

    headers = {"Authorization": f"Bearer {APPLICATION_TOKEN}", "Content-Type": "application/json"}
    response = requests.post(api_url, json=payload, headers=headers)
    response.raise_for_status()
    return response.json()

def main():
    parser = argparse.ArgumentParser(
        description="Run a Langflow flow with a given message and optional tweaks.",
        formatter_class=RawTextHelpFormatter
    )
    parser.add_argument("message", type=str, help="The message to send to the flow")
    parser.add_argument("--endpoint", type=str, default=ENDPOINT or FLOW_ID, help="Flow ID or endpoint")
    parser.add_argument("--tweaks", type=str, help="JSON string for tweaks", default=json.dumps(TWEAKS))
    parser.add_argument("--output_type", type=str, default="chat", help="The output type")
    parser.add_argument("--input_type", type=str, default="chat", help="The input type")

    args = parser.parse_args()
    tweaks = json.loads(args.tweaks)

    response = run_flow(
        message=args.message,
        endpoint=args.endpoint,
        output_type=args.output_type,
        input_type=args.input_type,
        tweaks=tweaks
    )
    print(json.dumps(response, indent=2))

if __name__ == "__main__":
    main()