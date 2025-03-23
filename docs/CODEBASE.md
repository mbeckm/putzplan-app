# Putzplan App - Internal Codebase Documentation

## Project Overview
A Next.js application for managing household cleaning tasks between couples. Built with TypeScript, TailwindCSS, and Supabase for backend services.

## Core Architecture

### Authentication (`src/app/auth/`)
- `page.tsx`: Handles user authentication UI and logic
- `callback/route.ts`: Manages OAuth callback and session handling
- Uses Supabase Auth with email/password
- Protected routes via middleware

### Dashboard (`src/app/dashboard/`)
- `page.tsx`: Main task management interface
  - Groups tasks by due date
  - Implements task completion functionality
  - Handles task filtering and organization
- `tasks/new/page.tsx`: New task creation form

### Components (`src/components/`)
- `TaskCard.tsx`: Individual task display component
  - Props: task, onClick, onComplete
  - Handles task completion state
  - Shows task metadata (duration, disgust level)
- `TaskDetailModal.tsx`: Modal for task editing
  - Full task information display
  - Edit form with validation
  - Delete functionality
- `SignOutButton.tsx`: Authentication state management

### Services (`src/services/`)
- `tasks.ts`: Task-related API calls
  - CRUD operations for tasks
  - Task completion handling
  - Due date calculations

### Database Schema
```sql
tasks (
  id uuid primary key
  name text not null
  created_by uuid references auth.users
  created_at timestamp with time zone
  duration_minutes integer
  disgust_level integer
  recurrence jsonb
  next_due_date timestamp with time zone
  cleaning_instructions text[]
)

task_completions (
  id uuid primary key
  task_id uuid references tasks
  completed_by uuid references auth.users
  completed_at timestamp with time zone
)
```

### Type Definitions (`src/types/`)
- `task.ts`: Task-related type definitions
  - Task interface
  - TaskUpdate type
  - RecurrenceType enum

### Utilities (`src/utils/`)
- `dates.ts`: Date manipulation functions
  - Next due date calculations
  - Date formatting
  - Grouping by date

### State Management
- Uses React's built-in state management
- Server components for data fetching
- Client components for interactivity

### API Integration
- Supabase client configuration in `src/lib/supabase.ts`
- Type-safe database operations
- Real-time subscriptions for task updates

## Development Workflows

### Task Creation Flow
1. User clicks "New Task" button
2. Redirected to `/dashboard/tasks/new`
3. Form submission creates task in Supabase
4. Redirects back to dashboard

### Task Completion Flow
1. User clicks complete button on TaskCard
2. Optimistic UI update
3. Backend creates completion record
4. Updates task's next due date
5. Real-time update to UI

### Task Edit Flow
1. Click on task opens TaskDetailModal
2. Form pre-filled with task data
3. Changes saved to Supabase
4. Modal closes with success message

## Authentication Flow
1. User visits protected route
2. Middleware checks session
3. Redirects to /auth if no session
4. Successful login redirects to original route

## Performance Considerations
- Server components for static content
- Client components for interactive elements
- Optimistic updates for better UX
- Efficient task grouping algorithms
- Proper error boundaries

## Known Technical Debt
- Task recurrence calculations could be moved to server
- Need proper error handling for network issues
- Consider implementing offline support
- Add proper loading states
- Implement proper test coverage

## Future Technical Improvements
- Add WebSocket for real-time updates
- Implement proper caching strategy
- Add service worker for offline support
- Implement proper error tracking
- Add analytics for usage patterns 