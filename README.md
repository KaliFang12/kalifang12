# Kali Fang Portfolio (`kalifang12`)

A personal portfolio site built with React + TypeScript + Vite, showcasing robotics, embedded systems, and full-stack projects with rich interaction, smooth animation, and a responsive layout.

## Live demo

- https://KaliFang12.github.io/kalifang12

## Overview

This portfolio highlights:

- Featured and all projects
- Project detail pages with demo video / links
- Project status + duration + sorting/filtering
- Technical skills table (programming, software, robotics, electronics)
- Clean hero + contact section
- Router and single-page app navigation
- GitHub Pages deployment
- Reduced-motion accessibility support

## Tech stack

- React
- TypeScript
- Vite
- React
- Framer Motion
- Modern CSS
- GitHub Pages (WIP)

## Project structure

- `src/App.tsx` – main app and routing, home/project pages, skill table, filter UI
- `src/data/projects.ts` – all project data (slug, title, description, topics, links, dates)
- `src/styles.css` – layout and component styles
- `src/main.tsx` – app mount
- `public/` assets and images

## Key features

- **Featured Projects** with badges and animated cards
- **All Projects** page with filter dropdown:
  - All
  - Featured
  - In Progress
  - Completed
- **Project details** per slug route
- **Skills section** as a compact categorized table
- **Responsive layout** works on mobile, tablet, desktop
- **Accessible**: aria tags, reduced motion support

## Run locally

```bash
npm install
npm run dev
# open printed local URL