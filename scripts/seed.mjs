#!/usr/bin/env node
/**
 * Seed helper.
 *
 * The production seed data lives inside migrations/0002_order_platform.sql so it
 * is applied identically in PGLite preview and Postgres deploys. This script
 * intentionally just runs the migrator for DATABASE_URL environments and prints
 * what local preview does automatically.
 */
import { spawnSync } from "node:child_process";

if (!process.env.DATABASE_URL) {
  console.log("[seed] DATABASE_URL is not set. Local PGLite applies migrations and demo records on app startup.");
  process.exit(0);
}

const result = spawnSync(process.execPath, ["scripts/migrate.mjs"], {
  stdio: "inherit",
  env: process.env,
  shell: false,
});
process.exit(result.status ?? 1);
