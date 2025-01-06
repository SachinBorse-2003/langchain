import os
from dotenv import load_dotenv
from astrapy import DataAPIClient

# Load environment variables
load_dotenv()

# AstraDB Configuration
ASTRA_DB_URL = os.getenv("ASTRA_DB_URL")
ASTRA_DB_KEYSPACE = os.getenv("ASTRA_DB_KEYSPACE")
ASTRA_DB_TOKEN = os.getenv("APPLICATION_TOKEN")

def connect_to_astra():
    client = DataAPIClient(ASTRA_DB_TOKEN)
    db = client.get_database_by_api_endpoint(
        ASTRA_DB_URL,
        keyspace=ASTRA_DB_KEYSPACE,
    )
    return db

def main():
    db = connect_to_astra()
    print(f"Connected to Astra DB: {db.list_collection_names()}")

if __name__ == "__main__":
    main()