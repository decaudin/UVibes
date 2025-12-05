import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserIdFromRequest } from "@/lib/auth";
import { checkPointDuplicates } from "@/lib/checkPointDuplicates";
import { PointSchema } from "@/schemas/pointSchema";
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
        
        if (!parseResult.success) return NextResponse.json({ code: "INVALID_POINT_DATA" }, { status: 400 });

        const pointData = parseResult.data;

        const duplicate = await checkPointDuplicates(userId, pointData);

        if (duplicate === "name") return NextResponse.json({ code: "DUPLICATE_NAME" }, { status: 400 });

        if (duplicate === "coords") return NextResponse.json({ code: "DUPLICATE_COORDS" }, { status: 400 });

        const newPoint: IPoint = await Point.create({ userId, ...pointData });

        const { _id, ...rest } = newPoint.toObject();
        
        const responsePoint = { ...rest, id: _id.toString() };

        return NextResponse.json(responsePoint, { status: 201 });
    } catch (err: unknown) {
        console.error("[POST_POINT_ERROR]", err);
        return NextResponse.json(
            { code : err instanceof Error ? err.message : "UNKNOWN_ERROR" },
            { status: 500 }
        )
    }
}