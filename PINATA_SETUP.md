# Pinata API Setup Instructions

## Environment Variables Setup

To enable the Pinata API integration, you need to set up your environment variables:

### Step 1: Create Environment File
Create a `.env.local` file in your project root with the following content:

```env
# Pinata Configuration
NEXT_PUBLIC_PINATA_JWT=YOUR_ACTUAL_PINATA_JWT_TOKEN_HERE
```

### Step 2: Get Your Pinata JWT Token
1. Go to your [Pinata Dashboard](https://app.pinata.cloud/)
2. Navigate to **API Keys** section
3. Create a new API key or copy an existing one
4. Copy the JWT token

### Step 3: Update Environment File
Replace `YOUR_ACTUAL_PINATA_JWT_TOKEN_HERE` in your `.env.local` file with your actual JWT token.

### Step 4: Restart Development Server
After adding the environment variable, restart your development server:

```bash
npm run dev
# or
yarn dev
```

## How It Works

The application will now:
1. **Fetch files from Pinata API** on every page refresh
2. **Store the results in localStorage** for caching
3. **Display error messages** for API failures (400, 500, etc.)
4. **Fallback to cached data** if API is unavailable
5. **Show loading states** while fetching data

## Error Handling

The system handles various error scenarios:
- **Network errors**: Shows error message and uses cached data
- **API errors (4xx/5xx)**: Displays specific error messages
- **Missing JWT**: Shows configuration error
- **Invalid responses**: Graceful fallback to cached data

## File Format

Files from Pinata are transformed to match your existing interface:
- `id`: Pinata file ID
- `name`: Original filename
- `size`: File size in bytes
- `uploadDate`: Creation date from Pinata
- `cid`: IPFS Content Identifier
- `mimeType`: File MIME type (optional)
