import { NextResponse } from "next/server";
import { db } from "@/drizzle";
import { user, session } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
    console.log('User route called');
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
        return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return NextResponse.json({ error: "Invalid token format" }, { status: 401 });
    }

    try {
        const userSession = await db
            .select()
            .from(session)
            .where(eq(session.token, token))
            .limit(1);

        if (!userSession.length) {
            return NextResponse.json({ error: "Invalid session" }, { status: 401 });
        }

        const userData = await db
            .select()
            .from(user)
            .where(eq(user.id, userSession[0].userId))
            .limit(1);

        if (!userData.length) {
            return NextResponse.json({ error: "User not found" }, { status: 401 });
        }

        return NextResponse.json({ user: userData[0] });
    } catch (err) {
        console.error("Session verification error:", err);
        return NextResponse.json({ error: "Failed to verify token" }, { status: 401 });
    }
}
