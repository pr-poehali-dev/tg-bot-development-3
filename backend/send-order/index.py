import json
import os
from typing import Dict, Any
import urllib.request
import urllib.parse

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send order details to Telegram admin
    Args: event with httpMethod, body containing order data
    Returns: HTTP response with success/error status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    admin_chat_id = os.environ.get('TELEGRAM_ADMIN_CHAT_ID', '7837501582')
    
    if not bot_token:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Bot token not configured'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    customer_name = body_data.get('customerName', 'Не указано')
    customer_contact = body_data.get('customerContact', 'Не указано')
    items = body_data.get('items', [])
    total_price = body_data.get('totalPrice', 0)
    
    message_lines = [
        '🛒 <b>Новый заказ!</b>',
        '',
        f'👤 <b>Покупатель:</b> {customer_name}',
        f'📱 <b>Контакт:</b> {customer_contact}',
        '',
        '<b>📦 Товары:</b>'
    ]
    
    for item in items:
        message_lines.append(f"• {item.get('title', 'Товар')} × {item.get('quantity', 1)} = {item.get('price', 0) * item.get('quantity', 1)} ₽")
    
    message_lines.append('')
    message_lines.append(f'💰 <b>Итого:</b> {total_price} ₽')
    
    message = '\n'.join(message_lines)
    
    telegram_url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    data = {
        'chat_id': admin_chat_id,
        'text': message,
        'parse_mode': 'HTML'
    }
    
    req = urllib.request.Request(
        telegram_url,
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            response_data = json.loads(response.read().decode('utf-8'))
            
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Заказ отправлен'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
