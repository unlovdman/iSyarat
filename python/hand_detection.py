import cv2
import numpy as np

def detect_skin(frame):
    # Convert to HSV color space
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # Define range for skin color in HSV
    lower_skin = np.array([0, 20, 70], dtype=np.uint8)
    upper_skin = np.array([20, 255, 255], dtype=np.uint8)
    
    # Create binary mask for skin detection
    mask = cv2.inRange(hsv, lower_skin, upper_skin)
    
    # Apply morphological operations to remove noise
    kernel = np.ones((3,3), np.uint8)
    mask = cv2.erode(mask, kernel, iterations=2)
    mask = cv2.dilate(mask, kernel, iterations=2)
    
    # Blur the mask
    mask = cv2.GaussianBlur(mask, (5,5), 100)
    
    return mask

def find_contours(mask):
    # Find contours
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if contours:
        # Get the largest contour (assumed to be the hand)
        max_contour = max(contours, key=cv2.contourArea)
        
        # Get convex hull and defects
        hull = cv2.convexHull(max_contour)
        hull_indices = cv2.convexHull(max_contour, returnPoints=False)
        defects = cv2.convexityDefects(max_contour, hull_indices)
        
        return max_contour, hull, defects
    
    return None, None, None

def count_fingers(contour, defects):
    if defects is None:
        return 0
        
    # Count fingers based on convexity defects
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
        
        # If angle is less than 90 degrees, count as finger
        if angle <= 90:
            finger_count += 1
            
    return finger_count + 1

def main():
    # Initialize camera
    cap = cv2.VideoCapture(0)
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        # Flip frame horizontally for mirror effect
        frame = cv2.flip(frame, 1)
        
        # Detect skin
        mask = detect_skin(frame)
        
        # Find contours
        contour, hull, defects = find_contours(mask)
        
        if contour is not None:
            # Draw contour and hull
            cv2.drawContours(frame, [contour], -1, (0,255,0), 2)
            cv2.drawContours(frame, [hull], -1, (0,0,255), 2)
            
            # Count and display number of fingers
            fingers = count_fingers(contour, defects)
            cv2.putText(frame, f'Fingers: {fingers}', (10,50), 
                       cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0), 2)
        
        # Show frames
        cv2.imshow('Original', frame)
        cv2.imshow('Mask', mask)
        
        # Break loop on 'q' press
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main() 