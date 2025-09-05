import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
        }

        const signInResult = await auth.api.signInEmail({
            body: { email, password },
        })

        const { token, user } = signInResult;

        return NextResponse.json(
            {
                success: true,
                token,
                user,
            },
            { status: 200 }
        );
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Login error:", err.message);
            return NextResponse.json({ error: err.message }, { status: 401 });
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
