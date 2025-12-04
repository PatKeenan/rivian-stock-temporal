# Temporal Rivian Stock Analyst

A learning project for exploring [Temporal](https://temporal.io) by building a comprehensive stock analyst agent focused on Rivian (RIVN).

## Overview

This repository serves as a hands-on way to learn Temporal's core concepts—workflows, activities, schedules, signals, and queries—by building something practical: an always-on stock analyst that continuously gathers and synthesizes information about a single stock.

The goal is to create an agent with maximum awareness about Rivian by orchestrating:

- **Price & Market Data** — Historical prices, real-time quotes, trading volume
- **News Aggregation** — Company announcements, earnings reports, analyst coverage
- **Macro & Micro Economics** — Interest rates, EV market trends, supply chain data
- **Competition Analysis** — Tracking Tesla, Lucid, and legacy automakers entering the EV space
- **World Events** — Geopolitical factors, regulatory changes, energy policy shifts
- **Summarization & Predictions** — Distilling insights and generating forward-looking analysis

## Why Temporal?

This project naturally exercises many of Temporal's strengths:

- **Long-running workflows** that persist across days, weeks, or months
- **Scheduled tasks** for periodic data collection and report generation
- **Reliable activity execution** with automatic retries for flaky API calls
- **Durable state** to accumulate knowledge over time
- **Signals & queries** to interact with running workflows

## Tech Stack

- **Runtime**: [Bun](https://bun.sh) — Fast all-in-one JavaScript runtime
- **Orchestration**: Temporal TypeScript SDK (`@temporalio/client`, `@temporalio/worker`, `@temporalio/workflow`, `@temporalio/activity`)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- [Temporal Server](https://docs.temporal.io/cli#install) running locally (or access to Temporal Cloud)

### Installation

```bash
bun install
```

### Running

```bash
bun run index.ts
```

## Project Status

🚧 **Work in Progress** — This project is actively being developed as a learning exercise.
