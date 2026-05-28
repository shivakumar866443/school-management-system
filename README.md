# Universal School Portal

A reusable React website for schools. It includes public pages, charts, ratings, gallery, admissions, careers, contact with map, and an admin-only area for student management previews.

## Tech Stack

- React.js with Vite
- Material UI
- React Router
- Recharts
- School content from `src/data/schoolData.js`

## Run Locally

```bash
npm install
npm run dev
```

Local URL:

```text
http://127.0.0.1:5173
```

## Admin Demo Login

```text
Email: admin@school.com
Password: Admin@123
```

This preview login is intended for guided review and can be connected to production services when the implementation moves to deployment.

## Deploy To Vercel

1. Push the code to GitHub.
2. Import the repository in Vercel.
3. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`

## Customization

Update school-specific content in:

```text
src/data/schoolData.js
```

Images, address, map query, reviews, contact details, admissions content, careers, and demo student data can be changed there.
