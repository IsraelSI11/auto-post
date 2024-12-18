from openai import OpenAI
from dotenv import load_dotenv
import os

def generate_tweet(text):
    """
    Generates a tweet using the ChatGPT API.

    Parameters:
        text (str): The input text to generate the tweet from.

    Returns:
        str: The generated tweet or an error message.
    """

    client = OpenAI()

    load_dotenv()

    client.api_key = os.getenv('OPENAI_API_KEY')

    try:
        # Make the request to the ChatGPT API
        completion = client.chat.completions.create(
            model="o1-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant taht converts text to tweets."},
                {
                    "role": "user",
                    "content": f"Generate a tweet based on the following text in the language that is written: {text}",
                }
            ]
        )

        # Extract the generated tweet from the response
        tweet = completion.choices[0].text.strip()
        return tweet
    except Exception as e:
        return f"Error generating tweet: {str(e)}"
