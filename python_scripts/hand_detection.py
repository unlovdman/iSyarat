import cv2
import numpy as np

def detect_skin(frame):
    # Convert to HSV color space
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # Define range for skin color in HSV
    lower_skin = np.array([0, 20, 70], dtype=np.uint8)
    upper_skin = np.array([20, 255, 255], dtype=np.uint8)
    
    # Create binary mask for skin color
    mask = cv2.inRange(hsv, lower_skin, upper_skin)
    
    # Apply morphological operations to remove noise
    kernel = np.ones((3,3), np.uint8)
    mask = cv2.erode(mask, kernel, iterations=2)
    mask = cv2.dilate(mask, kernel, iterations=2)
    
    # Blur the mask
    mask = cv2.GaussianBlur(mask, (5,5), 100)
    
    return mask

def find_largest_contour(mask):
    # Find contours
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    
    if not contours:
        return None
    
    # Find largest contour
    max_contour = max(contours, key=cv2.contourArea)
    
    # Filter small contours
    if cv2.contourArea(max_contour) < 1000:
        return None
        
    return max_contour

def analyze_hand_gesture(contour):
    if contour is None:
        return "No hand detected"
    
    # Get convex hull
    hull = cv2.convexHull(contour, returnPoints=False)
    defects = cv2.convexityDefects(contour, hull)
    
    if defects is None:
        return "Unknown gesture"
    
    # Count fingers
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
        
        # Angle less than 90 indicates a finger
        if angle <= 90:
            finger_count += 1
    
    return f"Detected {finger_count + 1} fingers"

def main():
    # Start video capture
    cap = cv2.VideoCapture(0)
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        # Flip frame horizontally for mirror effect
        frame = cv2.flip(frame, 1)
        
        # Detect skin
        skin_mask = detect_skin(frame)
        
        # Find hand contour
        hand_contour = find_largest_contour(skin_mask)
        
        if hand_contour is not None:
            # Draw contour
            cv2.drawContours(frame, [hand_contour], -1, (0, 255, 0), 2)
            
            # Analyze gesture
            gesture = analyze_hand_gesture(hand_contour)
            cv2.putText(frame, gesture, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        
        # Show frames
        cv2.imshow('Original', frame)
        cv2.imshow('Skin Mask', skin_mask)
        
        # Break loop on 'q' press
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main() 