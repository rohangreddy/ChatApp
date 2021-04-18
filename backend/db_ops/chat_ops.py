import boto3
from boto3.dynamodb.conditions import Key

def list_chatrooms(userKey, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")
    
    table = dynamodb.Table('Chatrooms')
    response = table.query(
        IndexName="userKey-chatId-index",
        KeyConditionExpression=Key('userKey').eq(userKey)
    )
    return response['Items']

def put_room(chatId, userKey, members, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.Table('Chatrooms')
    response = table.put_item(
        Item={
            'chatId': chatId,
            'userKey': userKey,
            'info': members
        }
    )
    return response

