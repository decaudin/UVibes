import { NextResponse } from 'next/server';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');

    if (!latitude || !longitude) return NextResponse.json({ code: "MISSING_COORDINATES" }, { status: 400 });

    if (isNaN(Number(latitude)) || isNaN(Number(longitude))) return NextResponse.json({ code: "INVALID_COORDINATES" }, { status: 400 });

    const apiKey = process.env.TIMEZONE_API_KEY;

    if (!apiKey) {
        console.error("TIMEZONE_API_KEY is not defined in environment variables");
        return NextResponse.json({ code: "TIMEZONE_KEY_NOT_CONFIGURED" }, { status: 500 });
    }

    const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error("Failed to fetch from TimeZoneDB API:", response.status);
            return NextResponse.json({ code: "TIMEZONE_FETCH_FAILED" }, { status: response.status });
        }

        const data = await response.json();

        if (!data) return NextResponse.json({ code: "TIMEZONE_FETCH_FAILED" }, { status: 500 });

        const timeZone = data.zoneName || null;
        const localTime = data.formatted || null;
        
        return NextResponse.json({ timeZone, localTime });
    } catch (error: unknown) {
        console.error("Error fetching timezone data:", error);
        return NextResponse.json({ code: "TIMEZONE_FETCH_ERROR" }, { status: 500 });
    }
}