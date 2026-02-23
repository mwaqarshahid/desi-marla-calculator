# DMC – Desi Marla Calculator

A production-ready web app to convert land area between Pakistan’s regional marla definitions: **Normal**, **Lahori** and **Multani** Marla.

- **Normal Marla** = 272.25 sq ft
- **Lahori Marla** = 225 sq ft
- **Multani Marla** = 270 sq ft

All conversions use **square feet** as the base unit.

## Features

- **Marla conversion** – Convert between Normal, Lahori and Multani Marla; all six conversion directions with square feet as base; results to 4 decimal places.
- **Dark mode** – Toggle light/dark theme (persists in localStorage).
- **Multi-language (Urdu + English)** – Switch language from the header; RTL layout for Urdu.

## Tech Stack

- **Next.js** (App Router), **TypeScript**, **Tailwind CSS**
- **Lucide React** for icons
- **Google Fonts**: Playfair Display, DM Sans

## Getting Started

```bash
npm install
npm run dev
```

If you see module or build errors, try a clean install:

```bash
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

## E2E tests

End-to-end tests use [Playwright](https://playwright.dev/). First time only, install browsers:

```bash
npx playwright install
```

Then run tests (the script starts the dev server if needed):

```bash
npm run test:e2e
```

For the interactive UI: `npm run test:e2e:ui`.

## Build & Deploy

```bash
npm run build
npm start
```

### Deploy on Vercel

1. Push this project to a **GitHub** repository.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your repo.
3. Leave build command as `next build` and output as default.
4. Deploy. Vercel will run builds on every push (CI/CD).

Production URL will be like: `https://your-project.vercel.app`.

## Project Structure

- `app/` – App Router pages and layout (SSG)
- `components/` – CalculatorCard, Logo, MarlaReference
- `lib/` – `marla-types.ts`, `marla-convert.ts` (conversion logic)
- Optional conversion pages: `/normal-to-lahori`, `/lahori-to-normal`, etc.

## Future Expansion

The structure is ready for:

- Kanal / Acre / Square yards
- Conversion history

## Contact

- GitHub ([mwaqarshahid](http://github.com/mwaqarshahid))
- LinkedIn ([Waqar Shahid](https://www.linkedin.com/in/waqarshahid/))
- Email ([waqar-shahid@hotmail.com](mailto:waqar-shahid@hotmail.com))

Made with ❤️ by Waqar Shahid from Pakistan.
