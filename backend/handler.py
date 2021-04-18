import json
import os
from google.oauth2 import id_token
from google.auth.transport import requests
import boto3

from db_ops import chat_ops

headers = {
    'Access-Control-Allow-Origin': '*'
}

dynamodb = boto3.resource('dynamodb',region_name='us-east-1')

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
    return id_info

def chats(event, context):
    if event['httpMethod'] == 'OPTIONS':
        return {
            "statusCode": 200,
            "headers": headers
        }

    if 'localhost' in event['headers']['Origin']:
        dynamodb = None

    if event["path"] == "/chats" and event['httpMethod'] == "GET":
        token = event["headers"]["Authorization"]
        user = auth(token)
        data = chat_ops.list_chatrooms(user['sub'], dynamodb)
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps(data)
        }

def chatrooms(event, context):
    if event['httpMethod'] == 'OPTIONS':
        return {
            "statusCode": 200,
            "headers": headers
        }
    
    if 'localhost' in event['headers']['Origin']:
        dynamodb = None

    if event["path"] == "/chatrooms" and event['httpMethod'] == "POST":
        token = event["headers"]["Authorization"]
        user = auth(token)

        if (not event["body"]):
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps('Missing body')
            }
        
        body = json.loads(event["body"])
        body['userKey'] = user['sub']
        result = chat_ops.put_room(body['chatId'], body['userKey'], body['info'], dynamodb)

        return {
            'statusCode': 201,
            'headers': headers,
            'body': json.dumps(result)    
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
