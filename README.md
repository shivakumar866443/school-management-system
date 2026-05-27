# Universal School Portal

A reusable static React website for schools. It includes public pages, charts, ratings, gallery, admissions, careers, contact with map, and a static admin-only area for student management previews.

## Tech Stack

- React.js with Vite
- Material UI
- React Router
- Recharts
- Static data from `src/data/schoolData.js`

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

This is a static demo login. When backend work starts, replace this with Node.js, MongoDB, file uploads, real JWT authentication, and role-based access.

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
