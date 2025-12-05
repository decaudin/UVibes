import type { NextRequest } from "next/server";
import { Types } from "mongoose";
import type { IPoint } from "@/models/Point"
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserIdFromRequest } from "@/lib/auth";
import { checkPointDuplicates } from "@/lib/checkPointDuplicates";
import { PointSchema } from "@/schemas/pointSchema";
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

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();

        const authResult = getUserIdFromRequest(req);
        
        if (authResult.error) return authResult.error;

        const userId = authResult.userId;
        
        const { id } = await params;

        if (!id) return NextResponse.json({ code: "MISSING_ID" }, { status: 400 });

        const body = await req.json();

        const parseResult = PointSchema.partial().safeParse(body);

        if (!parseResult.success) return NextResponse.json(
            { code: "INVALID_POINT_DATA", details: parseResult.error.format() }, 
            { status: 400 }
        );

        const data = parseResult.data;

        const pointBeforeUpdate = await Point.findOne({ _id: id, userId });
        if (!pointBeforeUpdate) return NextResponse.json({ code: "POINT_NOT_FOUND" }, { status: 404 });

        const finalData = {
            name: data.name ?? pointBeforeUpdate.name,
            latitude: data.latitude ?? pointBeforeUpdate.latitude,
            longitude: data.longitude ?? pointBeforeUpdate.longitude,
            altitude: data.altitude ?? pointBeforeUpdate.altitude,
        };

        const duplicate = await checkPointDuplicates(userId, finalData, id);

        if (duplicate === "name") return NextResponse.json({ code: "DUPLICATE_NAME" }, { status: 400 });

        if (duplicate === "coords") return NextResponse.json({ code: "DUPLICATE_COORDS" }, { status: 400 });

        const updatedPoint = await Point.findOneAndUpdate(
            { _id: id, userId },
            { $set: data },
            { new: true }
        ).lean<IPoint & { _id: Types.ObjectId } | null>();

        if (!updatedPoint) return NextResponse.json({ code: "POINT_NOT_FOUND" }, { status: 404 });

        const { _id, ...rest } = updatedPoint;

        const responsePoint = { ...rest, id: _id.toString() };

        return NextResponse.json(responsePoint, { status: 200 });
    } catch (error) {
        console.error("PATCH /api/points/:id error:", error);
        return NextResponse.json({ code: "INTERNAL_SERVER_ERROR" }, { status: 500 })
    }
}