# Calculo Vocacional

![React](https://img.shields.io/badge/React-18-61DAFB)
![Vite](https://img.shields.io/badge/Vite-6-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4)

An interactive vocational aptitude test web app that helps students discover the best STEM/engineering course for their profile. Built for the **Jornadas** program.

## Overview

Calculo Vocacional guides students through a multi-phase questionnaire combining image-based, select, dropdown, and Tinder-style swipe questions. It analyzes responses across 9 engineering and science areas, then generates a personalized radar chart showing aptitude scores and course recommendations -- with a freemium model offering preview results and a paid full report.

## Features

- **Multi-Phase Questionnaire** -- Image selection, dropdowns, multi-select, and swipe-based question types
- **9 Engineering Areas** -- Computacao, Eletrica, Mecatronica, Aeronautica, Licenciatura, Producao, Materiais, Civil, Ambiental
- **Radar Chart Visualization** -- Interactive aptitude scores via Chart.js / Recharts
- **Freemium Model** -- Free preview of partial results, paid access (R$9.90) for the full report
- **Shareable Results** -- Token-based result sharing via unique URLs
- **Lead Capture** -- Email collection with EmailJS integration
- **Course Detail Modals** -- In-depth information about each recommended course
- **Downloadable Ebooks** -- Career guides (Guia Definitivo) for each engineering discipline
- **Responsive Design** -- Mobile-first layout with Tailwind CSS

## Tech Stack

- **Framework:** React 18 + Vite 6
- **Styling:** Tailwind CSS 3 + Framer Motion animations
- **Charts:** Chart.js / react-chartjs-2 + Recharts
- **Routing:** React Router DOM v7
- **Email:** EmailJS
- **State:** React Context + custom `usePersistedState` hook (localStorage)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
  app/          — App entry point and routing
  components/   — Reusable UI components (questions, payment, results)
  context/      — React Context providers (Lead, Result)
  data/         — Question definitions, weights, and course mappings
  hooks/        — Custom hooks (usePersistedState)
  mappings/     — Ebook file mappings
  pages/        — Route pages (Landing, Questions, Payment, Result)
  styles/       — Global CSS
```
