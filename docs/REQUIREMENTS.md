# Putzplan - Cleaning Organization App PRD

## Overview
Putzplan is a web application designed to help couples organize and manage their household cleaning tasks efficiently. The app aims to provide a fair, transparent, and easy-to-use system for tracking and rotating cleaning responsibilities.

## Core Problems to Solve
- Organizing cleaning tasks between two people
- Tracking task completion history and effort distribution
- Maintaining a clean living space through regular task completion
- Providing visibility into who completes which tasks

## Target Users
- Primary: Couples living together
- Secondary: Could be expanded to roommates or families

## Technical Stack (Confirmed)
- Frontend: Next.js with TypeScript
- Styling: TailwindCSS
- Backend/Auth: Supabase
- Hosting: TBD

## Feature Requirements (First Iteration)

### 1. User Management
#### Must Have
- [ ] Basic user accounts for two people
- [ ] Simple authentication system
- [ ] Single role for all users (equal permissions)

### 2. Task Management
#### Must Have
- [ ] Ability to create new tasks with:
  - Task name
  - Recurrence configuration (e.g., daily, weekly, monthly)
  - Duration in minutes
  - "Level of disgust" rating (1-5 scale)
  - Cleaning instructions (step-by-step guide)
- [ ] Task Detail & Edit Modal:
  - Opens when tapping/clicking on a task
  - Shows all task information in an editable form
  - Fields match the task creation form
  - Clearly visible delete button
  - Save and cancel buttons for edit operations
  - Confirmation dialog for deletion
  - Mobile-friendly layout and button sizes
- [ ] Tasks are initially due on creation date
- [ ] Next due date automatically set based on recurrence after completion
- [ ] All users can create tasks
- [ ] All tasks visible to all users
- [ ] Task completion tracking with:
  - Completion timestamp
  - User who completed the task
  - Historical record of completions

### 3. Schedule & View
#### Must Have
- [ ] Timeline-based task view organization:
  - "Today" section at the top showing all tasks due today
  - "Next" section showing upcoming tasks
  - Tasks in "Next" section grouped by date
  - Each date displayed as a separate heading
  - Chronological organization of tasks
- [ ] Any user can complete any due task
- [ ] Historical view of completed tasks and user contributions

### 4. UI/UX Design
#### Must Have
- [ ] Mobile-first, responsive design
- [ ] Clean and friendly interface
- [ ] Intuitive task management
- [ ] Clear task status indicators
- [ ] Easy-to-use task creation flow
- [ ] Clear visual hierarchy between Today and Next sections
- [ ] Easy-to-scan timeline format for upcoming tasks
- [ ] Task Detail Modal Design:
  - Full-screen modal on mobile, centered modal on desktop
  - Clear visual hierarchy of information
  - Easy-to-use form controls
  - Prominent but safe placement of delete button
  - Visual confirmation for save/delete actions
  - Smooth transitions and animations
  - Clear error states and validation feedback

### 5. Data & Storage
#### Must Have
- [ ] Persistent data storage in Supabase
- [ ] Task completion history tracking
- [ ] User effort statistics storage

## Future Considerations
- Calendar integration
- Push notifications
- Dark mode support
- Expansion to support more users (roommates/families)
- Gamification elements

## Out of Scope (First Iteration)
### User Management
- OAuth integration (Google, etc.)
- User preferences/settings
- Profile pictures

### Task Management
- Task categories/tags
- Task priority levels
- Task dependencies
- Predefined templates for common tasks
- Task assignment system
- Automatic task rotation
- Flexible rotation patterns

### UI/UX
- Dark/light mode
- Customizable color schemes
- Animations/transitions
- Progressive Web App (PWA) support
- Calendar view

### Data & Storage
- Offline support
- Data export functionality
- Basic data backup

## Notes
This is a living document that will be updated based on user feedback and development progress. All requirements are subject to discussion and modification.

---
Last Updated: March 23, 2024
Status: Requirements Confirmed for First Iteration 