# Quiz app

Quiz app is designed for creating questions on chosen topics and answering them in form of the quiz.

Online version accessible at:  [quiz-app-mh3a.onrender.com](https://quiz-app-mh3a.onrender.com/)

---

### Features
1. **Authentication:**
    - Users can create account through registration form. App has login/logout feature.
2. **Topics:**
   - Offers possibility to create and delete questions in predefined topics. It also allows to create and delete answers 
   for questions. Creating question has option to choose whether answer is correct or not.
   - Only admin users are allowed to create and delete topic. All users can create/delete questions and answers.
3. **Quiz:**
   - Users can take a quiz. First they choose a topic and then answer question, which is randomly chosen from previously
   created questions in topics section. Correct answer is shown after user's answer is submitted. Only authenticated 
   users are allowed to take quiz.
4. **API:**
   - API is provided. It is possible to send request for a question, send back the chosen answer and API responses 
   whether the answer was correct or wrong.
   - API doesn't require any authentication. It is free to use.

---

## Application Structure and Technologies

The application follows a three-tier architecture with Deno as the server, a web browser as the client,
and PostgreSQL powered by PostgresJS as the database. Additionally, it adheres to a layered architecture
with views, controllers, services, and a database layer.


The application is placed in the drill-and-practice directory as root.

### Technology Stack

- **Runtime:** Deno
- **Database:** PostgreSQL
- **Views:** Eta
- **Styling:** Bootstrap (v4.5.2), Google Fonts, Font Awesome (v6.1.2)
- **Validation:** Validasaurus
- **Encryption:** bcrypt
- **Routing:** Oak

### Additional Components

- **Database Migration:** Flyway (v9.11.0-alpine)
- **End-to-End Tests:** Playwright (v1.40.1-focal)
- **Deployment** Docker (v3.4)

---

## Accessing the application

The application has been deployed to Render and can be viewed and tested at: [quiz-app-mh3a.onrender.com](https://quiz-app-mh3a.onrender.com/).

> For testing app as admin user, log in as **admin@admin.com** with password **123456**

### Running the application locally

The application utilizes Docker for local deployment. Follow these steps:

1. Build the Docker image and start the container: `docker-compose up --build`.
2. Access the application in your web browser: [http://localhost:7777](http://localhost:7777).

### Running tests
Application contains end-to-end test done with Playwright. Tests cover the user authentication features.
Tests can be run with a command ` docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf`.

### OS Requirements

This container image was created for Ubuntu 23.04. For different operating system like MacOs, you might need to
use different image for Deno and Playwright.

- Open Dockerfile in drill-and-practice folder and change first line from `FROM denoland/deno:alpine-1.37.0` to `FROM lukechannings/deno:v1.37.0`
- Open Dockerfile in e2e-playwright folder and change first line from `FROM mcr.microsoft.com/playwright:v1.40.1-focal` to `FROM mcr.microsoft.com/playwright:v1.40.1-vrt-arm64`

---
## Troubleshooting

There might be a few issues at first with starting a project. Here are few possible reasons and solutions:

### Container already in use

It is also possible that Docker is clashing with  previously build images and containers. If that's
the case, here are few possible solutions:
- Stop all containers with - `docker compose stop`
- Remove previously build images - `docker image prune -a`
- Change the name of the containers in docker-compose.yml and project.env file. The most common
  issue is with database container.

```
// docker-compose.yml

// ...
  database:
    container_name: database-p1       <-- change the name
// ...
```
also
```
project.env

# Database configuration for Flyway (used for database migrations)
FLYWAY_USER=username
FLYWAY_PASSWORD=password
FLYWAY_URL=jdbc:postgresql://database-p1:5432/database     <-- here 

# Database configuration for Deno's PostgreSQL driver
PGUSER=username
PGPASSWORD=password
PGHOST=database-p1                           <-- and here (use the same name)
PGPORT=5432
PGDATABASE=database
```



