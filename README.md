# Small Grocery Ordering System

COMP713 Assessment 2 – Individual Project (Option A: Distributed Web/API Application)

A distributed web application consisting of a React client, a Spring Boot REST API and a MySQL database, allowing customers to be created, products to be browsed and orders to be placed.

## Architecture

```
React Client (localhost:5173)
        |  HTTP/JSON
        v
Spring Boot REST API (localhost:8080)
        |  JDBC
        v
MySQL Database (AWS RDS)
```

## Technology Stack

- **Frontend:** React + Vite
- **Backend:** Spring Boot 4.1.1 (Java 21)
- **Database:** MySQL 8.4 (AWS RDS)
- **API Testing:** curl / Postman
- **Version Control:** Git + GitHub

## Project Structure

```
COMP713_Assessment2/
├── backend/
│   └── grocery-ordering-api/     # Spring Boot REST API
├── frontend/                     # React client
├── database/                     # SQL scripts (if any)
├── docs/                         # Report, diagrams
└── README.md
```

## Entities & Relationships

- **Customer** (id, name, phone)
- **Product** (id, name, price)
- **Order** (id, customer, product, quantity, totalPrice)

An `Order` belongs to one `Customer` and references one `Product` (many-to-one relationships), calculating `totalPrice` automatically as `price × quantity`.

## Prerequisites

- Java 21
- Maven (or use the included `./mvnw` wrapper)
- Node.js and npm
- Access to a MySQL database (AWS RDS instance provided by course lecturer)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/WinWinAye200199/COMP713_Assessment2.git
cd COMP713_Assessment2
```

### 2. Configure the backend database connection

Navigate to the backend resources folder:

```bash
cd backend/grocery-ordering-api/src/main/resources
```

Copy the example file and fill in your own database credentials:

```bash
cp application-local.properties.example application-local.properties
```

Edit `application-local.properties` with your actual database details:

```properties
spring.datasource.url=jdbc:mysql://<host>:<port>/<schema>?useSSL=true&requireSSL=true&serverTimezone=UTC
spring.datasource.username=<your-username>
spring.datasource.password=<your-password>
```

**Note:** `application-local.properties` is excluded from Git via `.gitignore` and must never be committed, per course instructions on not sharing database credentials.

### 3. Run the backend

```bash
cd backend/grocery-ordering-api
./mvnw spring-boot:run
```

The API will start on `http://localhost:8080`. On first run, Hibernate automatically creates the required tables (`customers`, `products`, `orders`) in the configured database.

### 4. Run the frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The React app will start on `http://localhost:5173`.

### 5. Open the app

Visit `http://localhost:5173` in your browser. Use the navigation buttons to switch between **Products**, **Customer**, and **Order** pages.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/customers` | Create a new customer |
| GET | `/api/customers` | List all customers |
| GET | `/api/customers/{id}` | Get a customer by ID |
| POST | `/api/products` | Create a new product |
| GET | `/api/products` | List all products |
| GET | `/api/products/{id}` | Get a product by ID |
| POST | `/api/orders` | Place a new order |
| GET | `/api/orders` | List all orders |
| GET | `/api/orders/{id}` | Get an order by ID |

## Testing

The API was tested using `curl`. Example requests:

```bash
# Create a customer
curl -X POST http://localhost:8080/api/customers \
  -H "Content-Type: application/json" \
  -d '{"name": "Win Win", "phone": "0211234567"}'

# Create a product
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Rice", "price": 5.00}'

# Place an order
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customerId": 1, "productId": 1, "quantity": 2}'
```

### Validation & Error Handling

The API validates all input and returns structured error responses:

- Missing/empty required fields → `400 Bad Request` with field-level error messages
- Negative price or non-positive quantity → `400 Bad Request`
- Referencing a non-existent customer, product, or order → `404 Not Found`

Example error response:

```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Customer not found with id: 999",
  "path": "/api/orders",
  "timestamp": "2026-09-12T23:26:19.497707"
}
```

## Distributed Systems Concepts Demonstrated

This project demonstrates a distributed client-server-database architecture:

- The **React client** and **Spring Boot API** run as separate processes, communicating over HTTP using JSON.
- The **Spring Boot API** and **MySQL database** communicate over a JDBC connection, with the database hosted remotely on AWS RDS (a separate physical/network location from the application server).
- Communication between all three layers is stateless — each HTTP request from the client contains all information needed for the server to process it.

## Notes

- Connection pool is limited to a maximum of 5 connections, as required by the course database usage policy.
- Database credentials are never committed to version control.

## Author

Win Win Aye – 25313139
COMP713 – Assessment 2