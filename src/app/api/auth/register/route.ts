import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/drizzle";
import { user } from "@/drizzle/schema/index";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fullName = `${firstName} ${lastName}`;

    const signUpResult = await auth.api.signUpEmail({
      body: { name: fullName, email, password },
    });

    if (!signUpResult.user || !signUpResult.user.id) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }

    const newUserId = signUpResult.user.id;

    await db.update(user)
      .set({ firstName, lastName })
      .where(eq(user.id, newUserId));

    return NextResponse.json({
      success: true,
      userId: newUserId,
      token: signUpResult.token,
    },
      { status: 201 }
    );

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Registration error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
