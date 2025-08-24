# 🛍️ E-Commerce Platform - Backend

This is the **backend service** for the E-Commerce Platform built with **NestJS** and **PostgreSQL**.  
It provides secure APIs for user authentication, product browsing, cart management, orders, and user profiles.

---

## 🚀 Features
- User Registration & Login (JWT Authentication)
- Browse Products by Category
- View Product Details (images, description, price, reviews)
- Add Products to Cart
- Update Cart (change quantity, remove items)
- Place Orders (Checkout)
- Manage User Profile (address, phone, etc.)
- Logout

---

## 🛠️ Tech Stack
- **NestJS** (Node.js framework)
- **PostgreSQL** (Relational Database)
- **TypeORM** (ORM for database management)
- **JWT Authentication**
- **Docker** (optional for containerization)

---
📡 API Endpoints

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| POST   | `/auth/register` | Register a new user    |
| POST   | `/auth/login`    | User login (JWT token) |
| GET    | `/products`      | List all products      |
| GET    | `/products/:id`  | Get product details    |
| POST   | `/cart`          | Add product to cart    |  
| PUT    | `/cart/:id`      | Update cart item       |
| DELETE | `/cart/:id`      | Remove item from cart  |
| POST   | `/orders`        | Place an order         |
| GET    | `/users/profile` | Get user profile       |
| PUT    | `/users/profile` | Update user profile    |

