Soirée Planner — Simple static web app (MLH Submission)

Overview
This is the Soirée Planner — a lightweight static web app to manage a three-night summer soirée. It tracks guests, RSVPs, plus-ones, signature drinks, and shows a countdown to the Golden Hour opening night.

Why this project
This repository is submitted as the entry for the Major League Hacking (MLH) challenge "The Golden Hour Opening". The project demonstrates an approachable, well-styled app that prioritizes clarity and auditability — every change and agent action should be recorded in the real event of AI-assisted development.

Challenge details (Day 1: The Golden Hour Opening)
Welcome, AI Engineer
The Summer Soirée opens in three days — three nights of string lights, signature drinks, and a lawn full of guests — and host Marisol has called the crew together for one last planning meeting.
Last year’s soirée ran on software built almost entirely by AI agents. It worked beautifully — until the party ended, the developer moved on, and nobody could explain a single line of it. When the RSVP page glitched two weeks before this year’s invites went out, the team spent three days staring at code no human remembered asking for.
Marisol sets down her spritz and taps the table:
"This year, every app, every agent, every change gets a receipt. I want to know what was built, why it was built, and what the agent was told. No more mystery code at my party."

Your first assignment: build the Soirée Planner — the app that will run the guest list for all three nights. And this time, the work will be on the record.

Features
- Guest list: add names, optional plus-ones, and set RSVP (Yes / No / Pending)
- Drinks: maintain a simple list of signature drinks
- Countdown: shows days/hours to the Golden Hour opening night
- Local persistence: data stored in browser localStorage (no backend required)
- Style: gradient-rich palette, rounded corners, glass-like cards, and a string-light overlay for ambiance

Styling & Font
- The UI uses warm dusk gradients, rounded cards, and soft shadows for a modern, inviting look. Styles are defined in styles.css.
- Google Sans is preferred for typography. Because Google Sans is a proprietary/display-only font, the app attempts to use a local Google Sans installation first and falls back to Inter (loaded from Google Fonts) and system fonts if Google Sans is not available. To get the exact Google Sans look, install the Google Sans / Product Sans family locally or replace the font stack as desired.

Usage
1. Open index.html in a browser (double-click or serve with a static HTTP server).
2. Add guests and drinks using the UI — data persists to localStorage.

Notes for MLH submission
- This project is submitted for the MLH "The Golden Hour Opening" challenge (Day 1). It focuses on transparency and reproducibility: consider pairing future work with an audit log that records agent prompts and generated changes for full traceability.

Files
- index.html — main page and structure
- styles.css — visual styling (gradients, rounded corners, glass cards)
- app.js — client-side logic and persistence

License & Attribution
Original styling and layout by the project author. Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
