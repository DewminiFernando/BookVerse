# 🌌 Bookverse

**A Cozy Personal Reading Companion Powered by Google Books API**

React · Vite · Tailwind CSS · Google Books API · Recharts · LocalStorage · Vercel

---

Bookverse is a visually rich and interactive reading companion designed for book lovers who want to discover books, manage personal reading collections, track reading goals, and view reading analytics in one cozy digital space.

Users can search books using the Google Books API, save favorites, manage a reading list, track daily reading progress, explore mood-based recommendations, and view personalized insights through a warm, animated, bookshelf-inspired interface.

---

## 📖 Project Overview

Bookverse helps readers build their own digital reading world.

It combines book discovery, personal bookshelf management, reading progress tracking, reading goals, analytics, and a friendly animated owl assistant named **Paige**. The application is fully frontend-based and uses browser `localStorage` to preserve user data without requiring a backend or login system.

The project is designed with a cozy visual theme, smooth animations, light/dark mode support, hover interactions, and responsive layouts suitable for both desktop and mobile users.

---

## ✨ Features

### 01 · Book Discovery

Search millions of books using the Google Books API.

Users can:

* Search by title, author, keyword, publisher, or subject
* View book covers, descriptions, authors, ratings, page count, and publication details
* Open detailed book pages
* Discover similar or related books

---

### 02 · Favorites Management

Users can save books they love into a personal favorites collection.

Features include:

* Add books to favorites
* Remove books from favorites
* View saved books in a clean card layout
* Access favorite books quickly from the Favorites page

---

### 03 · Reading List Management

Users can organize books they are planning to read or currently reading.

Features include:

* Add books to the reading list
* Track currently reading books
* Store reading status locally
* Continue reading from saved books

---

### 04 · Cozy Interactive Bookshelf

The Profile page includes a personalized virtual bookshelf.

Bookshelf features:

* Displays saved books as cozy book covers
* Includes natural book tilts for a realistic shelf look
* Shows hover popup cards with book information
* Displays reading progress such as page count and progress details
* Includes left/right navigation arrows when there are many books
* Keeps the bookshelf layout clean and prevents books from overflowing outside the shelf

---

### 05 · Reading Progress Tracking

Users can track their reading activity and page progress.

Features include:

* Log reading progress
* Track pages read
* View current progress for books
* Monitor reading consistency
* Store progress locally using browser storage

---

### 06 · Reading Goals

Bookverse allows users to set personal reading goals.

Goal features:

* Yearly book target
* Daily page target
* Animated progress bars
* Goal completion indicators
* Reader title updates based on progress and collection size

---

### 07 · Analytics Dashboard

The Analytics page provides visual insights into reading habits.

Analytics include:

* Reading progress overview
* Pages read over time
* Genre distribution
* Rating-based insights
* Reading streak and activity summary
* Visual charts built with Recharts

---

### 08 · Mood-Based Recommendations

Users can choose a reading mood and receive book suggestions.

Example moods:

* Cozy
* Romantic
* Dark Academia
* Adventurous
* Fantasy
* Thrilling
* Inspiring
* Melancholic

---

### 09 · Paige Owl Assistant

Bookverse includes an animated owl assistant named **Paige**.

Paige helps improve the user experience by:

* Giving friendly reading encouragement
* Reacting to reading progress
* Creating a warm and playful interface
* Adding personality to the reading dashboard

---

### 10 · Light and Dark Theme Support

The interface supports both light and dark modes.

Theme features:

* Warm cream-inspired light mode
* Charcoal-inspired dark mode
* Smooth transitions
* Cozy gradients, shadows, and particle effects

---

## 🏗️ System Architecture

```text
┌──────────────────────────────────────────────────┐
│                 React Frontend                   │
│     React · Vite · React Router · Tailwind CSS   │
│                  Port 5173                       │
└─────────────────────┬────────────────────────────┘
                      │
                      │  API Requests
                      ▼
┌──────────────────────────────────────────────────┐
│              Google Books API                    │
│       Book Search · Book Details · Metadata      │
└─────────────────────┬────────────────────────────┘
                      │
                      │  Local State Sync
                      ▼
┌──────────────────────────────────────────────────┐
│              Browser LocalStorage                │
│ Favorites · Reading List · Goals · Progress      │
└──────────────────────────────────────────────────┘
```

---

## 📚 Reading Workflow

```text
① Open Bookverse
        │
        ▼
② Search for Books
        │
        ├── Search by title, author, keyword, or genre
        │
        ▼
③ View Book Details
        │
        ├── Read description
        ├── Check authors, ratings, and page count
        │
        ▼
④ Save Book
        │
        ├── Add to Favorites
        └── Add to Reading List
        │
        ▼
⑤ Track Reading Progress
        │
        ├── Update pages read
        ├── Monitor current progress
        │
        ▼
⑥ View Profile Bookshelf
        │
        ├── Browse saved books
        ├── Hover to view book popup details
        └── Use arrows to navigate bookshelf
        │
        ▼
⑦ Analyze Reading Habits
        │
        ├── View charts
        ├── Check goals
        └── Improve reading consistency
```

---

## 🧠 Core Modules

| Module            | Description                                                                        |
| ----------------- | ---------------------------------------------------------------------------------- |
| Home              | Landing page with cozy hero section, featured visuals, and reading mood experience |
| Explore           | Google Books search page with book browsing and filtering                          |
| Book Details      | Detailed view of selected books with actions and metadata                          |
| Favorites         | Displays books saved as favorites                                                  |
| Analytics         | Visual reading insights and progress charts                                        |
| Profile           | Reader passport, goals, progress summary, and interactive bookshelf                |
| Book Context      | Global state management for saved books, reading list, goals, and progress         |
| Books API Service | Handles Google Books API requests and data formatting                              |

---

## 🗄️ Data Storage

Bookverse does not require a backend database.

User data is stored in the browser using `localStorage`.

Stored data includes:

| Data Type        | Storage Purpose                                            |
| ---------------- | ---------------------------------------------------------- |
| Favorites        | Saves books marked as favorites                            |
| Reading List     | Saves books the user wants to read or is currently reading |
| Reading Progress | Tracks page progress and reading activity                  |
| Goals            | Stores yearly and daily reading goals                      |
| Theme Preference | Saves light or dark mode preference                        |

---

## 📁 Repository Structure

```text
bookverse/
├── public/
│   └── static assets
│
├── src/
│   ├── components/
│   │   ├── books/
│   │   │   ├── book cards
│   │   │   ├── book grids
│   │   │   └── book display components
│   │   │
│   │   ├── charts/
│   │   │   └── reading analytics charts
│   │   │
│   │   ├── layout/
│   │   │   ├── navbar
│   │   │   ├── layout wrappers
│   │   │   └── shared page structure
│   │   │
│   │   ├── recommendations/
│   │   │   └── mood-based recommendation UI
│   │   │
│   │   └── ui/
│   │       ├── buttons
│   │       ├── modals
│   │       ├── loaders
│   │       └── Paige owl assistant
│   │
│   ├── context/
│   │   └── BookContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Explore.jsx
│   │   ├── BookDetails.jsx
│   │   ├── Favorites.jsx
│   │   ├── Analytics.jsx
│   │   └── Profile.jsx
│   │
│   ├── services/
│   │   └── booksApi.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env
├── package.json
├── tailwind.config.js
├── vite.config.js
├── vercel.json
└── README.md
```

---



## 🛠️ Tech Stack

| Layer            | Technology               |
| ---------------- | ------------------------ |
| Frontend         | React                    |
| Build Tool       | Vite                     |
| Styling          | Tailwind CSS, Custom CSS |
| Routing          | React Router DOM         |
| State Management | React Context API        |
| Charts           | Recharts                 |
| Icons            | Lucide React             |
| External API     | Google Books API         |
| Storage          | Browser LocalStorage     |
| Deployment       | Vercel                   |

---

## 🔌 Port Reference

| Service               | URL                   |
| --------------------- | --------------------- |
| Frontend Dev Server   | http://localhost:5173 |
| Production Deployment | Vercel live URL       |

---

## 📦 Available Scripts

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Starts the local development server   |
| `npm run build`   | Creates the production build          |
| `npm run preview` | Previews the production build locally |
| `npm run lint`    | Runs ESLint checks                    |


---

## ❤️ Built With

Built with love for readers, book collectors, and cozy digital library lovers.
