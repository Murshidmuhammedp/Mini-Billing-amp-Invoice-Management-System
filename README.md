# 🧾 Mini Billing & Invoice Management System

A full-stack web application that allows users to manage customers, products, and invoices with an intuitive UI and secure backend API.

---

## 📌 Features

- 🔐 **User Authentication**
  - JWT-based login system

- 👥 **Customer Management**
  - Add, view, update, and delete customers

- 📦 **Product Management**
  - Add, view, update, and delete products

- 🧾 **Invoice Management**
  - Create invoices by selecting customers and products
  - Auto-calculates subtotal, tax (10%), and grand total
  - View list of invoices with status toggle (Paid/Unpaid)

- ✅ **Validation & Error Handling**
  - Frontend: Formik with error messages
  - Backend: Joi schema validation
  - Centralized error handling for robustness

---

## 🚀 Tech Stack

### Frontend
- **React.js**
- **Tailwind CSS**
- **Formik** for form handling
- **Axios** for API communication
- **React Router DOM**

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **Joi** for backend validation
- **JWT** for authentication


---

## 💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Murshidmuhammedp/Mini-Billing-amp-Invoice-Management-System
cd Mini-Billing-amp-Invoice-Management-System

2. Backend Setup

cd server
npm install

Create a .env file in /server:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret

Run the server:

npm run dev

3. Frontend Setup

cd ../client
npm install
npm start
The frontend will run on http://localhost:3000.

📊 Invoice Table Example
Invoice No	Customer Name	Total Amount	Status
INV001	John Doe	₹1,500	Paid
INV002	Jane Smith	₹2,100	Unpaid


🔐 Authentication
Protected routes via JWT

Token stored securely in localStorage

Middleware checks token on every request

📬 Contact
If you have any questions or feedback:


Email: murshid.mmp@gmail.com
