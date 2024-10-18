import json
import pymongo
from pymongo import MongoClient

def lambda_handler(event, context):
    # Create a MongoDB client
    client = MongoClient('mongodb+srv://anand:anand@awsmongodb.azydu.mongodb.net/?retryWrites=true&w=majority&appName=AWSMongoDB')
    db = client['book_store']
    collection = db['book_info']

    # Fetch query parameters
    query_params = event.get('queryStringParameters', {})

    book_id = query_params.get('book_id')
    offset = query_params.get('offset')
    limit = query_params.get('limit')

    # If book_id is provided, return that specific book
    if book_id:
        book = collection.find_one({"_id": book_id})
        if book:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET',
                },
                'body': json.dumps(book)
            }
        else:
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET',
                },
                'body': json.dumps({'error': 'Book not found'})
            }
    
    # If no book_id, handle pagination
    elif offset is not None and limit is not None:
        try:
            offset = int(offset)
            limit = int(limit)
        except ValueError:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET',
                },
                'body': json.dumps({'error': 'Invalid offset or limit value'})
            }

        # Fetch books with pagination
        books = list(collection.find().skip(offset).limit(limit))
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET',
            },
            'body': json.dumps(books)
        }

    # If neither book_id nor offset and limit are provided, return an error
    else:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET',
            },
            'body': json.dumps({'error': 'Query parameters are required'})
        }
