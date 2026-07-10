import { api } from "./client";
import type { CreditBalance, DashboardStats } from "./types";

export function getCreditBalance() {
  return api<CreditBalance>("/api/credits");
}

export function getDashboardStats() {
  return api<DashboardStats>("/api/dashboard/stats");
}
