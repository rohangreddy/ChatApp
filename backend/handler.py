import json
import os
from google.oauth2 import id_token
from google.auth.transport import requests

headers = {
    'Access-Control-Allow-Origin': '*'
}

def auth(token):
    request = requests.Request()
    if not token:
        return {
            "statusCode": 401
        }
    id_info = id_token.verify_firebase_token(token, request)
    if not id_info:
        return {
            "statusCode": 401
        }
    userid = id_info['sub']
    print(userid)

def chats(event, context):
    if event['httpMethod'] == 'OPTIONS':
        return {
            "statusCode": 200,
            "headers": headers
        }

    if event["path"] == "/chats" and event['httpMethod'] == "GET":
        
        token = event["headers"]["Authorization"]
        auth(token)
        data = [
            {
                "room_name": "Chatroom1", 
                "room_id": "unique_identifier1", 
                "member_ids": ["rr784 ", "user1 ", "user2 ", "user3"],
                "num_msgs": 20
            },
            {
                "room_name": "Chatroom2", 
                "room_id": "unique_identifier2", 
                "member_ids": ["rr784 ", "user1"],
                "num_msgs": 5
            }
        ]
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps(data)
        }



def hello(event, context):
    if event["httpMethod"] == "GET" and event["path"] == "/whoami":
        
        response = {
            "statusCode": 200,
            "body": json.dumps({"username": "rr784"})
        }
    else:
        body = {
            "message": "Go Serverless v1.0! Your function executed successfully!",
            "input": event
        }

        response = {
            "statusCode": 200,
            "body": json.dumps(body)
        }

    return response 



    # Use this code if you don't use the http event with the LAMBDA-PROXY
    # integration
    """
    return {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "event": event
    }
    """
