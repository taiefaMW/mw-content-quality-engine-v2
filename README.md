# MyWorks Content Quality Engine v2

## Overview

A scalable, enforceable content quality system for MyWorks LinkedIn content. Drafts enter from the MyWorks CustomGPT, pass through an accuracy gate and a 5-dimension quality scorer, and are either approved for publication to Notion or flagged for targeted rewrite. The engine removes subjectivity from publishing decisions — a score-based gate, not a manual vote.

## Phases

### Phase 1 — Manual Scoring Pipeline

| Stage | Description |
|---|---|
| Drafting | Writer generates a post via CustomGPT or manual draft |
| Input | Draft is pasted into the intake form |
| Quality Scoring | Scored 0–20 across 5 dimensions (total out of 100) |
| Rewrite Suggestion | If score <80, the weakest dimension is flagged with an improvement |
| Notion Sync | Manual push to Notion if score ≥70 |

**Score thresholds:** ≥80 = Approved · 70–79 = Rewrite suggested · <70 = Do not publish

### Phase 2 — Accuracy Gate + Automated Decisions

Builds on Phase 1 with a binary accuracy check before scoring reaches the writer:

| Stage | Description |
|---|---|
| Drafting | CustomGPT generates post draft |
| Accuracy Gate | Product owner reviews for factual accuracy (Yes/No). Fails go back for redraft |
| Quality Scoring | Same 5-dimension scoring; ≥80 auto-pushes to Notion |
| Rewrite Stage | Weakest dimension flagged; writer gets max 2 attempts. If still <70, post is killed |
| Notion Sync | Approved posts pushed with score, metadata, and status |

## Architecture

### Key Components

| Component | Role |
|---|---|
| **CustomGPT** | Drafts product-accurate posts |
| **Intake Form** | Ingests drafts, applies accuracy gate and scoring UI |
| **Scoring Module** | Calculates total score and per-dimension breakdown |
| **Rewrite Engine** | Identifies lowest-scoring dimension, generates targeted rewrite prompt |
| **Gating Rules** | Score-based publish/block/archive decisions |
| **Notion Output Sync** | Pushes approved content to the Notion content database |
| **KPI Dashboard** | Tracks avg score, % ≥80, rewrite rate, block rate, CTR vs score |

### Core Principles

- **Hard separation of accuracy vs quality** — product truth (yes/no) and writing quality (scored) are enforced independently
- **Targeted rewrite logic** — posts get feedback only on their weakest dimension, never vague "make it better" notes
- **Score-based publishing gate** — removes subjectivity and enforces consistency across writers
- **Built for scale** — infrastructure designed to support volume, not artisanal copy editing

### Notion Push Logic

| Condition | Action |
|---|---|
| Score ≥80 + Auto-Push ON | Auto-sent to Notion |
| Score ≥80 + Auto-Push OFF | "Push to Notion" button enabled |
| Score 70–79 (after rewrite) | Manual push option only |
| Score <70 (after 2 rewrites) | Push disabled, post archived |

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
