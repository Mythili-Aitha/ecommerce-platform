# 🛒 E-Commerce Platform (Spring Boot + React)

This is a full-stack **E-Commerce Platform** built with **Spring Boot (Java Backend)** and **React (Frontend)**. The project follows a structured architecture with a proper backend service layer, DTOs, and API integration.

## 🚀 Features

- **User Authentication** (Login & Registration)
- **Product Management** (List, View, Manage)
- **Order Processing** (Checkout, Order Confirmation, Inventory Management)
- **Address & Payment Integration**
- **RESTful API Communication**

## 🏗️ Tech Stack

### Backend (Spring Boot)
- Spring Boot (Java)
- Spring Data JPA (MySQL)
- Lombok, Spring Web
- Custom DTO Mapping

### Frontend (React)
- React.js, React Router
- Axios (API Calls)
- TailwindCSS / Bootstrap (UI Styling)


## 🛠️ Setup & Installation

### Backend (Spring Boot)
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecommerce-springboot-react.git
   cd ecommerce-springboot-react
   ```
2. Configure **application.properties** or **application.yml** for MySQL connection.
3. Build and run the project:
   ```bash
   mvn spring-boot:run
   ```

### Frontend (React)
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## 🔗 API Endpoints

| Endpoint                  | Method | Description |
|---------------------------|--------|-------------|
| `/api/auth/register`      | POST   | User Registration |
| `/api/auth/login`         | POST   | User Login |
| `/api/products`           | GET    | Fetch All Products |
| `/api/orders/checkout`    | POST   | Place an Order |
| `/api/orders/{id}`        | GET    | Get Order Details |
| `/api/address/save`       | POST   | Save Address |
| `/api/payment/save`       | POST   | Save Payment Info |





