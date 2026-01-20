# Readify

Readify is a 6-page campus-friendly reading companion built with HTML, CSS, and vanilla JavaScript. It supports book discovery, progress tracking, cozy soundscapes, feedback capture, and a simple PWA setup for offline access.

## Pages
- Home (index.html)
- Book Explorer (explorer.html)
- Progress Tracker (tracker.html)
- Random Recommender (recommender.html)
- Reading Flow (flow.html)
- Feedback (feedback.html)

## Features
- Responsive navbar with animated hamburger
- Auto-rotating quotes and daily author logic
- Book explorer with search, filters, and modal details
- Progress tracker with progress bar + estimated finish
- Random recommender with animated “pick again”
- Reading flow with cozy sounds and completed list
- Feedback form with validation + FAQ accordion
- PWA manifest + service worker

## Run Locally
Open `index.html` in your browser. For full PWA testing, serve the folder using a local web server.

## Placeholder Assets (Add Manually)
This repo intentionally avoids binary files. Add these assets locally before final submission:
- `favicon.ico`
- `icon-192.png` and `icon-512.png`
- `images/hero.jpg`, `images/quote-side.jpg`
- `images/books/book-1.jpg` through `book-10.jpg`
- `sounds/rain.mp3`, `sounds/cafe.mp3`, `sounds/forest.mp3`

## Folder Structure
```
readify-site/
├── index.html
├── explorer.html
├── tracker.html
├── recommender.html
├── flow.html
├── feedback.html
├── css/
├── js/
├── images/
├── sounds/
├── manifest.json
├── service-worker.js
├── favicon.ico
└── testing-report.md
```
