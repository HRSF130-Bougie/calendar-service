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

To run MongoDB

```sh
mkdir data
mongod --dbpath data
```

To seed database

```sh
npm run seed
```

To run tests

```sh
npm run test
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
[
  {
    "days": [
      [
        {
          "_id": "5f87877a925bba0f2706b108",
          "date": "2021-03-31T14:00:00.000Z",
          "booked": true,
          "price": 180,
          "minimumNights": 1
        }
      ]
    ],
    "_id": "5f87877a925bba0f2706b052",
    "listing_id": 1,
    "cleaningFee": 70,
    "weekendPricing": true,
    "lowestPrice": 180,
    "rating": 3.94,
    "reviews": 745,
    "reservations": [],
    "__v": 0
  }
]
```

### Get all dates

- GET `/api/booking/listings`

**Success Status Code:** `200`

**Returns:** JSON

```json
[
  {
    "days": [
      [
        {
          "_id": "5f87877a925bba0f2706b108",
          "date": "2021-03-31T14:00:00.000Z",
          "booked": true,
          "price": 180,
          "minimumNights": 1
        }
      ]
    ],
    "_id": "5f87877a925bba0f2706b052",
    "listing_id": 1,
    "cleaningFee": 70,
    "weekendPricing": true,
    "lowestPrice": 180,
    "rating": 3.94,
    "reviews": 745,
    "reservations": [],
    "__v": 0
  }
]
```

### Get date ID

- GET `/api/booking/listing/:listingId`

**Path Parameters:**

- `listingId` date id

**Success Status Code:** `200`

**Returns:** JSON

```json
[
  {
    "days": [
      [
        {
          "_id": "5f87877a925bba0f2706b108",
          "date": "2021-03-31T14:00:00.000Z",
          "booked": true,
          "price": 180,
          "minimumNights": 1
        }
      ]
    ],
    "_id": "5f87877a925bba0f2706b052",
    "listing_id": 1,
    "cleaningFee": 70,
    "weekendPricing": true,
    "lowestPrice": 180,
    "rating": 3.94,
    "reviews": 745,
    "reservations": [],
    "__v": 0
  }
]
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
