import os
import time
import hmac
import hashlib
import base64
import requests
import urllib.parse
import uuid
import tweepy

def generate_oauth_signature(method, url, params, consumer_secret, token_secret=""):
    # Ordenar los parámetros alfabéticamente y codificarlos
    sorted_params = {k: urllib.parse.quote(v, safe='') for k, v in sorted(params.items())}
    encoded_params = "&".join(f"{k}={v}" for k, v in sorted_params.items())
    
    # Crear la base string
    base_string = f"{method.upper()}&{urllib.parse.quote(url, safe='')}&{urllib.parse.quote(encoded_params, safe='')}"

    # Crear la signing key
    signing_key = f"{urllib.parse.quote(consumer_secret, safe='')}&{urllib.parse.quote(token_secret, safe='')}"

    # Calcular la firma HMAC-SHA1
    hashed = hmac.new(signing_key.encode('utf-8'), base_string.encode('utf-8'), hashlib.sha1)
    signature = base64.b64encode(hashed.digest()).decode('utf-8')
    
    return signature

import os
import requests

def post_tweet(access_token, tweet_text):
    """
    Publica un tweet utilizando OAuth 2.0 con el token de acceso.
    
    Args:
        access_token (str): El token de acceso generado tras la autenticación.
        tweet_text (str): El texto del tweet que deseas publicar.
    """
    # URL del endpoint de la API de Twitter para publicar tweets
    url = "https://api.twitter.com/2/tweets"

    # Encabezados para la solicitud
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    # Cuerpo de la solicitud
    payload = {
        "text": tweet_text
    }

    # Realizar la solicitud POST
    response = requests.post(url, headers=headers, json=payload)

    # Manejar la respuesta
    if response.status_code == 201:
        print("Tweet posted successfully!")
        print("Response:", response.json())
    else:
        print(f"Failed to post tweet. Status code: {response.status_code}")
        print("Response:", response.json())