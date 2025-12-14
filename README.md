# IoT Management Platform

This project is an **IoT management platform**. It consists of a Flutter mobile application, a high-performance Rust backend server, and a web-based administration panel.

---

## Table of Contents

- [IoT Management Platform](#iot-management-platform)
  - [Table of Contents](#table-of-contents)
  - [Project Goal](#project-goal)
  - [Core Architecture](#core-architecture)
  - [Project Structure](#project-structure)
  - [Core Technologies](#core-technologies)
  - [Development Environment](#development-environment)
  - [Getting Started](#getting-started)
    - [1. Running the Backend Server](#1-running-the-backend-server)
    - [2. Running the Mobile App](#2-running-the-mobile-app)
    - [3. Running with Docker](#3-running-with-docker)
  - [Testing](#testing)
  - [API Endpoints](#api-endpoints)
    - [Mobile Client API](#mobile-client-api)
    - [IoT Device API](#iot-device-api)
  - [Further Documentation](#further-documentation)
  - [License](#license)

---

## Project Goal

The primary goal is to create a seamless and efficient IoT management experience, allowing users to monitor devices in real-time and enabling secure, high-performance communication between the devices, the server, and the user-facing applications.

---

## Core Architecture

This project utilizes a **client-server model** with a "Rust Core, Flutter UI" pattern for the mobile application.

- **Backend Server:** The standalone Rust server acts as the central hub. It manages persistent connections from IoT devices (likely via WebSockets), handles device authentication, and exposes a RESTful API for the mobile client and web panel.
- **Mobile App:** The Flutter application serves as the primary user interface for managing the IoT network. To maximize performance and code reuse, the core business logic is written in a shared Rust library (`app/rust`), which communicates with the Flutter UI through an FFI layer managed by the `flutter_rust_bridge` library.
- **Web Panel:** A TypeScript and SASS-based frontend provides administrative capabilities, such as user and device management.

---

## Project Structure

```tree
/
├── app/                  # Flutter mobile application source code
│   ├── lib/              # Dart UI code
│   └── rust/             # Core Rust logic for the mobile app
├── docs/                 # Detailed project documentation
├── iot_models/           # Shared Rust models for API communication
├── iot_web_panel/        # Admin panel frontend (TS/SASS)
├── server/               # Standalone Rust backend server
├── default.nix           # Nix development environment definition
└── docker-compose.yaml   # Docker configuration for deployment
```

---

## Core Technologies

- **Languages:**
  - Dart
  - Rust (2021 Edition for app core, 2024 Edition for server)
- **Database:**
  - `sqlite` (inferred from the Nix environment).
- **Package Managers:**
  - `pub` (Dart/Flutter)
  - `cargo` (Rust)

---

## Development Environment

The project uses **Nix** and **direnv** to ensure a consistent and reproducible development environment. All necessary dependencies and tools are defined in `default.nix`.

To activate the environment, either run:

```bash
nix-shell
```

Or, if you have `direnv` installed, run the following once in the project root:

```bash
direnv allow
```

The correct toolchains and environment variables will be automatically loaded.

---

## Getting Started

### 1. Running the Backend Server

```bash
# Navigate to the server directory
cd server

# Build and run the server
cargo run
```

### 2. Running the Mobile App

```bash
# Navigate to the app directory
cd app

# Get Flutter dependencies
flutter pub get

# Run the app on a connected device or emulator
flutter run
```

### 3. Running with Docker

For a production-like setup, you can use the provided Docker Compose configuration:

```bash
docker compose up -d
```

---

## Testing

- **Flutter/Dart:**
  - Unit tests are located in `app/test/`.
  - Integration tests are in `app/integration_test/`.
  - Run all Flutter tests with:

    ```bash
    cd app && flutter test
    ```

- **Rust:**
  - Unit tests are co-located with the source code in each module.
  - Integration tests can be found in the `/tests` directory of each crate.
  - Run all Rust tests with:

    ```bash
    cargo test
    ```

---

## API Endpoints

### Mobile Client API

- **Projects:** `GET, POST /projects`, `PATCH, DELETE /projects/{id}`
- **Devices:** `GET, POST /projects/{id}/devices`, `PATCH, DELETE /projects/{id}/devices/{id}`
- **Fields:** `GET, POST /project/{id}/fields`, `GET, POST, PATCH, DELETE /project/{id}/fields/{id}`

### IoT Device API

- `GET, POST /device`

---

## Further Documentation

For more detailed information on the architecture, API design, and contribution guidelines, please refer to the documents in the `/docs` directory.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more information.
