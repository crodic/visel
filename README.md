# [VISEL PROJECT]

## Overview

This project is built using the **[CRODIC FRAMEWORK]** stack and is structured for scalability, maintainability, and ease of deployment.  
This template is reusable across projects built with **React Vite**, **Next.js**, **NestJS**, and **PostgreSQL**.

Replace bracket placeholders (e.g., `[PROJECT NAME]`, `[CRODIC FRAMEWORK]`) to customize for your project.

---

## Table of Contents

- Features
- Tech Stack
- Project Structure
- Installation
- Configuration
- Development
- Build & Deployment
- Database Migration
- Environment Variables
- Scripts
- Testing
- Troubleshooting
- License

---

## Features

- Modular and scalable architecture.
- Environment-based configuration.
- PostgreSQL database support.
- Production-ready build process.
- Linting and formatting included.
- Optional Docker development setup.

---

## Tech Stack

### React Vite

- React
- Vite
- TypeScript
- React Query / Zustand / Redux Toolkit
- TailwindCSS (optional)

### Next.js

- Next.js
- React
- TypeScript
- App Router / Pages Router
- Prisma / Drizzle / TypeORM
- TailwindCSS

### NestJS

- NestJS
- TypeScript
- PostgreSQL
- TypeORM / Prisma / Drizzle
- Swagger
- BullMQ / Redis (optional)

---

## Installation

```bash

    git clone https://github.com/crodic/visel.git
    cd web-server
    pnpm install
    cd ../

    cd web-vite
    pnpm install
    cd ../

    cd web-next
    pnpm install
    cd ../

    cd storybook
    pnpm install
    cd ../

```

## Configuration

Copy the `.env.example` file to `.env` and update the values as needed.

## Development

```bash

    cd web-server
    pnpm start:dev

    cd web-vite
    pnpm run dev

    cd web-next
    pnpm run dev

    cd storybook
    pnpm run dev

```

## Storybook

```bash

    cd storybook
    pnpm run storybook

```
