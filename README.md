# Eclipse

This project shows one question per day that can be answered only once. It is
built with Next.js, TypeScript and Tailwind CSS.

## Available Scripts

- `npm run dev` – Runs the development server
- `npm run build` – Builds the production application
- `npm start` – Starts the production server

## Project Structure

- `pages/` – Application pages and API routes
- `styles/` – Global styles powered by Tailwind CSS

## Using Daily Questions

Questions for each date are stored in `public/questions.json`.  Update this file
to change or add new questions.  You can view a question by navigating to
`/today` or by specifying a date directly, e.g. `/today?date=2023-01-01`.

Submitted answers are stored on the server under `data/answers.json` and can be
viewed on the **History** page.
