import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserIdFromRequest } from "@/lib/auth";
import { PointSchema } from "@/lib/schemas/pointSchema";
import Point, { IPoint } from "@/models/Point";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase()

        const result = getUserIdFromRequest(req);

        if (result.error) return result.error;

        const pointsGPS = await Point.find({ userId: result.userId }).lean<{ _id: string }[]>();

        const formattedPoints = pointsGPS.map(p => ({ ...p, id: p._id.toString() }));

        return NextResponse.json(formattedPoints);
    } catch (error: unknown) {
        console.error("[GET_POINTS_ERROR]", error);
        return NextResponse.json({ code: "INTERNAL_SERVER_ERROR"}, { status: 500 })
    }
};

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const result = getUserIdFromRequest(req);
        
        if (result.error) return result.error;

        const userId = result.userId;

        const body = await req.json();

        const parseResult = PointSchema.safeParse(body);
        
        if (!parseResult.success) return NextResponse.json({ code: "INVALID_POINT" }, { status: 400 });

        const pointData = parseResult.data;

        const newPoint: IPoint = await Point.create({ userId, ...pointData });

        return NextResponse.json(newPoint, { status: 201 });
    } catch (err: unknown) {
        console.error("[POST_POINT_ERROR]", err);
        return NextResponse.json(
            { code : err instanceof Error ? err.message : "UNKNOWN_ERROR" },
            { status: 500 }
        )
    }
}