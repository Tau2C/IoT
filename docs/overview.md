# Architectural Overview

## Project Goal

The primary goal of this platform is to create a seamless and efficient IoT management experience. This involves allowing users to monitor devices in real-time and enabling secure, high-performance communication between the devices, the server, and the user-facing applications.

## Core Architecture

This project utilizes a **client-server model** with a "Rust Core, Flutter UI" pattern for the mobile application.

## **[KEY-CONCEPT]** Component Breakdown

The platform is composed of three primary components: the **Backend Server**, the **Mobile Application**, and the **Web Panel**.

### 1. Backend Server (`/server`)

- **Technology:** Standalone Rust application.
- **Responsibilities:**
  - **Device Communication:** Manages persistent, real-time connections with IoT devices. WebSockets are the preferred protocol for this to enable bidirectional communication.
  - **API Gateway:** Exposes a RESTful JSON API for the mobile application and web panel to manage users, projects, and devices.
  - **Authentication & Authorization:** Handles secure authentication for both devices (e.g., via API keys or certificates) and users (e.g., via JWTs).
  - **Data Persistence:** Interfaces with a database (likely `sqlite`) to store all platform data, including user accounts, device information, and historical telemetry data.

### 2. Mobile Application (`/app`)

- **Technology:** A cross-platform Flutter application that follows a "Rust Core, Flutter UI" pattern.
- **Responsibilities:**
  - **User Interface:** Provides a reactive, user-friendly interface for monitoring and interacting with IoT devices.
  - **State Management:** Manages the application state, including device lists, real-time data, and user session information.
  - **API Client:** Communicates with the backend server's REST API to fetch data and send commands.
- **Rust Integration (`/app/rust`):**
  - **`[KEY-CONCEPT]` FFI Bridge:** Core business logic and performance-critical operations are implemented in a shared Rust library. This library is integrated into the Flutter app using `flutter_rust_bridge`.
  - **Purpose:** This pattern allows for memory-safe, high-performance code to be shared between the mobile app and potentially other components in the future. It handles tasks like data serialization/deserialization and complex computations that are inefficient to perform in Dart.

### 3. Web Panel (`/iot_web_panel`)

- **Technology:** A web-based application built with TypeScript and SASS.
- **Responsibilities:**
  - **Administration:** Provides a web interface for administrative tasks, such as creating and managing users, projects, and device credentials.
  - **Data Visualization:** Offers a way to visualize aggregate data from the IoT network.

## **[KEY-CONCEPT]** Data & Communication Flow

1. **IoT Device to Server:** An IoT device establishes a secure WebSocket connection to the backend server. It authenticates and begins streaming telemetry data. The server persists this data.
2. **Mobile App to Server:** The user logs into the Flutter app. The app communicates with the server's REST API to fetch a list of devices and their current states.
3. **Real-time Updates:** The server pushes real-time data from the IoT devices to the connected mobile clients (likely through another WebSocket or by piggybacking on the device connection).
4. **User Action to Device:** The user initiates an action in the app (e.g., turning a device off). The app sends a command to the server's REST API. The server validates the request and forwards the command to the appropriate IoT device via its persistent WebSocket connection.
5. **FFI Communication:** Within the Flutter app, when data is fetched from the server or needs to be sent, the Dart UI code calls functions in the compiled Rust library via the `flutter_rust_bridge`. The Rust code handles the data processing and API communication logic before returning the result to the UI.
