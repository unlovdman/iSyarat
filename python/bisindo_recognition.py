import cv2
import numpy as np
import json
from datetime import datetime
from collections import Counter
from hand_detection import detect_skin, find_contours
import os

class BisindoRecognizer:
    def __init__(self):
        
        self.templates = {
            'A': {'fingers': 1, 'aspect_ratio': 2.0, 'area_ratio': 0.6},
            'B': {'fingers': 4, 'aspect_ratio': 1.5, 'area_ratio': 0.7},
            'C': {'fingers': 0, 'aspect_ratio': 1.2, 'area_ratio': 0.5},
            'D': {'fingers': 1, 'aspect_ratio': 1.8, 'area_ratio': 0.65},
            'E': {'fingers': 0, 'aspect_ratio': 1.3, 'area_ratio': 0.8},
            'F': {'fingers': 3, 'aspect_ratio': 1.6, 'area_ratio': 0.6},
            'G': {'fingers': 1, 'aspect_ratio': 1.4, 'area_ratio': 0.7},
            'H': {'fingers': 2, 'aspect_ratio': 1.7, 'area_ratio': 0.65},
            'I': {'fingers': 1, 'aspect_ratio': 2.2, 'area_ratio': 0.55},
            'J': {'fingers': 1, 'aspect_ratio': 2.1, 'area_ratio': 0.6},
            'K': {'fingers': 2, 'aspect_ratio': 1.6, 'area_ratio': 0.7},
            'L': {'fingers': 2, 'aspect_ratio': 1.9, 'area_ratio': 0.6},
            'M': {'fingers': 3, 'aspect_ratio': 1.4, 'area_ratio': 0.75},
            'N': {'fingers': 2, 'aspect_ratio': 1.5, 'area_ratio': 0.7},
            'O': {'fingers': 0, 'aspect_ratio': 1.1, 'area_ratio': 0.9},
            'P': {'fingers': 3, 'aspect_ratio': 1.7, 'area_ratio': 0.65},
            'Q': {'fingers': 2, 'aspect_ratio': 1.6, 'area_ratio': 0.7},
            'R': {'fingers': 2, 'aspect_ratio': 1.8, 'area_ratio': 0.6},
            'S': {'fingers': 0, 'aspect_ratio': 1.3, 'area_ratio': 0.8},
            'T': {'fingers': 1, 'aspect_ratio': 1.9, 'area_ratio': 0.6},
            'U': {'fingers': 2, 'aspect_ratio': 1.7, 'area_ratio': 0.65},
            'V': {'fingers': 2, 'aspect_ratio': 1.8, 'area_ratio': 0.6},
            'W': {'fingers': 3, 'aspect_ratio': 1.6, 'area_ratio': 0.7},
            'X': {'fingers': 1, 'aspect_ratio': 1.5, 'area_ratio': 0.7},
            'Y': {'fingers': 2, 'aspect_ratio': 2.0, 'area_ratio': 0.55},
            'Z': {'fingers': 1, 'aspect_ratio': 1.4, 'area_ratio': 0.75}
        }
        
        self.history = []
        self.current_gesture = None
        self.confidence = 0.0
        self.detection_history = []
        self.word_buffer = []
        self.last_gesture_time = datetime.now()
        self.GESTURE_TIMEOUT = 2.0  
        
        self.stats = {
            'total_detections': 0,
            'letter_counts': Counter(),
            'word_count': 0,
            'avg_confidence': 0.0,
            'confidence_sum': 0.0,  # Added for better average calculation
            'start_time': datetime.now(),
            'session_id': datetime.now().strftime('%Y%m%d_%H%M%S'),  # Added unique session ID
            'last_detection_time': None,  # Added for tracking intervals
            'detection_intervals': [],  # Added for timing analysis
            'top_combinations': Counter(),  # Added for tracking letter combinations
            'detection_streak': 0,  # Added for tracking consecutive detections
            'max_streak': 0  # Added for tracking best streak
        }
        
    def calculate_features(self, contour, defects):
        if contour is None:
            return None, None, None
            
        x,y,w,h = cv2.boundingRect(contour)
        aspect_ratio = float(w)/h
        
        # Calculate area ratio
        hull_area = cv2.contourArea(cv2.convexHull(contour))
        contour_area = cv2.contourArea(contour)
        area_ratio = float(contour_area)/hull_area if hull_area > 0 else 0
        
        # Count fingers
        finger_count = self._count_fingers(contour, defects)
        
        return finger_count, aspect_ratio, area_ratio
        
    def _count_fingers(self, contour, defects):
        if defects is None:
            return 0
            
        finger_count = 0
        for i in range(defects.shape[0]):
            s,e,f,d = defects[i,0]
            start = tuple(contour[s][0])
            end = tuple(contour[e][0])
            far = tuple(contour[f][0])
            
            # Calculate angle between fingers
            a = np.sqrt((end[0] - start[0])**2 + (end[1] - start[1])**2)
            b = np.sqrt((far[0] - start[0])**2 + (far[1] - start[1])**2)
            c = np.sqrt((end[0] - far[0])**2 + (end[1] - far[1])**2)
            angle = np.arccos((b**2 + c**2 - a**2)/(2*b*c)) * 57
            
            if angle <= 90:
                finger_count += 1
                
        return finger_count + 1
        
    def save_detection(self, gesture, confidence):
        if gesture and confidence > 0.7:
            detection = {
                'gesture': gesture,
                'confidence': confidence,
                'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            }
            self.detection_history.append(detection)
            
            # Update word buffer
            self.update_word_buffer(gesture)
            
            # Save to file every 10 detections
            if len(self.detection_history) >= 10:
                self.save_history_to_file()
                self.detection_history = []
            
            # Update stats
            self.update_stats(gesture, confidence)
    
    def save_history_to_file(self):
        try:
            # Create storage directory if it doesn't exist
            storage_dir = '../storage/app/public'
            if not os.path.exists(storage_dir):
                os.makedirs(storage_dir)
            
            # Load existing history
            history_file = os.path.join(storage_dir, 'detection_history.json')
            try:
                with open(history_file, 'r') as f:
                    existing_history = json.load(f)
            except FileNotFoundError:
                existing_history = []
                
            # Append new detections
            existing_history.extend(self.detection_history)
            
            # Save updated history
            with open(history_file, 'w') as f:
                json.dump(existing_history, f, indent=2)
        except Exception as e:
            print(f"Error saving history: {e}")
            
    def update_word_buffer(self, gesture):
        current_time = datetime.now()
        time_diff = (current_time - self.last_gesture_time).total_seconds()
        
        if time_diff > self.GESTURE_TIMEOUT and self.word_buffer:
            self.save_word()
            self.word_buffer = []
            
        # Add new gesture to buffer if it's different from the last one
        if not self.word_buffer or gesture != self.word_buffer[-1]:
            self.word_buffer.append(gesture)
            self.last_gesture_time = current_time
            
    def save_word(self):
        if not self.word_buffer:
            return
            
        word = ''.join(self.word_buffer)
        detection = {
            'word': word,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'letters': self.word_buffer.copy()
        }
        
        try:
            # Create storage directory if it doesn't exist
            storage_dir = '../storage/app/public'
            if not os.path.exists(storage_dir):
                os.makedirs(storage_dir)
            
            # Load existing words
            words_file = os.path.join(storage_dir, 'detected_words.json')
            try:
                with open(words_file, 'r') as f:
                    words_history = json.load(f)
            except FileNotFoundError:
                words_history = []
                
            words_history.append(detection)
            
            with open(words_file, 'w') as f:
                json.dump(words_history, f, indent=2)
        except Exception as e:
            print(f"Error saving word: {e}")
            
    def get_current_word(self):
        return ''.join(self.word_buffer) if self.word_buffer else ''
        
    def recognize(self, frame):
        mask = detect_skin(frame)
        contour, hull, defects = find_contours(mask)
        
        if contour is None:
            return None, 0.0, mask
            
        # Calculate features
        fingers, aspect_ratio, area_ratio = self.calculate_features(contour, defects)
        
        # Compare with templates
        max_confidence = 0.0
        recognized_gesture = None
        
        for gesture, template in self.templates.items():
            # Calculate confidence based on feature matching
            finger_conf = 1.0 if fingers == template['fingers'] else 0.0
            aspect_conf = 1.0 - min(abs(aspect_ratio - template['aspect_ratio']), 1.0)
            area_conf = 1.0 - min(abs(area_ratio - template['area_ratio']), 1.0)
            
            # Weight the confidence measures
            confidence = (finger_conf * 0.5 + aspect_conf * 0.3 + area_conf * 0.2)
            
            if confidence > max_confidence:
                max_confidence = confidence
                recognized_gesture = gesture
        
        # Update history
        if max_confidence > 0.7:  # Confidence threshold
            self.history.append(recognized_gesture)
            if len(self.history) > 10:
                self.history.pop(0)
                
            # Get most common gesture in history
            if len(self.history) >= 5:
                from collections import Counter
                common = Counter(self.history).most_common(1)
                if common[0][1] >= 3:  # If gesture appears at least 3 times
                    self.current_gesture = common[0][0]
                    self.confidence = max_confidence
        
        # Save detection if confidence is high enough
        if max_confidence > 0.7:
            self.save_detection(recognized_gesture, max_confidence)
        
        return self.current_gesture, self.confidence, mask
        
    def update_stats(self, gesture, confidence):
        if gesture and confidence > 0.7:
            current_time = datetime.now()
            
            # Update basic counts
            self.stats['total_detections'] += 1
            self.stats['letter_counts'][gesture] += 1
            
            # Update confidence metrics
            self.stats['confidence_sum'] += confidence
            self.stats['avg_confidence'] = self.stats['confidence_sum'] / self.stats['total_detections']
            
            # Update timing metrics
            if self.stats['last_detection_time']:
                interval = (current_time - self.stats['last_detection_time']).total_seconds()
                self.stats['detection_intervals'].append(interval)
            self.stats['last_detection_time'] = current_time
            
            # Update streak metrics
            self.stats['detection_streak'] += 1
            self.stats['max_streak'] = max(self.stats['max_streak'], self.stats['detection_streak'])
            
            # Update letter combinations (pairs)
            if len(self.word_buffer) >= 2:
                pair = self.word_buffer[-2] + gesture
                self.stats['top_combinations'][pair] += 1

    def get_session_duration(self):
        duration = datetime.now() - self.stats['start_time']
        minutes = duration.total_seconds() / 60
        return f"{minutes:.1f}"
        
    def save_stats(self):
        stats_data = {
            'session_id': self.stats['session_id'],
            'total_detections': self.stats['total_detections'],
            'letter_frequencies': dict(self.stats['letter_counts']),
            'word_count': self.stats['word_count'],
            'average_confidence': self.stats['avg_confidence'],
            'session_duration_minutes': float(self.get_session_duration()),
            'timestamp': {
                'start': self.stats['start_time'].strftime('%Y-%m-%d %H:%M:%S'),
                'end': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            },
            'performance_metrics': {
                'max_detection_streak': self.stats['max_streak'],
                'avg_detection_interval': sum(self.stats['detection_intervals']) / len(self.stats['detection_intervals']) if self.stats['detection_intervals'] else 0,
                'top_letter_combinations': dict(self.stats['top_combinations'].most_common(5))
            }
        }
        
        try:
            # Create storage directories if they don't exist
            storage_dir = '../storage/app/public'
            sessions_dir = os.path.join(storage_dir, 'sessions')
            for directory in [storage_dir, sessions_dir]:
                if not os.path.exists(directory):
                    os.makedirs(directory)
            
            # Load existing stats
            stats_file = os.path.join(storage_dir, 'recognition_stats.json')
            try:
                with open(stats_file, 'r') as f:
                    stats_history = json.load(f)
            except FileNotFoundError:
                stats_history = []
                
            # Add new stats
            stats_history.append(stats_data)
            
            # Save updated stats
            with open(stats_file, 'w') as f:
                json.dump(stats_history, f, indent=2)
                
            # Also save current session separately
            session_filename = os.path.join(sessions_dir, f'session_{self.stats["session_id"]}.json')
            with open(session_filename, 'w') as f:
                json.dump(stats_data, f, indent=2)
        except Exception as e:
            print(f"Error saving stats: {e}")
            
    def draw_stats(self, frame):
        # Draw statistics on frame
        stats_text = [
            f"Session ID: {self.stats['session_id']}",
            f"Duration: {self.get_session_duration()} min",
            f"Detections: {self.stats['total_detections']}",
            f"Words: {self.stats['word_count']}",
            f"Avg Conf: {self.stats['avg_confidence']:.2f}",
            f"Streak: {self.stats['detection_streak']} (Max: {self.stats['max_streak']})"
        ]
        
        y_pos = 150
        for text in stats_text:
            cv2.putText(frame, text, (10, y_pos),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,0,255), 2)
            y_pos += 30
            
        # Draw most frequent letters
        if self.stats['letter_counts']:
            most_common = self.stats['letter_counts'].most_common(3)
            cv2.putText(frame, "Most used:", (10, y_pos),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,0,255), 2)
            y_pos += 30
            
            for letter, count in most_common:
                cv2.putText(frame, f"{letter}: {count}", (10, y_pos),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,0,255), 2)
                y_pos += 30
                
        # Draw top letter combinations
        if self.stats['top_combinations']:
            top_pairs = self.stats['top_combinations'].most_common(2)
            cv2.putText(frame, "Top pairs:", (10, y_pos),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,0,255), 2)
            y_pos += 30
            
            for pair, count in top_pairs:
                cv2.putText(frame, f"{pair}: {count}", (10, y_pos),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,0,255), 2)
                y_pos += 30

def main():
    cap = cv2.VideoCapture(0)
    recognizer = BisindoRecognizer()
    
    print("BISINDO Recognition Started")
    print("Press 'q' to quit")
    print("Press 'space' to finish current word")
    print("Detection history will be saved to 'detection_history.json'")
    print("Words will be saved to 'detected_words.json'")
    print("Statistics will be saved to 'recognition_stats.json'")
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        # Flip frame horizontally
        frame = cv2.flip(frame, 1)
        
        # Recognize gesture
        gesture, confidence, mask = recognizer.recognize(frame)
        
        # Draw results
        if gesture:
            text = f'{gesture}: {confidence:.2f}'
            cv2.putText(frame, text, (10,50), 
                       cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
                       
        # Draw current word
        current_word = recognizer.get_current_word()
        if current_word:
            cv2.putText(frame, f'Word: {current_word}', (10,100),
                       cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0), 2)
                       
        # Draw statistics
        recognizer.draw_stats(frame)
        
        # Show frames
        cv2.imshow('BISINDO Recognition', frame)
        cv2.imshow('Mask', mask)
        
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            # Save everything before quitting
            if recognizer.detection_history:
                recognizer.save_history_to_file()
            if recognizer.word_buffer:
                recognizer.save_word()
            recognizer.save_stats()
            break
        elif key == ord(' '):
            # Save current word and start a new one
            if recognizer.word_buffer:
                recognizer.save_word()
                recognizer.word_buffer = []
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main() 