# Restaurant application ("Kutak dobre hrane")

A web application for discovering restaurants, booking tables and ordering food for delivery.
The system is built around three roles: the **guest**, the **waiter** and the **administrator**.
A guest browses the list of restaurants, opens a restaurant page with its menu, photos, table
layout and location on the map, and can then reserve a table or place a delivery order.
Waiters process the requests that arrive for their own restaurant — they accept or reject
reservations, assign a concrete table, mark whether the guest actually showed up, and handle
deliveries. The administrator manages the whole platform: approves or rejects new guest
registrations, adds restaurants and waiter accounts, designs the table layout of a restaurant,
and blocks or unblocks guests. The frontend is an Angular single-page application and the
backend is a Spring Boot REST API on top of a MySQL database.

## What a regular user (guest) can do

- **Register and log in** — registration is sent as a request and becomes active only after an
  administrator approves it; the account has a security question used for password recovery.
- **Browse and search restaurants** — filter by name, type and address, and sort the results
  ascending or descending by any of those fields.
- **Open a restaurant page** — see the description, working hours, contact person, average
  rating and guest comments, the menu with prices and photos, the table layout, and the
  restaurant's position on a Google Map.
- **Reserve a table** — pick a date, time and number of people, optionally choose a specific
  table from the layout, and add a note; the reservation can later be cancelled or extended.
- **Order delivery** — add dishes from the menu to a cart, remove them, and place the order to
  a chosen address and delivery time.
- **Rate a visit** — after a reservation the guest was present at, leave a star rating and a
  comment for that restaurant.
- **Manage the profile** — update personal data, upload a profile picture and change the
  password.

Note: guests who repeatedly fail to show up for their reservations can be blocked by the
administrator, after which they can no longer make new reservations.

## Setup

### Prerequisites

- **JDK 17+**
- **Maven 3.8+**
- **Node.js 18+ and npm**
- **Angular CLI 16+**
- **MySQL 8+**

### 1. Database

The backend connects to MySQL with the credentials hard-coded in
`backend/src/main/java/com/example/backend/db/DB.java`:

| Setting  | Value                                  |
|----------|----------------------------------------|
| URL      | `jdbc:mysql://localhost:3306/mojabaza` |
| Username | `root`                                 |
| Password | `1234`                                 |

Create the schema:

```sql
CREATE DATABASE mojabaza;
```

If your MySQL user or password is different, change the values in `DB.java` (and, if you use
`application.properties` instead, set `spring.datasource.*` there).

The application reads and writes the following tables: `korisnici` (users), `zahtevi`
(registration requests), `odbijenizahtevi` (rejected requests), `restorani` (restaurants),
`jelovnik` (menu), `rezervacije` (reservations), `dostave` (deliveries), `korpe` (carts) and
`slike` (images). The `slike` table is a JPA entity and can be generated automatically by
setting `spring.jpa.hibernate.ddl-auto=update` in `backend/src/main/resources/application.properties`;
the remaining tables are accessed with plain JDBC, so they have to exist before the first run.

### 2. Backend (Spring Boot)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The API starts on **http://localhost:8080**. All controllers allow CORS only from
`http://localhost:4200`, so the frontend must run on that exact port. The main endpoint groups
are `/korisnici`, `/restorani`, `/jelovnik`, `/rezervacije`, `/dostave`, `/korpe`, `/zahtevi`,
`/pomocni` and `/slike`.

Required backend dependencies: `spring-boot-starter-web`, `spring-boot-starter-data-jpa`,
`spring-boot-starter-jdbc` and `mysql-connector-j`.

### 3. Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

The application is served on **http://localhost:4200**. Start the backend first, otherwise every
request will fail — the service classes point at `http://localhost:8080` directly, so there is no
proxy configuration to set up.

Required frontend dependencies beyond the Angular defaults: `chart.js` (statistics on the
administrator page). The Google Maps JavaScript API is loaded via a `<script>` tag in
`frontend/src/index.html` — replace the API key there with your own if the bundled one stops
working.
