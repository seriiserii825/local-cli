# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A TypeScript CLI tool for [Local](https://localwp.com) (a local WordPress development app) that exposes Local's GraphQL API via command-line. Built with [oclif](https://oclif.io/). **This project is no longer actively maintained.**

## Commands

```bash
npm test          # Run mocha tests + istanbul coverage; ESLint runs as posttest
npm run prepack   # Compile TypeScript (tsc -b), generate oclif manifest, update README
```

TypeScript output goes to `lib/`. Linting config: `.eslintrc` (oclif + oclif-typescript presets).

To run a single test file:
```bash
npx mocha --require ts-node/register test/path/to/test.ts
```

## Architecture

**Entry point**: `bin/run` → oclif bootstrap → `src/index.ts`

**Commands** (`src/commands/`): Each extends oclif's `Command` base class and issues a GraphQL query/mutation against Local's API (`http://127.0.0.1:4000/graphql`).
- `list-sites` — queries all sites, renders a `cli-table`
- `start-site` / `stop-site` — mutations; accept site name (resolved to ID) or site ID

**Helpers** (`src/helpers/`):
- `get-connection-info.ts` — reads `~/Library/Application Support/Local/graphql-connection-info.json` for the auth token and port
- `graphql-client.ts` — factory that wires the connection info into a `graphql-request` client
- `get-site-id.ts` — resolves a human-readable site name to a UUID by reading Local's `sites.json`

**GraphQL schema**: `schema.graphql` describes the Local API surface. `.graphqlconfig` points to `http://127.0.0.1:4000/graphql`.

The CLI requires Local to be running locally; it communicates exclusively via the GraphQL socket Local exposes at runtime.
