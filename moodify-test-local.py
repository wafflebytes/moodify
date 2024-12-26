import sys
import os

# Add virtual environment site-packages to Python path
venv_path = os.path.expanduser('~/building-your-own-flows/venv/lib/python3.10/site-packages')
sys.path.append(venv_path)

try:
    from mira_sdk import MiraClient, Flow
except ImportError as e:
    print(json.dumps({
        "error": f"Failed to import mira_sdk: {str(e)}",
        "details": f"Python path: {sys.path}",
        "solution": "Check virtual environment configuration"
    }), file=sys.stderr)
    sys.exit(1)

from dotenv import load_dotenv
import json
import traceback

# Load environment variables from .env file
load_dotenv()

def generate_playlist(input_data):
    try:
        api_key = os.getenv("API_KEY")
        if not api_key:
            raise ValueError("API_KEY not found in environment variables")

        print(f"Input data received: {json.dumps(input_data)}", file=sys.stderr)

        client = MiraClient(config={"API_KEY": api_key})
        flow = Flow(source="flow.yaml")

        response = client.flow.test(flow, input_data)
        print(json.dumps(response))

    except Exception as e:
        error_details = {
            "error": str(e),
            "traceback": traceback.format_exc()
        }
        print(json.dumps(error_details), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    try:
        if len(sys.argv) <= 1:
            raise ValueError("No input data provided")

        input_data = json.loads(sys.argv[1])
        generate_playlist(input_data)

    except Exception as e:
        error_details = {
            "error": str(e),
            "traceback": traceback.format_exc()
        }
        print(json.dumps(error_details), file=sys.stderr)
        sys.exit(1)
