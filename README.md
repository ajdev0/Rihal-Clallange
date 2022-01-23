# Getting Started with Rial Challenge

This project live Link (http://rihal-challenge.zoolmoda.com).

# Login Details

Email : abraradam@gmail.com
password : Abrar099@

### Project status

- [&check;] Statistics to display on website
  - [&check;] Count of students per class.
  - [&check;] Count of students per country.
  - [&check;] Average age of students.
- [&check;] Bonus Requirements

  - [&check;] Use a 3rd party UI library.
  - [&check;] Add dark/light mode toggle.
  - [&check;] Use GitHub as a source control for the project.
  - [&check;] Add tests.
  - [&check;] Automatically generate CreatedDate and ModifiedDate properties for all entities.

  - [&check;] Host the app as a website and share link.

# Tools Used To build Project

## Front-end

- React v-17.0.2
- Bootstrap v-5.0

## Back-end

- Node js v16.13.1
- MongoDB v5.0
- express v4.17.2

# Hosting

- heroku for api.
- sharded hosting hostinger for react app

## Available Scripts

- In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

- In the project Server directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

# Seed Data Scripts

Run it at the server dirctory

### countries

- `mongoimport --db "rihal-challenge" --collection countries --drop --file data/seed/countries.json --jsonArray`

### students

- `mongoimport --db rihal-challenge --collection students --drop --file data/seed/students.json --jsonArray`

### classes

- `mongoimport --db rihal-challenge --collection classes --drop --file data/seed/classes.json --jsonArray`

## Jwt Private Key script

### `export rihal_jwtPrivateKey=mySecureKey`
