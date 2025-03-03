# Mutual Fund Brokerage Backend API

This project serves as the backend for managing mutual fund brokerage operations.

## Setup and Installation

1. **Clone the Repository**
   - Run: `https://github.com/suraj-ms/mutual-fund-brokerage`

2. **Navigate to the Backend Directory**
   - Run: `cd mutual-fund-brokerage/backend`

3. **Install Dependencies**
   - Run: `npm install`

4. **Configure Environment Variables**
   - Create a `.env` file in the project root based on the `.env.example` (if provided).
   - Set variables such as:
     - `PORT` (e.g., 3000)
     - `JWT_SECRET` (for signing JWT tokens)
     - `RAPIDAPI_KEY` and `RAPIDAPI_HOST` (for fetching mutual fund data)

5. **Database Setup**
   - The project uses SQLite. The database file `database.sqlite` is automatically created and managed by Sequelize.
   

6. **Start the Application**
   - Run: `npm start`
   - This will initialize the server on the specified port and also start the hourly portfolio updater.

## API Routes and Payloads

### 1. Authentication Routes
Routes for user registration and login can be found in [`routes/authRoutes.js`](../../../../../../../c:/Users/suraj/OneDrive/Desktop/mutual-fund-brokerage/backend/routes/authRoutes.js).

- **Register a New User**
  - **Route:** `POST /api/auth/register`
  - **Payload:**
    ```json
    {
      "email": "example@domain.com",
      "password": "your_password"
    }
    ```
  - **Response:** A message confirming successful user creation or an error if the user already exists.

- **Login a User**
  - **Route:** `POST /api/auth/login`
  - **Payload:**
    ```json
    {
      "email": "example@domain.com",
      "password": "your_password"
    }
    ```
  - **Response:** A JWT token if the credentials are valid.

### 2. Fund Routes
Routes to retrieve mutual fund schemes can be found in `routes/fundRoutes.js`. These routes require authentication.

- **Get Open Ended Schemes**
  - **Route:** `GET /api/funds/open-ended/:fundFamily`
  - **URL Parameter:**
    - fundFamily: The name of the fund family to query.
  - **Response:** A JSON array of open-ended mutual fund schemes with details as fetched from the RapidAPI service.

### 3. Portfolio Routes
Routes to manage the user’s investments are defined in `routes/portfolioRoutes.js` and they require authentication.

- **Add an Investment**
  - **Route:** `POST /api/portfolio`
  - **Payload:**
    ```json
    {
      "fundFamily": "Fund Family Name",
      "schemeName": "Scheme Name",
      "amountInvested": "<Amount>",
      "purchaseNav": "<purchase>"
    }
    ```
  - **Response:** Details of the created investment.

- **Retrieve User Portfolio**
  - **Route:** `GET /api/portfolio`
  - **Response:** A JSON array containing all investments added by the authenticated user.

## Additional Features

### Portfolio Updater
- The project includes a service (`services/portfolioUpdater.js`) that runs on an hourly schedule.
- The updater uses the `rapidapiService` to fetch the latest NAV for each scheme and updates the corresponding record in the database.

## Testing the API

- Use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to interact with the API endpoints.
- **Example cURL Command for Fetching Open-Ended Schemes**:
  ```bash
  curl -X GET "http://localhost:3000/api/funds/open-ended/<fundFamily>" -H "Authorization: Bearer <your_token>" -H "Content-Type: application/json"