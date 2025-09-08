# TripMate (MVP Web – Vite + React + Tailwind)

All-in-one travel manager MVP for SIH. Frontend-only right now using localStorage, structured so you can later swap to a real backend.

## Quickstart

```bash
# 1) unzip
cd tripmate-web

# 2) install
npm install

# 3) set OpenWeather key (optional for Safety page)
echo "VITE_OPENWEATHER_KEY=YOUR_KEY_HERE" > .env

# 4) run
npm run dev
```

Open http://localhost:5173

## Pages
- Expenses (planned vs actual + suggestions, chart)
- Planning (group members + destination priority voting)
- Safety (weather + local rules placeholder)
- Photos (upload + GPS tag)
- Logs (daily notes + optional GPS)

## Notes
- Data persists in **localStorage** per browser.
- Replace localStorage with real API later by creating services in `src/lib/`.
