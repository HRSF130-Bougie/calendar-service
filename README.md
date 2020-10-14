# Jelly-Fish: SDC

> This is the back-end design of the calender component for a house rental application.

## Related Projects

- https://github.com/Jellyfish-130/gallery-service
- https://github.com/Jellyfish-130/calendar-service
- https://github.com/Jellyfish-130/review-service
- https://github.com/Jellyfish-130/more-places-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions.

To get the review component, run http://localhost:3002/.

## Requirements

- Node 10.5.0
- npm 6.14.8
- MongoDB 4.2.8

## Development

From within the root directory:

To install dependencies

```sh
npm install
```

To run dev environment/webpack

```sh
npm run build-dev
```

To run server

```sh
npm start-dev
```

To seed database

```sh
npm run seed
```

To run tests

```sh
npm test
```

### Installing Dependencies

From within the root directory:

```sh
npm install
```

## API Endpoints

### Add dates

- POST `/api/booking/listings`

**Success Status Code:** `201`

**Returns:** JSON

```json
{
  "_id": "5f875e9c2eccda0e6ea0d4f5",
  "date": "2020-10-01T13:00:00.000Z",
  "booked": false,
  "price": 249,
  "minimumNights": 1
}
```

### Get all dates

- GET `/api/booking/listings`

**Success Status Code:** `200`

**Returns:** JSON

```json
{
  "_id": "5f874671d0a9767a5e69ab37",
  "date": "2020-10-01T13:00:00.000Z",
  "booked": false,
  "price": 248,
  "minimumNights": 1
}
```

### Get date ID

- GET `/api/booking/listing/:listingId`

**Path Parameters:**

- `listingId` date id

**Success Status Code:** `200`

**Returns:** JSON

```json
{
  "_id": "5f874672d0a9767a5e69eb8d",
  "date": "2020-10-01T13:00:00.000Z",
  "booked": true,
  "price": 119,
  "minimumNights": 1
}
```

### Update date availability

- PATCH `/api/booking/listing/reservation/:listingId`

**Path Parameters:**

- `listingId` date id

**Success Status Code:** `204`

**Returns:** JSON

```json
{
  "success": true,
  "updatedCount": 1
}
```

### Delete all dates

- DELETE `/api/booking/listings`

**Success Status Code:** `204`

**Returns:** JSON

```json
{
  "success": true,
  "deletedCount": 100
}
```
