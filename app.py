import pickle
import numpy as np
from flask import Flask, render_template, request

# Initialize the Flask application
app = Flask(__name__)

# Load the model and scaler
with open('linear_regression_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('scaler.pkl', 'rb') as scaler_file:
    scaler = pickle.load(scaler_file)

# Dictionary with car features (this should be updated with the correct feature values)
car_features = {
    "Honda Clarity EV": {
        "Acceleration_0_100": 2.331673,
        "Total_Power": -1.684137,
        "Height": -0.320512,
        "Seats": 0.504683,
        "Drive_Front": 1.957273,
        "Make_Honda_Clarity_EV": -0.517134,
        "Make_Hyundai_Ioniq_5": -0.493742,
        "Make_Maruti_Jimny_EV": -0.504683,
        "Make_Nissan_ARIYA": -0.473276
    },
    "Hyundai Ioniq 5": {
        "Acceleration_0_100": -0.353021,
        "Total_Power": 0.798742,
        "Height": 0.640831,
        "Seats": 0.504683,
        "Drive_Front": -0.510915,
        "Make_Honda_Clarity_EV": -0.517134,
        "Make_Hyundai_Ioniq_5": -0.493742,
        "Make_Maruti_Jimny_EV": -0.504683,
        "Make_Nissan_ARIYA": 2.112932
    },
    "Maruti Jimny EV": {
        "Acceleration_0_100": -1.369951,
        "Total_Power": -0.318553,
        "Height": 1.530315,
        "Seats": -1.251288,
        "Drive_Front": 1.281792,
        "Make_Honda_Clarity_EV": -0.517134,
        "Make_Hyundai_Ioniq_5": 0.055194,
        "Make_Maruti_Jimny_EV": -0.504683,
        "Make_Nissan_ARIYA": -0.473276
    },
    "Nissan ARIYA": {
        "Acceleration_0_100": -0.279189,
        "Total_Power": -0.059031,
        "Height": 1.530315,
        "Seats": -0.454045,
        "Drive_Front": 0.177227,
        "Make_Honda_Clarity_EV": -0.517134,
        "Make_Hyundai_Ioniq_5": 0.055194,
        "Make_Maruti_Jimny_EV": -0.504683,
        "Make_Nissan_ARIYA": 1.240255
    }
}

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')

# Route for the prediction page
@app.route('/predict', methods=['POST'])
def predict():
    car_name = request.form.get('car_name')

    if car_name in car_features:
        # Get the feature values for the selected car
        features = car_features[car_name]
        
        # Prepare the feature vector for prediction
        feature_vector = np.array(list(features.values())).reshape(1, -1)

        # Scale the features
        scaled_features = scaler.transform(feature_vector)

        # Make a prediction
        prediction = model.predict(scaled_features)[0]

        return render_template('index1.html', prediction=f"Predicted Range: {prediction:.2f} km")
    else:
        return render_template('index1.html', error="Invalid car selected or data unavailable.")

if __name__ == '__main__':
    app.run(debug=True)
