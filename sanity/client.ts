import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// No token: this client can only read public, published content.
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: "published",
  useCdn: false,
  timeout: 5000,
  maxRetries: 1,
});
