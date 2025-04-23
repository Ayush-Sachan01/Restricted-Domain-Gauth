# Domain Restriction with Google OAuth (Gauth) Authentication

This project demonstrates a simple implementation of domain restriction using Google OAuth (Gauth) for authentication. Only users from a specified domain can log in.

---

## Features

- Google OAuth 2.0 authentication
- Restrict login to a specific email domain
- Node.js/Express backend and React frontend setup
- Environment-based configuration for server and client

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Ayush-Sachan01/Restricted-Domain-Gauth
cd Restricted-Domain-Gauth
```

---

### 2. Create Google OAuth Client ID and Secret

Follow these steps to create your Google OAuth credentials:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Enable the **Google People API** or any required APIs.
4. Configure the OAuth consent screen:
   - Choose "External" or "Internal" user type.
   - Fill in app name, support email, authorized domains, and developer contact information.
5. Create OAuth credentials:
   - Navigate to **APIs & Services > Credentials**.
   - Click **Create Credentials > OAuth client ID**.
   - Select **Web application**.
   - Add your **Authorized JavaScript origins** (e.g., `http://localhost:YYYY`).
   - Add your **Authorized redirect URIs** (e.g., `http://localhost:XXXX/api/auth/google/callback`).
6. Save the **Client ID** and **Client Secret** securely.

---

### 3. Configure Environment Variables

You need to set environment variables separately for the **server** and **client**.

#### Server (`server/.env`)

```env
PORT=XXXX
NODE_ENV=development
CLIENT_URL=http://localhost:YYYY
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=random_string
JWT_SECRET=another_random_string_for_jwt_security
COMPANY_DOMAIN=abc.com
```

- **PORT**: Port number for the server (e.g., 8000)
- **CLIENT_URL**: URL where the React client runs (e.g., `http://localhost:3000`)
- **GOOGLE_CLIENT_ID** & **GOOGLE_CLIENT_SECRET**: Your Google OAuth credentials
- **SESSION_SECRET**: Secret key for session management
- **JWT_SECRET**: Secret key for JWT token signing
- **COMPANY_DOMAIN**: The allowed email domain for authentication (e.g., `abc.com`)

#### Client (`client/.env`)

```env
REACT_APP_API_URL=http://localhost:XXXX/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_COMPANY_DOMAIN=abc.com
```

- **REACT_APP_API_URL**: API endpoint for the backend server (e.g., `http://localhost:8000/api`)
- **REACT_APP_GOOGLE_CLIENT_ID**: Your Google OAuth Client ID
- **REACT_APP_COMPANY_DOMAIN**: The allowed domain for client-side validation (e.g., `abc.com`)

---

### 4. Install Dependencies

#### Server

```bash
cd server
npm install
```

#### Client

```bash
cd ../client
npm install
```

---

### 5. Run the Application

#### Start the Server

```bash
cd server
npm run dev
```

This will start your backend server on the port specified in your `.env` (e.g., `http://localhost:XXXX`).

#### Start the Client

```bash
cd ../client
npm start
```

This will start the React client on the port specified (e.g., `http://localhost:YYYY`).

---

## Usage

- Open your browser and navigate to your React app (e.g., `http://localhost:YYYY`).
- Click the "Sign in with Google" button.
- Only users with email addresses from the specified `COMPANY_DOMAIN` (e.g., `abc.com`) will be authenticated and granted access.

---

## Notes

- Ensure that the **Authorized JavaScript origins** and **Redirect URIs** in your Google Cloud Console match your local development URLs (`CLIENT_URL` and server API endpoints).
- Keep your secrets (`SESSION_SECRET`, `JWT_SECRET`, `GOOGLE_CLIENT_SECRET`) secure and never commit them to version control.
- The domain restriction is enforced both on the client and server for enhanced security.

---

## References

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
- [express-gauth GitHub Repository](https://github.com/your-repo-link)

---

Feel free to open issues or contribute to improve this project!
