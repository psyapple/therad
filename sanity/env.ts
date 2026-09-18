// Public identifiers only. Studio and server reads share this single configuration.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "1uy5d575";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";
