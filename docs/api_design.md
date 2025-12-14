# API Design

This document outlines the design for the APIs available in the IoT Management Platform. It covers both the Mobile Client API and the IoT Device API.

## 1. Core Principles

- **Simplicity:** Keep endpoints and data structures straightforward.
- **Consistency:** Maintain a uniform request and response format.
- **Standardization:** Utilize standard HTTP methods and JSON for broad compatibility.

## 2. Mobile Client API

This API is used by the Flutter mobile application to interact with the backend server.

### 2.1 Projects

- **`GET /projects`**: Retrieves a list of all projects for the authenticated user.
  - **Response Body:** `ApiResponse<Project[]>`
- **`POST /projects`**: Creates a new project.
  - **Request Body:** `{ "name": "string", "description": "string" }`
  - **Response Body:** `ApiResponse<Project>`
- **`PATCH /projects/{id}`**: Updates a project's details.
  - **Request Body:** `Partial<{ "name": "string", "description": "string" }>`
  - **Response Body:** `ApiResponse<Project>`
- **`DELETE /projects/{id}`**: Deletes a project.
  - **Response Body:** `ApiResponse<null>`

### 2.2 Devices

- **`GET /projects/{id}/devices`**: Retrieves a list of devices for a specific project.
  - **Response Body:** `ApiResponse<Device[]>`
- **`POST /projects/{id}/devices`**: Adds a new device to a project.
  - **Request Body:** `{ "name": "string", "description": "string" }`
  - **Response Body:** `ApiResponse<Device>`
- **`PATCH /projects/{id}/devices/{id}`**: Updates a device's details.
  - **Request Body:** `Partial<{ "name": "string", "description": "string" }>`
  - **Response Body:** `ApiResponse<Device>`
- **`DELETE /projects/{id}/devices/{id}`**: Deletes a device.
  - **Response Body:** `ApiResponse<null>`

### 2.3 Fields

- **`GET /projects/{id}/fields`**: Retrieves a list of fields for a specific project.
  - **Response Body:** `ApiResponse<Field[]>`
- **`POST /projects/{id}/fields`**: Adds a new field to a project.
  - **Request Body:** `{ "name": "string" }`
  - **Response Body:** `ApiResponse<Field>`
- **`PATCH /projects/{id}/fields/{id}`**: Updates a field's name.
  - **Request Body:** `Partial<{ "name": "string" }>`
  - **Response Body:** `ApiResponse<Field>`
- **`DELETE /projects/{id}/fields/{id}`**: Deletes a field.
  - **Response Body:** `ApiResponse<null>`

## 3. IoT Device API

This API is intended for use by IoT devices to communicate with the server.

### 3.1 Device Data Submission

- **Endpoint:** `/device`
- **Method:** `POST`
- **Description:** Allows IoT devices to submit telemetry data to the server.
- **Request Body:** `DeviceData[]`

### 3.2 Get device information

- **Endpoint:** `/device`
- **Method:** `GET`
- **Description:** Allows IoT devices to get information about project, fields, etc. from the server.

#### Response Body (JSON)

`ApiResponse<{project: Project, fields: Fields[]}>`

```json
{
    "code": 0,
    "data": {
        "project": {
            "name": "Project Name",
            "description": "Project Description"
        },
        "fields": [
            {
                "name": "temperature",
                "type": "number"
            },
            {
                "name": "humidity",
                "type": "number"
            }
        ]
    }
}
```

## 4. Data Structures

### 4.1 DeviceData

```rust
// Equivalent Rust struct for context
#[derive(Serialize, Deserialize, Debug)]
pub struct DeviceData {
    pub timestamp: u64,
    pub payload: serde_json::Value, // Arbitrary JSON
}
```

(This section can be expanded with more detailed Rust/Dart structs for `Project`, `Device`, `Field`, etc.)

### 4.2 `ApiResponse<T>` (Standard Response Format)

All responses from the Mobile Client API will follow this standard format:

```rust
// Equivalent Rust struct
#[derive(Serialize, Deserialize, Debug)]
pub struct ApiResponse<T> {
    pub code: u16, // 0 for success
    pub data: Option<T>,
}
```

## 5. Authentication

### 5.1 Mobile Client

Authentication is handled via JWT. The client must include an `Authorization` header with a valid Bearer token.
`Authorization: Bearer <JWT_TOKEN>`

### 5.2 IoT Device

Device authentication can be done in two ways:

1. **API Key:** The device sends a unique API key in the `X-API-Key` header. This is simple but less secure.
    - `X-API-Key: <DEVICE_API_KEY>`

2. **Certificate-based:** The device signs its request data with a private key, and the server verifies it with the corresponding public certificate.
    - The signature of the request payload is sent in the `X-API-Signature` header.
    - The device's public key or certificate fingerprint may be used as the identifier in the `X-API-Key` header.

## 6. Error Handling

Errors are communicated via the `ApiResponse` structure with a non-zero `code`. A dictionary of error codes will be maintained.
