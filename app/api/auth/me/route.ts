import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    const user = { id: "1", name: "John Doe", email: "john@example.com" };
    return NextResponse.json({ user });
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
