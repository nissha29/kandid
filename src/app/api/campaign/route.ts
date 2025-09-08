import { NextResponse } from "next/server";
import { campaigns } from "@/drizzle/schema";
import { db } from '@/drizzle';
import { count, ilike } from "drizzle-orm";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const limit = parseInt(searchParams.get("limit") || "10");
        const offset = parseInt(searchParams.get("offset") || "0");
        const nameFilter = searchParams.get("name") || "";

        const total = await db
            .select({ count: count() })
            .from(campaigns)
            .where(nameFilter ? ilike(campaigns.campaignName, `%${nameFilter}%`) : undefined)
            .then(res => res[0]?.count || 0);

        const query = db
            .select()
            .from(campaigns)
            .where(nameFilter ? ilike(campaigns.campaignName, `%${nameFilter}%`) : undefined)
            .limit(limit)
            .offset(offset);

        const allCampaigns = await query;

        return NextResponse.json({
            campaigns: allCampaigns,
            total: total,
            hasMore: offset + allCampaigns.length < total,
        });
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return NextResponse.json(
            { error: "Failed to fetch campaigns" },
            { status: 500 }
        );
    }
}
