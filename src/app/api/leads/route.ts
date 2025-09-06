import { NextResponse } from "next/server";
import { db } from "@/drizzle";
import { leads } from "@/drizzle/schema";
import { ilike, or, desc, count } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "10"), 100);
    const offset = Math.max(parseInt(url.searchParams.get("offset") || "0"), 0);
    const search = (url.searchParams.get("search") || "").trim();

    const whereConditions = search
      ? or(
          ilike(leads.leadName, `%${search}%`),
          ilike(leads.email, `%${search}%`),
          ilike(leads.company, `%${search}%`)
        )
      : undefined;

    const totalCountResult = await db
      .select({ total: count() })
      .from(leads)
      .where(whereConditions);

    const totalCount = totalCountResult[0]?.total ?? 0;

    const leadsResult = await db
      .select()
      .from(leads)
      .where(whereConditions)
      .orderBy(desc(leads.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      leads: leadsResult,
      total: totalCount,
      hasMore: offset + leadsResult.length < totalCount,
    });
  } catch (error) {
    console.error("Leads fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
