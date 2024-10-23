# Roadworthy Node Backend

This repository contains the backend code for the **RoadworthySL** Warrant of Fitness (WOF) assessment system. The backend is developed using **Node.js** with **Express.js** and is integrated with a Python machine learning model for predictive analysis of vehicle roadworthiness.

## Features

- **User Management**: Handles user authentication and authorization using **JWT** (JSON Web Tokens).
- **Vehicle Management**: Supports CRUD operations for vehicle records.
- **WOF Inspections**: Handles the processing of vehicle inspection data and communicates with the machine learning model for roadworthiness predictions.
- **Report Generation**: Generates PDF reports of the WOF inspections using **PDFKit**.
- **Security**: Implements password hashing using **bcryptjs** and environment variable management with **dotenv**.
- **Cross-Origin Resource Sharing (CORS)**: Configured to handle CORS requests.

## Technologies Used

- **Node.js**: Backend JavaScript runtime.
- **Express.js**: Web framework for building APIs.
- **MongoDB/Mongoose**: NoSQL database for storing user, vehicle, and inspection data.
- **Python Flask**: Machine learning API integration for roadworthiness predictions.
- **JWT**: Authentication and authorization.
- **Axios**: HTTP client for making requests to the Python ML API.
- **PDFKit**: Library for generating WOF inspection reports in PDF format.

## API Endpoints

### Authentication
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login to the system and receive a JWT token.

### Vehicle Management
- `GET /vehicles`: Get a list of all vehicles.
- `POST /vehicles`: Add a new vehicle.
- `PUT /vehicles/:id`: Update vehicle details.
- `DELETE /vehicles/:id`: Delete a vehicle.

### WOF Inspections
- `POST /inspections`: Submit inspection data and receive a prediction.
- `GET /inspections/:id`: Retrieve inspection details.

### Reports
- `POST /reports`: Generate a PDF report for an inspection.
