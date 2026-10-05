# Country Route API

Given a three-letter North American country code, this API returns the ordered
list of countries a driver must pass through when traveling by land from the
USA to the destination.

**Live URL:** https://country-route-api.onrender.com/
(Hosted on a free tier, so the first request may take up to a minute to wake up.)

## Usage

Send a GET request with the country code at the end of the URL:

    GET /{COUNTRY_CODE}

| Request | Status | Response |
|---------|--------|----------|
| /PAN | 200 | {"destination":"PAN","list":["USA","MEX","GTM","HND","NIC","CRI","PAN"]} |
| /BLZ | 200 | {"destination":"BLZ","list":["USA","MEX","BLZ"]} |
| /pan | 200 | Same as /PAN (input is case-insensitive) |
| /FRA | 404 | {"error":"Country not supported"} |

Visiting the URL in a browser works too, for example `https://country-route-api.onrender.com/PAN`.

## Run locally

Requires Node.js 20 or newer.

    npm install
    npm start        # runs on http://localhost:3000
    npm test         # runs the unit and API tests

## Project structure

    src/
      borders.js      Border data stored as an adjacency list
      pathfinder.js   Breadth-first search from USA to the destination
      app.js          Express app and routes
      server.js       Starts the server (kept separate so tests can import app.js)
    tests/
      pathfinder.test.js   Unit tests for the search logic
      api.test.js          Endpoint tests using supertest

## How it works

The simplified map is stored as an adjacency list in `src/borders.js`. When a
request comes in, `src/pathfinder.js` runs a breadth-first search (BFS)
starting at the USA and walks outward one border at a time until it reaches the
destination, then rebuilds the route by tracing back through each country's
parent.

## Assumptions

1. Input is case-insensitive and whitespace-trimmed (`pan` works like `PAN`).
2. "Route" means the shortest path by number of border crossings.
3. The list includes both the start (USA) and the destination.
4. `USA` returns `["USA"]`, and `CAN` returns `["USA","CAN"]`.
5. Only land borders from the provided map are used (no ports, flights, or
   countries outside the map).
6. Any code that isn't on the map (an unsupported country or invalid input)
   returns 404 with an error message.
7. The response is JSON with the keys `destination` and `path`.