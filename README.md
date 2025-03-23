# Putzplan - Cleaning Organization App

A web application designed to help couples organize and manage their household cleaning tasks efficiently.

## Features

- User authentication with email/password
- Task management with recurrence settings
- Task completion tracking
- Timeline-based task organization
- Mobile-first, responsive design

## Tech Stack

- Frontend: Next.js with TypeScript
- Styling: TailwindCSS
- Backend/Auth: Supabase
- Hosting: Vercel

## Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd putzplan4
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file and fill in your Supabase credentials:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

## Authentication

The application uses Supabase Authentication with the following features:
- Email/Password authentication
- Protected routes requiring authentication
- Automatic session management
- Email verification for new accounts
- Secure session persistence using cookies

To configure authentication in production:
1. Add your production URL to Supabase project settings
2. Configure redirect URLs for authentication callbacks
3. Ensure environment variables are properly set in your hosting environment

## Support

For issues and feature requests, please create an issue in the repository.
