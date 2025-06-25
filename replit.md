# Tumia - Financial Wallet Management Platform

## Overview

Tumia is a purpose-based financial wallet management platform designed for Africa's startup ecosystem. The application allows users to organize their digital wallet based on specific purposes and goals, with collaborative features for community groups and organizations. The project consists of both a static landing page and a full-stack web application with React frontend and Express.js backend.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with custom design tokens
- **UI Components**: Radix UI component library with shadcn/ui
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth transitions and animations
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: Session-based authentication with secure cookies
- **API Design**: RESTful API with JSON responses

### Build System
- **Bundler**: Vite for fast development and optimized production builds
- **Package Manager**: npm
- **TypeScript**: Full TypeScript support across frontend and backend
- **Development**: Hot module replacement and live reloading

## Key Components

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Waitlist Entries Table**: Early user registration with name, email, company, and role fields

### Core Features
1. **Purpose-Based Tracking**: Organize funds by specific purposes without mixing personal finances
2. **Collaborative Collections**: Enable community groups to collect and track contributions transparently
3. **Real-Time Updates**: Live balance tracking and contribution monitoring
4. **Virtual Sub-Wallets**: Planned feature for individual wallet organization (coming soon)

### API Endpoints
- `POST /api/waitlist`: Join the waitlist with validated user information
- `GET /api/health`: Health check endpoint for monitoring
- `POST /api/contact`: Contact form submission handling

## Data Flow

1. **User Registration**: Users join the waitlist through the landing page form
2. **Data Validation**: Zod schemas validate all user input on both client and server
3. **Database Storage**: Validated data is stored in PostgreSQL via Drizzle ORM
4. **External Integration**: Waitlist entries are optionally synced to Google Sheets
5. **Email Notifications**: SendGrid integration for transactional emails (optional)

## External Dependencies

### Third-Party Services
- **Google Sheets API**: Optional integration for waitlist data backup
- **SendGrid**: Email service for notifications and transactional emails
- **FormSpree**: Fallback form handling for static deployments
- **Neon Database**: Serverless PostgreSQL hosting

### Development Dependencies
- **Replit**: Development environment with live collaboration features
- **Vercel**: Primary deployment platform with serverless functions
- **GitHub Pages**: Alternative static deployment option

## Deployment Strategy

### Production Deployment
- **Platform**: Vercel with serverless functions
- **Frontend**: Static site generation with API integration
- **Backend**: Serverless functions in `/api` directory
- **Database**: Neon PostgreSQL with connection pooling
- **Environment Variables**: Secure configuration via Vercel dashboard

### Fallback Strategy
- **Static Mode**: Pure HTML/CSS landing page with FormSpree integration
- **No Database**: Graceful degradation when database is unavailable
- **CDN Assets**: External assets hosted via GitHub for reliability

### Development Environment
- **Replit Integration**: Live development with hot reloading
- **Local Development**: Full-stack development with `npm run dev`
- **Database Migrations**: Drizzle migrations for schema changes

## Changelog
- June 25, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.