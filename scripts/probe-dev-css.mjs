/** Smoke-test dev server: homepage + CSS reachable (same-origin + Cursor-like Origin). */
const base = (process.argv[2] ?? "http://127.0.0.1:3000").replace(/\/$/, "");

const htmlRes = await fetch(base + "/");
console.log("GET / →", htmlRes.status);
const html = await htmlRes.text();

function findCssHref(source) {
  const patterns = [
    /href="(\/_next\/static\/css\/[^"]+\.css[^"]*)"/,
    /href='(\/_next\/static\/css\/[^']+\.css[^']*)'/,
    /href="([^"]*\/_next\/static\/css\/[^"]+\.css[^"]*)"/,
  ];
  for (const re of patterns) {
    const x = source.match(re);
    if (x) return x[1];
  }
  return null;
}

const href = findCssHref(html);
if (!href) {
  console.error("No CSS link found. _next occurrences:", (html.match(/_next/g) || []).length);
  const i = html.search(/rel=.stylesheet|<link/i);
  console.error(i === -1 ? html.slice(0, 1200) : html.slice(i, i + 800));
  process.exit(1);
}

const cssUrl = href.startsWith("http") ? href : base + href;
console.log("CSS:", cssUrl);

const h1 = await fetch(cssUrl, { method: "HEAD" });
console.log("HEAD CSS (no Origin) →", h1.status);

const h2 = await fetch(cssUrl, {
  method: "HEAD",
  headers: {
    Origin: "https://preview.cursor.sh",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Mode": "cors",
  },
});
console.log("HEAD CSS (Origin preview.cursor.sh, cross-site) →", h2.status);

process.exit(h1.status === 200 && h2.status === 200 ? 0 : 1);
