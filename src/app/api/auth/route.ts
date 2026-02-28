import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { action, email, password, name } = body;

  if (action === "login") {
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: "user-001",
          email: email || "investor@example.com",
          name: "John Smith",
          plan: "pro",
          referralCode: "JOHN-SMITH-2026",
        },
        token: "demo_token_" + Date.now(),
      },
    });
  }

  if (action === "signup") {
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: "user-" + Date.now(),
          email,
          name: name || "New User",
          plan: "free",
          referralCode: "REF-" + Date.now(),
        },
        token: "demo_token_" + Date.now(),
      },
    }, { status: 201 });
  }

  return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
}
