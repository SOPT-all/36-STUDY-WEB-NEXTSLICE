export async function fetchWithLogging(url, options = {}) {
  const isAbsolute = /^https?:\/\//.test(url);

  const baseUrl = "http://localhost:3000";
  const fullUrl = isAbsolute
    ? url
    : `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;

  console.log(`Fetching: ${fullUrl}`);
  console.log(`Options: ${JSON.stringify(options)}`);

  const start = performance.now();
  const response = await fetch(fullUrl, options);
  const end = performance.now();

  const duration = (end - start).toFixed(2);
  console.log(`Fetch completed in ${duration}ms for ${fullUrl}`);

  const data = await response.json();
  console.log(`Response data:`, data);

  return data;
}
