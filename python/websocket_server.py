import asyncio
import websockets
import json
import cv2
import base64
import numpy as np
from bisindo_recognition import BisindoRecognizer
from datetime import datetime

recognizer = BisindoRecognizer()

async def process_frame(websocket, path):
    try:
        while True:
            # Receive frame from client
            frame_data = await websocket.recv()
            
            # Convert base64 image to numpy array
            encoded_data = frame_data.split(',')[1]
            nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            # Process frame
            gesture, confidence, mask = recognizer.recognize(frame)
            
            # Prepare response
            response = {
                'gesture': gesture if gesture else None,
                'confidence': float(confidence) if confidence else 0.0,
                'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'current_word': recognizer.get_current_word(),
                'stats': {
                    'total_detections': recognizer.stats['total_detections'],
                    'word_count': recognizer.stats['word_count'],
                    'avg_confidence': float(recognizer.stats['avg_confidence']),
                    'session_duration': recognizer.get_session_duration(),
                    'top_letters': dict(recognizer.stats['letter_counts'].most_common(3)),
                    'detection_streak': recognizer.stats['detection_streak'],
                    'max_streak': recognizer.stats['max_streak']
                }
            }
            
            # Send response
            await websocket.send(json.dumps(response))
            
    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected")
    except Exception as e:
        print(f"Error: {e}")
        
async def main():
    server = await websockets.serve(
        process_frame,
        "localhost",
        8765,
        ping_interval=None
    )
    print("WebSocket server started on ws://localhost:8765")
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main()) 