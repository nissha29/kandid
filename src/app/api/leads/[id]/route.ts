import { NextResponse } from "next/server";
import { db } from "@/drizzle";
import { leads } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request, { params }: { params: { id: number } }) {
  try {
    const param = await (params);
    const leadId = param.id;
    
    if (isNaN(leadId)) {
      return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 });
    }

    const lead = await db
      .select()
      .from(leads)
      .where(eq(leads.id, leadId))
      .limit(1);

    if (lead.length === 0) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ lead: lead[0] });
  } catch (error) {
    console.error("Lead fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch lead details" },
      { status: 500 }
    );
  }
}
