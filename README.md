# 🚗 Car Dealership API
A RESTful API for managing cars, categories, and users for a car dealership. Built with Node.js, Express, TypeScript, and MongoDB, it supports authentication, pagination, filtering, and more. 
**Note:** `The authentication token is store on cookies on login`

# Postmaon documentation link
`https://documenter.getpostman.com/view/45496448/2sB2qgedpB`


## 🔧 Tech Stack
- Backend: Node.js, Express.js

- Language: TypeScript

- Database: MongoDB (Mongoose)

- Authentication: JWT

- Documentation: Postman

- Testing: Jest, Supertest

## ✅ Features
1. JWT-based user authentication

2. CRUD operations for Cars and Categories

3. Car filtering by brand, model, price, availability, etc.

4. Pagination support on GET /cars

5. Proper error handling and status codes

6. Modular and maintainable code structure

7. Unit tests for critical paths

## 📁 Folder Structure
bash
Copy
Edit
src/
├── controllers/        # Request handlers
├── models/             # Mongoose schemas
├── routes/             # Route definitions
├── middlewares/        # Auth and error middleware
├── index.ts            # Entry point
.env                    # Environment variables

## 📦 Installation
**bash**
`git clone https://github.com/your-username/car-dealership-api.git`
 `cd car-dealership-api`
  `npm install`
**⚙️ Environment Variables**
Create a .env file in the root directory and add the following:

env
`PORT=5000`
`MONGO_URI=your_mongodb_connection_string`
`JWT_SECRET=your_jwt_secret`

## 🚀 Running the App
bash
`npm run dev`

🧪 Running Tests
bash
`npm test`

## 📬 API Documentation
**Postman documentation: View Docs**

1. 📌 API Endpoints
Authentication
POST `https://vobb-assessment-r9vt.onrender.com/api/auth/register`

POST `https://vobb-assessment-r9vt.onrender.com/api/auth/login`

2. Cars
POST `https://vobb-assessment-r9vt.onrender.com/api/cars` - Create a car

**Note**
`To create a car, for the category field, ensure its selection options and use the desire category as the option, so as to get the category when fetching. e.g` <select><option value={category.id}>Sedan</option></select>

GET `https://vobb-assessment-r9vt.onrender.com/api/cars?brand=Toyota&model=Camry&availabilit=true&condition=Used&color=Silver&year=2022&category=68385acce15d429e41201803` - List cars with (supports filters & pagination) . the filtering options are shpwn in the parameters, if you didn't need to filter with any of the option just remove it from the link.

**To get all the cars without filter**
GET `https://vobb-assessment-r9vt.onrender.com/api/cars`

PUT `https://vobb-assessment-r9vt.onrender.com/api/cars/:id` - Update a car the id is the car id

DELETE `https://vobb-assessment-r9vt.onrender.com/api/cars/:id` - Delete a car the id is the car id

Categories
POST `https://vobb-assessment-r9vt.onrender.com/api/categories` this to create category check the postman documentation for the body parameter

GET `https://vobb-assessment-r9vt.onrender.com/api/categories` get all category

## 🧠 Filtering Example
h
GET `https://vobb-assessment-r9vt.onrender.com/api/cars?brand=Toyota&model=Camry&minPrice=5000&maxPrice=20000&available=true&page=1&limit=10`
    adjust this base on your filtering features, if there any you didn't want to filter with just remove it from the link.

## 💻 Live API
**🔗 API deployed on Render**