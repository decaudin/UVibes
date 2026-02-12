import type { IUser } from "@/models/User";
import { NextResponse } from "next/server";
import Point from "@/models/Point";

export async function deleteUserAccount(user: IUser) {
    try {
        await Point.deleteMany({ userId: user._id });
    } catch (pointsError) {
        console.error("[DELETE_POINTS_ERROR]", pointsError);
    }

    try {
        await user.deleteOne();
        return NextResponse.json({ code: "ACCOUNT_DELETED" });
    } catch (error) {
        console.error("[DELETE_ACCOUNT_ERROR]", error);
        return NextResponse.json({ code: "ACCOUNT_DELETE_FAILED" }, { status: 500 });
    }
}