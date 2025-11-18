import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserIdFromRequest } from "@/lib/auth";
import Point from "@/models/Point";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();

        const result = getUserIdFromRequest(req);

        if (result.error) return result.error;

        const { id } = await params;

        if (!id) return NextResponse.json({ code: "MISSING_ID" }, { status: 400 });

        const deleted = await Point.findOneAndDelete({ _id: id, userId: result.userId });
        
        if (!deleted) return NextResponse.json({ code: "POINT_NOT_FOUND" }, { status: 404 });

        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        console.error("[DELETE_POINT_ERROR]", err);
        return NextResponse.json(
            { code: err instanceof Error ? err.message : "UNKNOWN_ERROR" },
            { status: 500 }
        )
    }
}