import os
from dotenv import load_dotenv
import requests

def generate_tweet(text):
    

    load_dotenv()

    try:
        # Make the request to the Llama API on Server
        response = requests.post(
            os.getenv("LLAMA_API_URL"),
            json={
                "model": "llama-3.2-1b-instruct",
                "messages": [
                    {"role": "system", "content": "Make a tweet from the following text in the language it is written:"},
                    {"role": "user", "content": text},
                ],
                "temperature": 0.7,
                "max_tokens": -1,
                "stream": False,
            },
        )
        if response.status_code != 200:
            return f"Error generating tweet: {response.text}"
        
        response_data = response.json().get("choices")[0].get("message").get("content")
        return response_data
    except Exception as e:
        return f"Error generating tweet: {str(e)}"
