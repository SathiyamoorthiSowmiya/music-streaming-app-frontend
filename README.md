# TuneStream — Music Streaming App (Frontend)

React frontend for a full-stack MERN music streaming application.

## Tech Stack

- React (Vite)
- Redux Toolkit + React Redux (state management)
- React Router
- Formik + Yup (form handling & validation)
- react-player (audio playback)
- Axios

## Features

- Register / Login with form validation
- Browse and search music by title, artist, album or movie
- Persistent bottom player bar with play/pause, next/previous, shuffle, repeat and volume controls
- Like songs — automatically shown in a "Liked Songs" page
- Create and manage playlists, add/remove songs
- Comment on songs via a slide-in side panel
- Admin panel to add/remove songs (visible only to admin accounts)

## Getting Started

### Prerequisites

- Node.js (v18+)
- The backend API running (see Backend README)

### Setup

```bash
npm install
```

Create a `.env` file in the root:

```
VITE_API_URL=http://localhost:5050/api
```

Run the dev server:

```bash
npm run dev
```

App runs on `http://localhost:5173` (or the next available port).

## Demo Login

- Admin: `admin@musicapp.com` / `Admin@123`
- Or register a new account from the Register page.
