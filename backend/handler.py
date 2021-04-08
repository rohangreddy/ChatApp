import json
import os
from google.oauth2 import id_token
from google.auth.transport import requests


path = 'C:/Users/rohan/Documents/Cornell-Tech/Spring-2021/CS-5356/ChatApp/backend/'

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

def chats(event, context):
    if event["path"] == "/chats" and event['httpMethod'] == "GET":
        
        token = event["headers"]["Authorization"]
        auth(token)
        filename = os.path.join(path, 'test.json')
        with open(filename) as file:
            data = json.load(file)
            return {
                "statusCode": 200,
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
