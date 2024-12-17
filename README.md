# Store API

A RESTful API for managing product information with advanced filtering capabilities.

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory and add:
```bash
MONGO_URI=your_mongodb_connection_string
```
4. Populate the database with sample data:
```bash
npm run populate
```
5. Start the server:
```bash
npm start
```

## API Endpoints

### Get All Products
```http
GET /api/v1/products
```

### Query Parameters

- `name`: Filter by product name (case insensitive)
- `featured`: Filter featured products (true/false)
- `company`: Filter by company name
- `sort`: Sort by field(s) (comma-separated)
- `fields`: Select specific fields (comma-separated)
- `numericFilters`: Apply numeric filters (price,rating)
  - Operators: >,>=,=,<,<=
  - Example: `numericFilters=price>40,rating>=4`
- `page`: Page number for pagination
- `limit`: Number of items per page

### Example Queries

```http
GET /api/v1/products?featured=true
GET /api/v1/products?company=ikea
GET /api/v1/products?sort=price,-name
GET /api/v1/products?fields=name,price
GET /api/v1/products?numericFilters=price>40,rating>=4
```

## Error Handling

The API includes custom error handling middleware for:
- Invalid routes
- Database connection errors
- Validation errors

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose