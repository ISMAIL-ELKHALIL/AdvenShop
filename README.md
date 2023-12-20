# Adventure Shop

![Adventure Shop Logo](link-to-your-logo.png)

Adventure Shop is your go-to destination for high-quality hiking products, providing everything you need for a thrilling mountain adventure.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Adventure Shop is an e-commerce platform specializing in selling hiking products. The project is structured as follows:

- `backend`: Server-side logic built with Express and MongoDB.
- `frontend/store`: Frontend for the Adventure Shop store.
- `frontend/dashboard`: Admin dashboard for managing products, orders, and user data.

## Configuration

Adventure Shop uses various environment variables for configuration. Before running the application, make sure to set up the following environment variables:

### `NODE_ENV`

- **Description:** Specifies the environment in which the application is running.
- **Values:**
  - `development`: Development environment.
  - `production`: Production environment.

### `HASH_SALT`

- **Description:** Sets the number of rounds to use for bcrypt salt generation.
- **Example:** `10`

### `PORT`

- **Description:** Port on which the server will run.
- **Example:** `5000`

### `MONGO_URI`

- **Description:** MongoDB connection string.
- **Example:** `mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database`

### `JWT_SECRET`

- **Description:** Secret key used for JSON Web Token (JWT) generation and verification.
- **Example:** `yoursecretkey`

### `PAYPAL_CLIENT_ID`

- **Description:** PayPal client ID for payment integration.
- **Example:** `your-paypal-client-id`

### `BASE_URL`

- **Description:** Base URL of the application.
- **Example:** `http://localhost:5000/`

### `HOST`, `EMAIL_PORT`, `SERVICE`, `SECURE`, `USER_EMAIL`, `PASSWORD`

- **Description:** Email server configuration for sending emails (for user registration, password reset, etc.).
- **Example:**
  - `HOST`: `smtp.gmail.com`
  - `EMAIL_PORT`: `587`
  - `SERVICE`: `gmail`
  - `SECURE`: `false`
  - `USER_EMAIL`: `your-email@gmail.com`
  - `PASSWORD`: `your-email-password`

### `OPEN_AI_KEY`

- **Description:** API key for integrating with OpenAI services.
- **Example:** `your-openai-api-key`

### `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`

- **Description:** Cloudinary configuration for image and video management.
- **Example:**
  - `CLOUDINARY_CLOUD_NAME`: `your-cloudinary-cloud-name`
  - `CLOUDINARY_API_KEY`: `your-cloudinary-api-key`
  - `CLOUDINARY_SECRET_KEY`: `your-cloudinary-secret-key`

## Installation

1. Clone the repository:

   `git clone https://github.com/your-username/adventure-shop.git``

2. Install dependencies for the backend, frontend store & dashboard:

`bash npm run install-all`

## Usage

Once the project is up and running, you can access the Adventure Shop Dashboard at [http://localhost:3004](http://localhost:3004) and the Adventure Shop Store at [http://localhost:3002](http://localhost:3002) in your web browser.

## Scripts

The following npm scripts are available:

- `npm run dev`: Run the app in development mode.
- `npm run install-all`: Install dependencies for the backend, frontend store, and dashboard.

## Technologies Used

Adventure Shop leverages the following technologies:

- Backend:
  - Express: Server-side framework.
  - MongoDB: NoSQL database.

- Frontend:
  - React: JavaScript library for building user interfaces.
  - Bootstrap: Frontend component library.

- Other:
  - OpenAI: Integration for additional services.
  - Cloudinary: Image and video management.

## License

Adventure Shop is licensed under the [MIT License](LICENSE).
