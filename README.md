# Creator Bridge

A secure collaboration platform that enables YouTube creators and editors to work together without sharing channel credentials.

Creator Bridge eliminates the traditional workflow of downloading large video files, transferring them manually, and providing direct access to YouTube accounts. Editors can upload videos, thumbnails, and metadata inside dedicated workspaces, while creators retain full control over publishing decisions.

---

## Features

### Creator Features
- Google OAuth Authentication
- Connect YouTube Channel
- Create and Manage Workspaces
- Assign Editors
- Review Uploaded Videos
- Approve or Reject Content
- Publish Videos Directly to YouTube
- Manage Channel Information

### Editor Features
- Email-based Authentication
- Profile Management
- Access Assigned Workspaces
- Upload Videos
- Upload Custom Thumbnails
- Add Video Metadata
- Track Approval Status
- Receive Feedback and Notifications

### Platform Features
- Workspace-Based Collaboration
- Secure JWT Authentication
- Google OAuth Integration
- Cloudinary Media Storage
- YouTube Data API Integration
- Approval Workflow System
- Responsive Modern UI
- Role-Based Access Control

---

## Problem Solved

Content creators often face two major challenges:

- Sharing YouTube credentials with editors creates security risks.
- Downloading and transferring large video files wastes time and bandwidth.

Creator Bridge solves these issues by providing a centralized workspace where editors upload content and creators approve it before publishing.

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React

### Backend
- Next.js API Routes
- Node.js
- TypeScript

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT Authentication
- Google OAuth 2.0

### Cloud Storage
- Cloudinary

### APIs & Services
- YouTube Data API v3
- Google OAuth APIs

---

## System Workflow

```text
Owner
  │
  ├── Connect YouTube Channel
  ├── Create Workspace
  └── Assign Editor
          │
          ▼
Editor
  │
  ├── Upload Video
  ├── Upload Thumbnail
  └── Add Metadata
          │
          ▼
Workspace
          │
          ▼
Owner Review
  │
  ├── Approve
  └── Reject
          │
          ▼
YouTube Publishing
```

---

## Database Models

### User
Stores creator and editor information.

### Workspace
Stores collaboration spaces between creators and editors.

### Video
Stores uploaded videos, thumbnails, metadata, approval status, and YouTube publishing details.

### YoutubeChannel
Stores connected YouTube channel information and OAuth tokens.

### Notify
Stores comments, feedback, and notifications.

### OTP
Stores email verification codes and expiration details.

---

## Project Structure

```bash
src/
│
├── app/
│   ├── api/
│   ├── auth/
│   ├── editor/
│   └── owner/
│
├── components/
├── helpers/
├── lib/
├── models/
├── types/
└── middleware.ts
```

---

## Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

NEXT_PUBLIC_APP_URL=
BREVO_USER=
BREVO_PASS=

```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Dev-ayansharma/creatorbridge.git
```

Move into project directory:

```bash
cd creatorbridge
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## User Roles

### Owner
- Sign in with Google
- Connect YouTube Channel
- Create Workspaces
- Assign Editors
- Review Uploaded Videos
- Approve or Reject Content
- Publish Videos to YouTube

### Editor
- Register Account
- Login
- Access Assigned Workspace
- Upload Videos
- Upload Thumbnails
- Add Metadata
- Submit Content for Review

---

## Security Features

- JWT Authentication
- HTTP-only Cookies
- Protected API Routes
- Role-Based Access Control
- Google OAuth Authentication
- Secure Token Management
- Cloud Storage Security

---

## Future Scope

- Multi-Editor Workspace Support
- Real-Time Notifications
- Video Scheduling
- AI-Based Metadata Suggestions
- Analytics Dashboard
- Mobile Application
- Integration with Instagram, Facebook, and TikTok

---

## Author

**Ayan Sharma**  
Bachelor of Computer Applications (BCA)

### Project Title
**Creator Bridge – Secure YouTube Collaboration Platform**

---

## License

This project was developed for academic and educational purposes.
