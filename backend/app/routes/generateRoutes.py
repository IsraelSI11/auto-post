from flask import Blueprint, request, jsonify
from ..services.generateTweet import generate_tweet

generate_routes = Blueprint('generate_routes', __name__)

@generate_routes.route('/', methods=['POST'])
def generateTweet():
    data = request.get_json()
    text = data.get('text')
    
    if not text:
        return jsonify({'message': 'text of tweet is required'}), 400
    
    tweet = generate_tweet(text)

    return jsonify({'tweet': tweet}), 201
