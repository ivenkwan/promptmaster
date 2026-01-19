# PromptMaster - GCP Deployment

This project is a React application designed to teach Prompt Engineering. It is containerized using Docker and Nginx, ready for deployment on Google Cloud Run.

## Local Setup

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run locally:
    ```bash
    export VITE_GEMINI_API_KEY="your_api_key"
    npm run dev
    ```

## Cloud Run Deployment

1.  **Build and Deploy:**
    ```bash
    gcloud run deploy prompt-master \
      --source . \
      --platform managed \
      --region us-central1 \
      --allow-unauthenticated \
      --port 8080 \
      --set-env-vars VITE_GEMINI_API_KEY=YOUR_API_KEY
    ```
