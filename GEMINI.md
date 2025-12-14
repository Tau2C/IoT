# GEMINI.MD: AI Collaboration Guide

This document provides essential context for AI models interacting with this project. Adhering to these guidelines will ensure consistency and maintain code quality.

## 1. Project Overview & Purpose

+ **Primary Goal:** This is an IoT management platform. It consists of a Flutter mobile application for user interaction and a Rust backend server that manages connections from IoT devices. The project's goal is to create a robust and scalable system for monitoring and managing an IoT network.
+ **Business Domain:** Internet of Things (IoT)

## 2. Core Technologies & Stack

+ **Languages:** Dart, Rust (2021 edition for the app library, 2024 for the server), with platform-specific code in Kotlin (Android) and Swift (iOS).
+ **Frameworks & Runtimes:** Flutter (`^3.8.0`) for the cross-platform mobile application. The Rust server has no specific framework dependencies listed, but the README mentions `tokio` and `warp` as possibilities.
+ **Databases:** The exact database is not specified. However, `sqlite` is included in the Nix development environment, suggesting it may be the intended database.
+ **Key Libraries/Dependencies:**
  + **Flutter/Dart:** `flutter_rust_bridge` (`2.11.1`) is critical, used to integrate the Rust core logic with the Flutter UI.
  + **Rust (app core):** `flutter_rust_bridge` (`=2.11.1`).
  + **Rust (server):** No dependencies are currently listed.
+ **Package Manager(s):** `pub` for Dart/Flutter, `cargo` for Rust.
+ **Build/Environment:** `Nix` and `direnv` are used to ensure a consistent development environment, as defined in `default.nix`.

## 3. Architectural Patterns

+ **Overall Architecture:** The project uses a client-server model. The Rust server acts as the backend, and the Flutter application is the client.
+ **Core Application Architecture:** The Flutter app follows a "Rust Core, Flutter UI" pattern. The core business logic and high-performance tasks are written in a shared Rust library (`app/rust`), which communicates with the Flutter UI through an FFI layer managed by `flutter_rust_bridge`.
+ **Directory Structure Philosophy:**
  + `/app`: Contains the complete Flutter mobile application, including platform-specific code (Android, iOS, etc.), Dart UI code (`lib`), and the integrated Rust core (`rust`).
  + `/server`: Contains the standalone Rust backend server.
  + `/docs`: Contains all project documentation and AI agent instructions.
  + `/target`: Contains Rust build artifacts (ignored by version control).
  + `/.github/workflows`: Contains CI/CD automation pipelines.

## 4. Coding Conventions & Style Guide

+ **Formatting:**
  + **Dart:** Follows the standard `flutter_lints` package, as configured in `app/analysis_options.yaml`.
  + **Rust:** No explicit `rustfmt.toml` is present, so the default `rustfmt` style is assumed.
+ **Naming Conventions:**
  + `classes`, `types`: `PascalCase` (e.g., `MyApp` in Dart).
  + `variables`, `functions`: `camelCase` in Dart (e.g., `runApp`), `snake_case` in Rust (e.g., `main`).
+ **API Design:** Inferred to be RESTful based on README, with potential WebSocket support for real-time updates. JSON is the likely data format.
+ **Error Handling:** Uses `async/await` with Futures in Dart. Rust code is expected to use the standard `Result` and `Option` types for error and optionality handling.

### 4.3 Logging Levels

When implementing logging, adhere to the following guidelines for log levels:

+ **error:** The application is not working or a critical component has failed.
+ **warn:** The application is working, but something unusual or potentially problematic occurred.
+ **info:** A significant event happened, providing general progress or state information.
+ **debug:** Detailed information, useful for development but not typically needed in production.
+ **trace:** Extremely detailed information, printing everything, often compiled out in release builds.

## 5. Key Files & Entrypoints

+ **Main Entrypoint(s):**
  + **Mobile App:** `app/lib/main.dart`
  + **Backend Server:** `server/src/main.rs`
  + **App's Rust Core:** `app/rust/src/lib.rs`
+ **Configuration:**
  + **Project Workspace:** `Cargo.toml` at the root defines the workspace members (`server`, `logic_gate`).
  + **Flutter App:** `app/pubspec.yaml`
  + **Rust-Flutter Bridge:** `app/flutter_rust_bridge.yaml`
  + **Development Environment:** `default.nix` and `.envrc`
+ **CI/CD Pipeline:** `.github/workflows/docs_updater.yml`

## 6. Development & Testing Workflow

+ **Local Development Environment:** The environment is managed by `Nix` and `direnv`. To start, run `nix-shell` or use `direnv allow`.
  + Run the app: `cd app && flutter run`
  + Run the server: `cd server && cargo run`
+ **Testing:**
  + **Flutter:** Run tests via `flutter test`. Widget tests are in `app/test/` and integration tests are in `app/integration_test/`.
  + **Rust:** Run tests via `cargo test`. Unit tests for a module should be written within the module file itself. Integration tests for the entire binary should be placed in the `/tests` directory.
+ **CI/CD Process:** A workflow exists to automatically update documentation in the `/docs` directory based on commit messages. It is triggered on pushes to `master` and `development`. Commits with `[DEVDOCS]` in the message are skipped to prevent update loops.

## 7. Specific Instructions for AI Collaboration

+ **Contribution Guidelines:** Before starting work, read `docs/AGENT_INSTRUCTIONS.md` and the rest of the `/docs` directory to understand project goals and documentation maintenance rules.
+ **Infrastructure (IaC):** No Infrastructure as Code directory was found.
+ **Security:** Be mindful of security. Do not hardcode secrets or keys. Ensure any changes to authentication or data handling logic are secure and vetted.
+ **Dependencies:**
  + **Flutter:** Add new dependencies using `flutter pub add <package>`.
  + **Rust:** Add new dependencies using `cargo add <crate>` within the appropriate crate's directory (`app/rust` or `server`).
+ **Commit Messages:** While not explicitly enforced, the CI workflow suggests a convention is in use. Follow the Conventional Commits specification (e.g., `feat:`, `fix:`, `docs:`) for all commits. For documentation-only changes made by an AI, use the `[DEVDOCS]` tag in the commit message. Changes to documentation should be committed separately from code changes.

+ **General Workflow:** AI agents are not permitted to run `cargo run` (or similar execution commands like `flutter run` or `npm start`). The AI agent may provide the command to the user, but the execution of such commands is the sole responsibility of the user. For Rust code changes, AI agents should run `cargo check` for verification before suggesting `cargo run` or other execution commands.
