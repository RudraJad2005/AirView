# BreatheEasy India

This is a Next.js web application for monitoring air quality in India, built in Firebase Studio. It features real-time AQI data, AI-powered forecasts, and personalized health advice.

## Running Locally

To run this web app on your local machine using VS Code, follow these steps.

### 1. Install Dependencies

First, open a terminal in VS Code and install the necessary Node.js packages using npm:

```bash
npm install
```

### 2. Set Up Environment Variables

The AI-powered features in this app use the Google AI platform. You will need an API key to use them.

1.  Create a new file named `.env` in the root of your project directory.
2.  Obtain a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3.  Add the following line to your `.env` file, replacing `YOUR_API_KEY_HERE` with the key you just created:

```
GOOGLE_API_KEY=YOUR_API_KEY_HERE
```

### 3. Run the Development Servers

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

This starts the service that provides all the AI functionality, such as predictions and health advice. The web app will automatically connect to this service. You must have this running for the AI features to work.
