/**
 * API Services Index
 * Central export point for all API service modules
 */

// Base client
export { xanoRequest, xanoGet, xanoPost, xanoPatch, xanoDelete } from "./xano-client";

// Service modules
export * from "./business-forecasting-service";
export * from "./company-profile-service";
export * from "./tax-compliance-service";
export * from "./pricing-strategy-service";
export * from "./revenue-strategy-service";
export * from "./auth-service";

// Additional services to be created:
// export * from "./market-analysis-service";
// export * from "./financial-advisory-service";
// export * from "./business-feasibility-service";
// export * from "./inventory-supply-chain-service";
// export * from "./funding-loan-hub-service";
// export * from "./growth-planning-dashboard-service";
// export * from "./policy-economic-impact-service";
// export * from "./market-analysis-service";
// export * from "./risk-management-service";
