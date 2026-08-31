# my-Portfolio

## Description
A personal portfolio project with a backend built on **Node.js** and **Express**. The server provides a simple API to send emails via Nodemailer and includes CORS configuration for local development and production.

## Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/my-Portfolio.git
   cd my-Portfolio
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the `backend` directory.
   - Add the required variables (example):
     ```env
     PORT=3001
     EMAIL_USER=your_email@example.com
     EMAIL_PASS=your_email_password
     ```

## Usage
1. **Start the server**
   ```bash
   npm run start   # or `node index.js` if no start script is defined
   ```

2. **Test the server**
   - Open a browser or use a tool like `curl`/Postman to hit the test endpoint:
     ```
     GET http://localhost:3001/test
     ```
   - Expected response:
     ```json
     { "success": true }
     ```

3. **Send an email**
   - Send a `POST` request to the mail endpoint:
     ```
     POST http://localhost:3001/api/v1/sendmail
     Content-Type: application/json
     
     {
       "name": "John Doe",
       "email": "john@example.com",
       "phone": "123-456-7890",
       "message": "Hello, this is a test message."
     }
     ```
   - The API validates the payload and forwards the email to both the site owner and the sender.

## API Endpoints
| Method | Path                     | Description                              |
|--------|--------------------------|------------------------------------------|
| GET    | `/test`                  | Health check endpoint, returns `{ "success": true }`. |
| POST   | `/api/v1/sendmail`       | Validates input and sends email via Nodemailer. |

## License
This project is licensed under the MIT License.