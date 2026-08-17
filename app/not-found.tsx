import { SiteFrame } from "./site-chrome"
import Link from "next/link"

export default function NotFound() {
  return (
    <SiteFrame>
      <main className="not-found">
        <p className="section-kicker">404 / RECORD NOT FOUND</p>
        <h1>That page is not in the institutional record.</h1>
        <p>Continue to the <Link href="/network">network</Link> or <Link href="/registry">registry</Link>.</p>
      </main>
    </SiteFrame>
  )
}
