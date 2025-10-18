import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "@/lib/env";

const JWT_SECRET = getJwtSecret();

export function getUserIdFromRequest(req: NextRequest) {

    const token = req.cookies.get("token")?.value;

    if (!token) return { error: NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 }) };

    try {
        const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
        return { userId: payload.userId };
    } catch {
        return { error: NextResponse.json({ code: "INVALID_TOKEN" }, { status: 401 }) };
    }
}