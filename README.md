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

