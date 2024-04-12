# Cargobite Test Assessment

Test assessment showcasing users management API.

## Screencast

Screencast showcasing app: 

https://github.com/dmytromiento/cargobite-back-end/assets/141241827/e594f67d-2839-4fcc-8921-7512eda19bf0

## Get Started

Install dependencies:

```bash
npm install
```

Add `.env` file to the root directory according to `.env.example`.

Make sure you have psql running locally, and create a new db with:

```bash
createdb cargobite
```

Generate prisma client

```bash
npx prisma generate
```

Run the migrations:

```bash
npx prisma db push
````

Seed the database:

```
npm run seed
```

Run the development server:

```bash
npm run dev
```

The API will be available at [http://localhost:3000](http://localhost:3000).

## Testing

You can use `Cargobite BE.postman_collection.json` collection for testing the API locally.

## Linting

- `npm run format` - automatically fixes code style according to prettier rules
- `npm run lint` - checks for eslint, prettier, and TS errors
- `npm run lint:js` - runs eslint check
- `npm run lint:types` - runs types check

CI/CD pipeline automatically runs linter checks on push and pull requests.
