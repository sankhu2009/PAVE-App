# Deploying PAVE Application to Azure

This application is a React-based Single Page Application (SPA). You have two primary options for deploying to Azure:

1.  **Azure Static Web Apps** (Recommended for SPAs - easiest setup, free tier available).
2.  **Azure App Service** or **Azure Container Apps** (Using the provided Dockerfile).

---

## Prerequisites

- An Azure account (free or paid).
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed locally (optional, but helpful).
- The project pushed to a GitHub repository (simplifies deployment).

---

## Option 1: Azure Static Web Apps (Recommended)

This service is optimized for static sites and SPAs like this React app. It handles building and hosting automatically.

### Steps:

1.  **Go to Azure Portal**: Log in to [portal.azure.com](https://portal.azure.com).
2.  **Create Resource**: Search for "Static Web Apps" and click **Create**.
3.  **Basics Tab**:
    - **Subscription**: Select your subscription.
    - **Resource Group**: Create a new one (e.g., `rg-pave-app`).
    - **Name**: Give your app a name (e.g., `pave-app`).
    - **Plan type**: "Free" is usually sufficient for development.
    - **Deployment details**: Select **GitHub**.
    - **Authorize**: Click "Sign in with GitHub" to authorize Azure.
    - **Organization/Repository/Branch**: Select the repository where this code lives.
4.  **Build Details**:
    - **Build Presets**: Select **React**.
    - **App location**: `/` (root of your repo).
    - **Api location**: Leave empty (unless you add an API later).
    - **Output location**: `dist` (Vite's default build output).
5.  **Review + Create**: Click "Create".
6.  **Wait**: Azure will create the resource and automatically start a GitHub Action to build and deploy your site. It may take a few minutes.
7.  **Browse**: Once complete, the "Overview" page in the Azure Portal will show your new URL.

---

## Option 2: Azure App Service (Containers)

If you prefer using Docker or need more control over the environment.

### 1. Build and Push Docker Image

You need a container registry (Azure Container Registry - ACR, or Docker Hub).

**Using Azure Container Registry (ACR):**

```bash
# Login to Azure
az login

# Create a Resource Group
az group create --name rg-pave-container --location eastus

# Create ACR (name must be unique)
az acr create --resource-group rg-pave-container --name paveacrTemplate --sku Basic

# Login to ACR
az acr login --name paveacrTemplate

# Build and Push Image (run from project root)
# Note: The '.' at the end specifies the build context
az acr build --registry paveacrTemplate --image pave-app:v1 .
```

### 2. Create Web App

1.  **Go to Azure Portal** -> **Create a resource** -> **Web App**.
2.  **Publish**: Select **Docker Container**.
3.  **Operating System**: **Linux**.
4.  **Region**: Same as your resource group.
5.  **App Service Plan**: Create a new one (Select a SKU, e.g., B1 for testing).
6.  **Docker Tab**:
    - **Options**: Single Container.
    - **Image Source**: Azure Container Registry.
    - **Registry**: Select your registry (`paveacrTemplate`).
    - **Image**: `pave-app`.
    - **Tag**: `v1`.
7.  **Review + Create**.

---

## Verifying Deployment

1.  **Access the URL**: Click the URL provided in the Azure Portal for your resource.
2.  **Check Routing**:
    - Navigate to the home page.
    - Try to refresh the page. If you get a 404, check your Nginx config (Option 2) or ensure `routes.json` isn't missing (Option 1 setup usually handles this automatically for React).
3.  **Check Logs**:
    - **Static Web Apps**: Check the GitHub Action logs for build failures.
    - **App Service**: Check "Log Stream" in the Azure Portal sidebar for runtime errors.

## Local Testing with Docker

To test the container locally before deploying:

1.  Build: `docker build -t pave-app-local .`
2.  Run: `docker run -p 8080:80 pave-app-local`
3.  Open browser to `http://localhost:8080`.
