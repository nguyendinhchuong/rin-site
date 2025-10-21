# GitHub Secrets Template for Vercel Deployment

Add these secrets to your GitHub repository settings:
**Settings > Secrets and variables > Actions > Repository secrets**

## Required Secrets

### VERCEL_DEPLOY_HOOK_URL
- **Description**: Vercel deployment hook URL for triggering deployments
- **How to get**: 
  1. Go to your Vercel project dashboard
  2. Navigate to Settings > Git
  3. Create a new Deploy Hook
  4. Copy the webhook URL
- **Example**: `https://api.vercel.com/v1/integrations/deploy/prj_YOUR_PROJECT_ID/YOUR_DEPLOY_HOOK_TOKEN`

### VERCEL_PROJECT_ID (Optional)
- **Description**: Vercel project ID for reference
- **How to get**: Found in your Vercel project settings or in the deploy hook URL
- **Example**: `prj_hJJIAeZsRgBRwhKrXLALbdt7oPKM`

### VERCEL_ORG_ID (Optional)
- **Description**: Vercel organization/team ID for reference
- **How to get**: Found in your Vercel team/organization settings
- **Example**: `team_XXXXXXXXX`

## Setup Instructions

1. **Create Deploy Hook in Vercel**:
   - Go to your Vercel project dashboard
   - Navigate to Settings > Git
   - Click "Create Hook"
   - Choose "Production" branch
   - Copy the generated webhook URL

2. **Add Secrets to GitHub**:
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Add each secret with the exact names shown above

3. **Test the Workflow**:
   - Push to the main branch
   - Check the Actions tab to see if the deployment is triggered

## Current Configuration

The workflow is now configured to use these environment variables:
- `VERCEL_DEPLOY_HOOK_URL`: Used for the deployment trigger
- `VERCEL_PROJECT_ID`: Available for reference in logs
- `VERCEL_ORG_ID`: Available for reference in logs
