import { City } from "@/types/city";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    if (!query || query.length < 3) return NextResponse.json({ cities: [] }, { status: 400 });

    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

    if (!RAPIDAPI_KEY) {
        console.error("RAPIDAPI_KEY is not defined in environment variables");
        return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    try {
        const response = await fetch(
            `https://wft-geo-db.p.rapidapi.com/v1/geo/places?namePrefix=${encodeURIComponent(query)}&limit=10`,
            {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": RAPIDAPI_KEY,
                    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
                },
            }
        );
        
        if (!response.ok) throw new Error(`GeoDB error: ${response.status}`);

        const data = await response.json();

        const cities = data.data.map((city: City) => ({
            id: city.id,
            name: city.name,
            country: city.country,
            latitude: city.latitude,
            longitude: city.longitude,
        }));

        return NextResponse.json({ cities }, { status: 200 });

    } catch (err) {
        console.error("Erreur API GeoDB:", err);
        return NextResponse.json({ error: "Erreur API GeoDB" }, { status: 500 });
    }
}