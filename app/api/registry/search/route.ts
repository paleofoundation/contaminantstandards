import { NextRequest, NextResponse } from "next/server"
import { resolveBrand } from "../../../../lib/brands"

// Firewall-safe brand search endpoint. By construction it can return AT MOST ONE
// brand and NEVER a list or a count (plan S7). A too-generic or ambiguous query
// returns guidance only. The parent-infra post-deploy crawler asserts no endpoint
// on any public surface returns a multi-brand list.

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? ""
  const result = resolveBrand(q)

  switch (result.kind) {
    case "match":
      return NextResponse.json({
        kind: "match",
        brand: {
          slug: result.brand.slug,
          displayName: result.brand.displayName,
          programs: result.brand.programs,
          markStatus: result.brand.markStatus,
          url: `/registry/${result.brand.slug}`,
        },
      })
    case "too_generic":
      return NextResponse.json({
        kind: "guidance",
        message: "Enter the brand's specific name to confirm its certification.",
      })
    case "ambiguous":
      return NextResponse.json({
        kind: "guidance",
        message: "More than one brand matches. Enter the full brand name to confirm.",
      })
    case "none":
      return NextResponse.json({ kind: "none", message: "No certified brand matches that name." })
  }
}
