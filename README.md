# AirView
India

This is a Next.js web application for monitoring air quality in India, built in Firebase Studio. It features real-time AQI data, AI-powered forecasts, and personalized health advice.

## Running Locally

To run this web app on your local machine using VS Code, follow these steps.

### 1. Install Dependencies

First, open a terminal in VS Code and install the necessary Node.js packages using npm:

```bash
npm install
```

### 2. Set Up Environment Variables for Local Development

This project uses both **Google AI** for its generative features and **Firebase** for user authentication. You will need to configure credentials for both services in a `.env` file for local testing.

1.  **Create the file:** If it doesn't already exist, create a new file named `.env` in the root of your project directory.

2.  **Get Google AI API Key:**
    *   Obtain a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   Add it to your `.env` file:
        ```
        GOOGLE_API_KEY=YOUR_GOOGLE_AI_API_KEY
        ```

3.  **Get Firebase Configuration:**
    *   Go to your [Firebase project console](https://console.firebase.google.com/).
    *   In your project, go to **Project Settings** (click the gear icon ⚙️).
    *   Under the "General" tab, scroll down to the "Your apps" section.
    *   Select your web app, and then choose the **"Config"** option for SDK setup.
    *   Copy the key-value pairs from the `firebaseConfig` object into your `.env` file. They will look like this:

        ```
        NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
        NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
        ```

### 3. Configure Secrets for Production Deployment (IMPORTANT)

When you deploy your app to Firebase App Hosting, it **does not** use the `.env` file. You must set your `GOOGLE_API_KEY` as a secret in Google Cloud.

**In your local terminal (not in VS Code), run the following command:**

```bash
gcloud app-hosting secrets grant-access \
  --secret="GOOGLE_API_KEY" \
  --backend="breatheeasy-india"
```

This command securely grants your deployed application access to the Google AI API key.

### 4. Run the Development Servers

This project requires two separate servers running simultaneously: one for the Next.js web app and one for the Genkit AI service. You will need to open two separate terminals in VS Code.

**In your first terminal, run the Next.js web app:**

```bash
npm run dev
```

This will start the main application. You can view it by opening [http://localhost:9002](http://localhost:9002) in your browser.

**In your second terminal, run the Genkit AI server:**

```bash
npm run genkit:dev
```

This starts the service that provides all the AI functionality. The web app will automatically connect to this service. You must have this running for the AI features to work.
