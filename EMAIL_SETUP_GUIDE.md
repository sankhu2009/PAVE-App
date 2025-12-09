# Email Setup Guide (SendGrid + Azure)

To make the email notifications work, you need to configure the backend service.

## Step 1: Get SendGrid API Key
1.  Go to [SendGrid.com](https://sendgrid.com/) and sign up for a **Free** account.
2.  Go to **Settings** > **API Keys**.
3.  Click **Create API Key**.
4.  Name it "Azure App" and give it **Full Access**.
5.  **Copy the Key** immediately (it looks like `SG.xxxx...`). You cannot see it again.
6.  Also go to **Settings** > **Sender Authentication** and verify a "Single Sender Identity" (e.g., `admin@yourdomain.com` or just your gmail for testing).

## Step 2: Configure Azure Static Web Apps
1.  Go to the [Azure Portal](https://portal.azure.com/).
2.  Navigate to your **Static Web App**.
3.  On the left menu, click **Configuration** (under Settings).
4.  In the **Application settings** tab, click **+ Add**.
5.  Add these two settings:
    *   **Name**: `SENDGRID_API_KEY`
    *   **Value**: (Paste your key from Step 1)
    *   **Name**: `SENDGRID_FROM_EMAIL`
    *   **Value**: (The email you verified in SendGrid, e.g., `sankhu2014@gmail.com`)
6.  Click **Save** at the top.

## Step 3: Deploy
1.  Upload the new `api` folder to GitHub.
2.  Azure will detect the new API, install dependencies, and deploy it automatically.
