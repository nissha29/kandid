import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle";
import { campaigns } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const campaignId = Number(params.id);

        if (isNaN(campaignId)) {
            return NextResponse.json({ error: "Invalid campaign ID" }, { status: 400 });
        }

        const campaign = await db
            .select()
            .from(campaigns)
            .where(eq(campaigns.id, campaignId))
            .limit(1);

        if (!campaign || campaign.length === 0) {
            return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
        }

        return NextResponse.json({ campaign: campaign[0] });
    } catch (error) {
        console.error("Error fetching campaign details:", error);
        return NextResponse.json(
            { error: "Failed to fetch campaign details" },
            { status: 500 }
        );
    }
}
