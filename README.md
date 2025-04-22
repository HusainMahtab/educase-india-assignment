# School Management API

A Node.js API for managing school data with MongoDB, featuring proximity-based search functionality.

## Features

- Add new schools with name, address, and geographic coordinates
- List all schools sorted by distance from a given location
- Filter schools within a specific radius (in kilometers)
- Built with Express.js and MongoDB
- Comprehensive error handling and data validation

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- Body-parser
- CORS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas cluster)
- Postman (for API testing)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/school-management-api.git
   cd school-management-api

2. API endpoint
   ```bash      
   POST
   http://localhost:5000/api/v1/schools/addSchool
   {
    "name": "Greenwood High School",
    "address": "123 Education Street, Boston, MA 02115",
    "latitude": 42.3476,
    "longitude": -71.1002
   }


    GET
   http://localhost:5000/api/v1/schools/listSchools?latitude=42.3476&longitude=-71.1002
