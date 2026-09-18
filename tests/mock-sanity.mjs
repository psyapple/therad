// Test-only network boundary. Production code never imports this module.
const realFetch = globalThis.fetch;
let result = { articles: [], categories: [], migratedSlugs: [] };
let unavailable = false;
export const sanityRequests = [];
export function setSanityFixture(value, failed = false) {
  result = value;
  unavailable = failed;
}
globalThis.fetch = async (input, init) => {
  const url = new URL(
    typeof input === "string" || input instanceof URL ? input : input.url,
  );
  if (
    url.hostname.endsWith(".api.sanity.io") &&
    url.pathname.includes("/data/query/")
  ) {
    sanityRequests.push({ url: url.toString(), headers: init?.headers });
    if (unavailable)
      return new Response(
        JSON.stringify({ error: { description: "test outage" } }),
        { status: 503, headers: { "content-type": "application/json" } },
      );
    return Response.json({
      result,
      ms: 1,
      query: url.searchParams.get("query"),
    });
  }
  return realFetch(input, init);
};
