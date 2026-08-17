import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html", host: "localhost" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Institute homepage and metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Institute of Contaminant Standards<\/title>/i);
  assert.match(html, /Standards should be/);
  assert.match(html, /traceable\./);
  assert.match(html, /Heavy Metal Index corpus snapshot/);
  assert.match(html, /Founded and led by Karen Pendergrass/);
  assert.match(html, /Three faces\. Three data classes\. One-way citation\./);
  assert.match(html, /The institution is primary\. Its decision-makers are named\./);
  assert.match(html, /Executive leadership/);
  assert.match(html, /Jonathan D\. Pendergrass/);
  assert.match(html, /Public occurrence evidence describes markets and research gaps/);
  assert.match(html, /A trade name of Paleo Certified, Inc\./);
  assert.match(html, /http:\/\/localhost\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|loading skeleton|react-loading-skeleton/i);
});

test("removes starter assets and keeps the social card wired", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  await assert.doesNotReject(access(new URL("../public/og.png", import.meta.url)));
  await assert.doesNotReject(access(new URL("../public/karen-pendergrass.avif", import.meta.url)));
  await assert.rejects(access(new URL("../public/karen-pendergrass.jpg", import.meta.url)));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));

  assert.match(page, /Institute of Contaminant Standards/);
  assert.match(page, /PUBLIC LITERATURE/);
  assert.match(layout, /new URL\("\/og\.png", baseUrl\)/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /SkeletonPreview/);
  assert.doesNotMatch(packageJson, /site-creator-vinext-starter/);

  await assert.doesNotReject(access(new URL("dist/server/index.js", templateRoot)));
});

test("renders the network, governance, about, and articles as real routes", async () => {
  const [network, governance, about, articles] = await Promise.all([
    render("/network"),
    render("/governance"),
    render("/about"),
    render("/articles"),
  ]);

  assert.equal(network.status, 200);
  assert.equal(governance.status, 200);
  assert.equal(about.status, 200);
  assert.equal(articles.status, 200);

  const [networkHtml, governanceHtml, aboutHtml, articlesHtml] = await Promise.all([
    network.text(),
    governance.text(),
    about.text(),
    articles.text(),
  ]);

  assert.match(networkHtml, /Heavy metals/);
  assert.match(networkHtml, /Microplastics/);
  assert.match(networkHtml, /Forever chemicals \(PFAS\)/);
  assert.match(networkHtml, /applications belong on the Heavy Metal/);
  assert.doesNotMatch(networkHtml, /href="https:\/\/verify\.contaminantstandards\.com|href="https:\/\/apply\.contaminantstandards\.com/);

  assert.match(governanceHtml, /strictest applicable maximum/);
  assert.match(governanceHtml, /eligible certified-lot data, never the public occurrence pool/);
  assert.match(governanceHtml, /ISO\/IEC 17065 accreditation/);
  assert.doesNotMatch(governanceHtml, /occurrence distribution.*capped by/i);

  assert.match(aboutHtml, /An institution is/);
  assert.match(aboutHtml, /Karen Pendergrass/);
  assert.match(aboutHtml, /Kimberly Eyer/);
  assert.match(aboutHtml, /Jonathan D\. Pendergrass/);
  assert.match(aboutHtml, /Chief Licensing Operator/);
  assert.match(aboutHtml, /Jennifer Eyer/);
  assert.match(aboutHtml, /Chief of Auditing/);
  assert.match(aboutHtml, /0000-0001-6194-6148/);
  assert.match(aboutHtml, /0009-0003-5199-0737/);
  assert.match(aboutHtml, /Being constituted/);
  assert.match(aboutHtml, /Engagement-based/);
  assert.doesNotMatch(aboutHtml, /href="#"/);

  assert.match(articlesHtml, /Why a certification standard needs an independent index/);
  assert.match(articlesHtml, /In preparation/);
  assert.match(articlesHtml, /NO THRESHOLD TABLES/);
});
