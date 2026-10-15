import test from "node:test"
import assert from "node:assert/strict"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { VERTICALS, publicSites, publicNetworkSites, isPublicSite, type Vertical } from "../site-registry"
import { parentOrganizationJsonLd } from "../org-schema"
import { networkSitemapXml } from "../network-sitemap"
import { NetworkFaces } from "../../components/NetworkFaces"
import NetworkPage from "../../app/network/page"
import VerticalPage from "../../app/network/[vertical]/page"
import { SiteFooter } from "../../app/site-chrome"
import sitemap from "../../app/sitemap"

const pfas = VERTICALS.find((v) => v.key === "forever-chemicals")!
const heavyMetals = VERTICALS.find((v) => v.key === "heavy-metals")!

test("PREP leaves PFAS and microplastics faces and Q11 intake closed", () => {
  for (const v of VERTICALS.filter((v) => v.key !== "heavy-metals")) {
    assert.deepEqual(v.sites.map((s) => [s.status, s.publicLink]), [["reserved", false], ["reserved", false]])
    assert.deepEqual(publicSites(v), [])
  }
  assert.equal(VERTICALS.filter((v) => v.displayName === "TBD").length, 4)
  for (const v of VERTICALS) {
    assert.equal(v.certificationHub.publicLink, false)
    assert.match(v.certificationHub.path, /^\/certify\?program=/)
    assert.deepEqual(v.sites.map((s) => s.role), ["index", "cert"])
  }
})

test("status, publicLink and domain are all required; index activation cannot expose cert", () => {
  const v: Vertical = structuredClone(pfas)
  v.sites[0].publicLink = true
  assert.deepEqual(publicSites(v), [])
  v.sites[0].status = "live"
  assert.deepEqual(publicSites(v).map((s) => s.role), ["index"])
  v.sites[0].publicLink = false
  assert.deepEqual(publicSites(v), [])
  assert.equal(isPublicSite({ ...heavyMetals.sites[0], domain: "" }), false)
})

test("index context never renders or returns a cert destination", () => {
  assert.ok(publicNetworkSites("index").every((s) => s.role === "index"))
  const html = renderToStaticMarkup(createElement(NetworkFaces, { vertical: heavyMetals, from: "index" }))
  assert.ok(html.includes(heavyMetals.sites[0].domain))
  assert.ok(!html.includes(heavyMetals.sites[1].domain))
})

test("network UI, footer, sitemap and organization exclude every reserved domain", () => {
  const surfaces = [renderToStaticMarkup(createElement(NetworkPage)), renderToStaticMarkup(createElement(SiteFooter)), networkSitemapXml(), JSON.stringify(parentOrganizationJsonLd())]
  for (const surface of surfaces) {
    for (const v of VERTICALS) for (const site of v.sites) {
      if (!isPublicSite(site) && site.domain) assert.ok(!surface.includes(site.domain), site.domain)
    }
    assert.ok(!surface.includes("/certify?"))
    for (const site of heavyMetals.sites) assert.ok(surface.includes(site.domain))
  }
  const schema = parentOrganizationJsonLd()
  assert.equal(schema.subOrganization.length, 1)
  assert.equal(schema.subOrganization[0].name, heavyMetals.sites[1].label)
  assert.equal(schema.sameAs.length, 2)
  assert.equal((networkSitemapXml().match(/<sitemap>/g) ?? []).length, 3)
  const urls = sitemap().map((s) => s.url)
  assert.ok(urls.some((url) => url.endsWith("/network/heavy-metals")))
  assert.ok(!urls.some((url) => url.endsWith("/network/microplastics")))
})

test("microplastics informational fallback has no reserved destination; unnamed slots have no route", async () => {
  const page = await VerticalPage({ params: Promise.resolve({ vertical: "microplastics" }) })
  const html = renderToStaticMarkup(page)
  assert.ok(html.includes("In development"))
  assert.ok(!html.includes("microplasticsindex.com"))
  assert.ok(!html.includes("microplasticstested.com"))
  await assert.rejects(() => VerticalPage({ params: Promise.resolve({ vertical: "vertical-3" }) }))
})
