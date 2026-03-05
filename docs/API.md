# SubDub API Documentation

Last updated: March 4, 2026  
API version: `v1`  
Service: `subdub`

## 1. Overview
SubDub is a Node.js/Express API for user authentication and subscription tracking with renewal reminder workflows.

### Core capabilities
- User sign-up and sign-in with JWT-based authentication.
- CRUD operations for subscriptions.
- User-scoped subscription views and cancellation.
- Scheduled renewal reminder workflow via Upstash Workflow + QStash.
- Global request protection with Arcjet (rate limiting, bot detection, shield rules).

### Tech stack
- Runtime: Node.js (ES Modules)
- Framework: Express 4
- Database: MongoDB + Mongoose
- Auth: JWT + bcrypt
- Security middleware: Arcjet
- Workflow orchestration: Upstash Workflow
- Email delivery: Nodemailer (Gmail)

## 2. API Base URL and Versioning
- Local default (from code examples): `http://localhost:5500`
- Versioned prefix: `/api/v1`
- Example full endpoint: `http://localhost:5500/api/v1/auth/signup`

## 3. Authentication and Security

### 3.1 JWT authentication
Obtain a token via:
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/signin`

Send token on protected endpoints:

```http
Authorization: Bearer <jwt_token>
```

### 3.2 Global Arcjet protection
`arcjetMiddleware` is applied globally before all routers.

Potential Arcjet responses:
- `429 Too Many Requests`
  ```json
  { "success": false, "error": "Too Many Requests" }
  ```
- `403 Forbidden: Bot detected`
  ```json
  { "success": false, "error": "Forbidden: Bot detected" }
  ```
- `403 Forbidden`
  ```json
  { "success": false, "error": "Forbidden" }
  ```

### 3.3 Workflow endpoint security
`POST /api/v1/workflows/subscription/reminder` is wrapped by `@upstash/workflow/express` `serve(...)` and is intended to be called by Upstash/QStash.

## 4. Request and Response Conventions

### 4.1 JSON body parsing
The API accepts JSON request bodies:

```http
Content-Type: application/json
```

### 4.2 Success response envelope
Most implemented controllers return:

```json
{
  "success": true,
  "message": "Human readable message",
  "data": {}
}
```

### 4.3 Error response envelope
Errors are not fully uniform. Depending on where the error occurs, responses can be:

```json
{
  "success": false,
  "message": "Error message",
  "error": "{...stringified_error_object...}"
}
```

or auth middleware style:

```json
{
  "success": false,
  "message": "Not authorized, no token"
}
```

or Arcjet style (without `message`):

```json
{
  "success": false,
  "error": "Too Many Requests"
}
```

## 5. Data Models

### 5.1 User
Collection model: `User`

| Field | Type | Required | Validation / Constraints |
|---|---|---|---|
| `name` | string | Yes | trim, min 2, max 50 |
| `email` | string | Yes | unique, lowercase, trim, email regex |
| `password` | string | Yes | min 8 |
| `createdAt` | date | Auto | Mongoose timestamp |
| `updatedAt` | date | Auto | Mongoose timestamp |

Notes:
- Password is hashed with bcrypt before persistence during sign-up.
- Some endpoints currently return hashed password in API responses.

### 5.2 Subscription
Collection model: `Subscription`

| Field | Type | Required | Validation / Constraints |
|---|---|---|---|
| `name` | string | Yes | trim, min 2, max 100 |
| `price` | number | Yes | min 0 |
| `currency` | string | Yes | enum: `USD`, `EUR`, `GBP`, `INR`, `JPY`, `AUD` |
| `frequency` | string | Yes | enum: `monthly`, `quarterly`, `yearly` |
| `category` | string | Yes | enum: `Entertainment`, `Food`, `Health`, `Other` |
| `startDate` | date | Yes | cannot be in the future |
| `renewalDate` | date | Yes* | must be after `startDate`; auto-computed if omitted |
| `paymentMethod` | string | Yes | trim |
| `status` | string | Auto/default | enum: `active`, `cancelled`, `expired`; default `active` |
| `user` | ObjectId(User) | Yes | indexed |
| `createdAt` | date | Auto | Mongoose timestamp |
| `updatedAt` | date | Auto | Mongoose timestamp |

Auto behavior (`pre('validate')`):
- If `renewalDate` is missing, it is derived from `startDate + frequency`:
  - monthly: +30 days
  - quarterly: +90 days
  - yearly: +365 days
- `status` is recalculated as `expired` if renewal date is in the past, else `active`.

## 6. Endpoint Reference

### 6.1 Health

### `GET /`
Basic service check.

Response: `200 OK` (text)
```text
Hello World!
```

### 6.2 Auth

### `POST /api/v1/auth/signup`
Create a new user account.

Auth: No

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "strongPassword123"
}
```

Success response: `201 Created`

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "token": "<jwt>",
    "user": {
      "_id": "...",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "password": "$2a$10$...",
      "createdAt": "...",
      "updatedAt": "...",
      "__v": 0
    }
  }
}
```

Common errors:
- `400` user already exists
- `400` validation errors (name/email/password constraints)
- `500` unexpected server/database errors

### `POST /api/v1/auth/signin`
Authenticate existing user.

Auth: No

Request body:

```json
{
  "email": "jane@example.com",
  "password": "strongPassword123"
}
```

Success response: `200 OK`

```json
{
  "success": true,
  "message": "Signed in successfully",
  "data": {
    "token": "<jwt>",
    "user": {
      "_id": "...",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "password": "$2a$10$...",
      "createdAt": "...",
      "updatedAt": "...",
      "__v": 0
    }
  }
}
```

Common errors:
- `400` `User not found`
- `400` `Invalid credentials`

### `POST /api/v1/auth/signout`
Currently a placeholder route.

Auth: No

Response: `200 OK` (text)
```text
signout
```

### 6.3 Users

### `GET /api/v1/users`
Return all users.

Auth: No

Success: `200 OK`

```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [
    {
      "_id": "...",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "password": "$2a$10$...",
      "createdAt": "...",
      "updatedAt": "...",
      "__v": 0
    }
  ]
}
```

### `GET /api/v1/users/:id`
Return one user by MongoDB ObjectId.

Auth: Yes (`Bearer <token>`)

Path params:
- `id` (string, MongoDB ObjectId)

Success: `200 OK`

```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "_id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "createdAt": "...",
    "updatedAt": "...",
    "__v": 0
  }
}
```

Common errors:
- `401` missing/invalid token
- `404` user not found
- `404` invalid ObjectId cast

### `POST /api/v1/users`
Placeholder route.

Response: `200 OK` text `create user`

### `PUT /api/v1/users/:id`
Placeholder route.

Response: `200 OK` text `update user`

### `DELETE /api/v1/users/:id`
Placeholder route.

Response: `200 OK` text `delete user`

### 6.4 Subscriptions

### `GET /api/v1/subscriptions`
Return all subscriptions.

Auth: No

Query params:
- `page` (number, optional, default `1`)
- `limit` (number, optional, default `10`, max `100`)

Success: `200 OK`

```json
{
  "success": true,
  "message": "Subscriptions fetched successfully",
  "data": [{ "...": "Subscription" }],
  "pagination": {
    "total": 57,
    "page": 2,
    "limit": 10,
    "totalPages": 6,
    "hasNextPage": true,
    "hasPrevPage": true
  }
}
```

### `GET /api/v1/subscriptions/:id`
Return one subscription.

Auth: No

Path params:
- `id` (string, MongoDB ObjectId)

Common errors:
- `404` subscription not found
- `404` invalid ObjectId cast

### `POST /api/v1/subscriptions`
Create a subscription for authenticated user and trigger renewal reminder workflow.

Auth: Yes

Request body:

```json
{
  "name": "Netflix Premium",
  "price": 15.99,
  "currency": "USD",
  "frequency": "monthly",
  "category": "Entertainment",
  "startDate": "2026-03-01T00:00:00.000Z",
  "renewalDate": "2026-03-31T00:00:00.000Z",
  "paymentMethod": "Visa **** 4242"
}
```

Notes:
- `user` is injected from authenticated token (`req.user._id`).
- `renewalDate` can be omitted; model computes it from `startDate` and `frequency`.
- On success, workflow trigger result contains `workflowRunId`.

Success: `201 Created`

```json
{
  "success": true,
  "message": "Subscription created successfully",
  "data": {
    "subscription": {
      "_id": "...",
      "name": "Netflix Premium",
      "price": 15.99,
      "currency": "USD",
      "frequency": "monthly",
      "category": "Entertainment",
      "startDate": "...",
      "renewalDate": "...",
      "paymentMethod": "Visa **** 4242",
      "status": "active",
      "user": "...",
      "createdAt": "...",
      "updatedAt": "...",
      "__v": 0
    },
    "workflowRunId": "..."
  }
}
```

### `PUT /api/v1/subscriptions/:id`
Update subscription by ID.

Auth: No

Path params:
- `id` (string, MongoDB ObjectId)

Body: partial subscription fields.

Success: `200 OK`

Common errors:
- `404` subscription not found
- `400` validation errors

### `DELETE /api/v1/subscriptions/:id`
Delete subscription by ID.

Auth: No

Success: `200 OK`

Common errors:
- `404` subscription not found

### `GET /api/v1/subscriptions/user/:id`
Return all subscriptions for a user if requester owns that user ID.

Auth: Yes

Path params:
- `id` (user ObjectId)

Authorization rule:
- Allowed only when `req.user.id === req.params.id`

Query params:
- `page` (number, optional, default `1`)
- `limit` (number, optional, default `10`, max `100`)

Responses:
- `200` with paginated list of user subscriptions
- `401` if requester is not owner

### `PUT /api/v1/subscriptions/:id/cancel`
Cancel one subscription if requester owns it.

Auth: Yes

Path params:
- `id` (subscription ObjectId)

Authorization rule:
- Allowed only when `subscription.user.toString() === req.user.id`

Success: `200 OK` with updated subscription object

### `GET /api/v1/subscriptions/upcoming-renewals`
Intended to return active subscriptions approaching renewal for authenticated user.

Auth: Yes

Query params (implemented in handler):
- `page` (number, optional, default `1`)
- `limit` (number, optional, default `10`, max `100`)

Current implementation state:
- Route exists but has a path-order conflict and parameter mismatch, so it does not behave as intended (see section 10).

### 6.5 Workflow Endpoint

### `POST /api/v1/workflows/subscription/reminder`
Workflow handler for scheduled renewal reminder emails.

Auth: Not standard JWT; endpoint is intended for Upstash workflow runtime.

Request body:

```json
{
  "subscriptionId": "<subscription_object_id>"
}
```

Behavior summary:
- Loads subscription and associated user (`name`, `email`).
- Stops if subscription missing, inactive, or renewal date is in the past.
- Schedules reminders at 7, 5, 2, 1, and 0 days before renewal date.
- Sends email reminder using template + nodemailer.

## 7. Common Status Codes
- `200` request succeeded
- `201` resource created
- `400` validation/business rule failure
- `401` authentication or ownership failure
- `403` forbidden by Arcjet/bot detection
- `404` resource not found / invalid ObjectId cast
- `429` Arcjet rate limit
- `500` unexpected server error

## 8. Environment Variables
Environment file pattern:
- `.env.development.local`
- `.env.<NODE_ENV>.local`

| Variable | Required | Description |
|---|---|---|
| `NODE_ENV` | Recommended | Environment name (e.g., `development`, `production`) |
| `PORT` | Yes | HTTP server port |
| `SERVER_URL` | Yes | Public server URL used for workflow callback trigger |
| `DB_URI` | Yes | MongoDB connection URI |
| `JWT_SECRET` | Yes | JWT signing secret |
| `JWT_EXPIRES_IN` | Yes | JWT expiry (e.g. `1d`, `7d`) |
| `ARCJET_KEY` | Yes | Arcjet API key |
| `ARCJET_ENV` | Optional in current code | Arcjet environment value (exported but not consumed) |
| `QSTASH_URL` | Yes | Upstash QStash base URL |
| `QSTASH_TOKEN` | Yes | Upstash/QStash auth token |
| `QSTASH_CURRENT_SIGNING_KEY` | Required by Upstash webhook verification | Current signing key |
| `QSTASH_NEXT_SIGNING_KEY` | Required by Upstash webhook verification | Next signing key |
| `EMAIL_PASSWORD` | Yes | App password for configured Gmail sender |

## 9. Example End-to-End cURL Flow

### 9.1 Sign up
```bash
curl -X POST http://localhost:5500/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "strongPassword123"
  }'
```

### 9.2 Sign in
```bash
curl -X POST http://localhost:5500/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "strongPassword123"
  }'
```

### 9.3 Create subscription (protected)
```bash
curl -X POST http://localhost:5500/api/v1/subscriptions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Netflix Premium",
    "price": 15.99,
    "currency": "USD",
    "frequency": "monthly",
    "category": "Entertainment",
    "startDate": "2026-03-01T00:00:00.000Z",
    "paymentMethod": "Visa **** 4242"
  }'
```

### 9.4 Get current user subscriptions
```bash
curl -X GET http://localhost:5500/api/v1/subscriptions/user/<userId> \
  -H "Authorization: Bearer <token>"
```

## 10. Known Implementation Gaps (as of March 4, 2026)
These are current code realities that API consumers and maintainers should be aware of:

1. Several routes are placeholders:
- `POST /api/v1/auth/signout`
- `POST /api/v1/users`
- `PUT /api/v1/users/:id`
- `DELETE /api/v1/users/:id`

2. `GET /api/v1/subscriptions/upcoming-renewals` is not currently functional as intended:
- Route ordering places `/:id` before `/upcoming-renewals`, causing matching conflicts.
- Handler expects `req.params.id`, but route does not provide one.

3. Sensitive field exposure:
- `signup`, `signin`, and `GET /api/v1/users` currently include hashed password in returned user objects.

4. Authorization coverage is incomplete for subscription mutation/read endpoints:
- `GET /api/v1/subscriptions/:id`, `PUT /api/v1/subscriptions/:id`, and `DELETE /api/v1/subscriptions/:id` are currently unprotected.

5. Subscription cancel behavior can be overwritten:
- A model `pre('validate')` hook recalculates `status` to `active/expired`, which can override manually setting `cancelled`.

6. Error response schema is inconsistent across middleware and controllers.

## 11. Recommended Hardening Backlog
For production-grade API maturity:

1. Standardize all error payloads with a single schema and error codes.
2. Remove password fields from all response payloads.
3. Apply consistent auth and ownership checks on all user/subscription mutations.
4. Fix and test `/subscriptions/upcoming-renewals` route behavior.
5. Replace placeholder endpoints with full implementations or remove them from public surface.
6. Add filtering/sort options to list endpoints.
7. Add API integration tests (auth, validation, ownership, workflow trigger).
8. Publish and enforce OpenAPI schema validation in CI.
