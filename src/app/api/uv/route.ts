import { NextResponse } from 'next/server';
import headers from '@/config/openUvHeaders';
import { UvCheckSchema } from '@/lib/schemas/uvCheckSchema';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const mode = searchParams.get('mode');

        if (mode !== 'coords' && mode !== 'city') { return NextResponse.json({ code: "INVALID_MODE" }, { status: 400 })};

        const lat = searchParams.get('latitude');
        const lng = searchParams.get('longitude');
        const alt = searchParams.get('altitude');
        const skinT = searchParams.get('skinType');

        if (!lat || !lng) return NextResponse.json({ code: "MISSING_COORDINATES" }, { status: 400 });

        const data = {
            mode,
            latitude: Number(lat),
            longitude: Number(lng),
            altitude: mode === 'coords' && alt ? Number(alt) : undefined,
            skinType: typeof skinT === 'string' && /^[1-6]$/.test(skinT) ? Number(skinT) : undefined,
            ...(mode === 'city' && { cityLatitude: Number(lat), cityLongitude: Number(lng) }),
        };

        const parsed = UvCheckSchema.safeParse(data);

        if (!parsed.success) return NextResponse.json({ code: "INVALID_QUERY_PARAMETERS", details: parsed.error.format() }, { status: 400 });

        const latitude = parsed.data.mode === 'coords' ? parsed.data.latitude : parsed.data.cityLatitude;
        const longitude = parsed.data.mode === 'coords' ? parsed.data.longitude : parsed.data.cityLongitude;
        const altitude = parsed.data.mode === 'coords' ? parsed.data.altitude : undefined;

        let apiUrl = `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}`;
        if (altitude != null) apiUrl += `&altitude=${altitude}`;

        try {
            const response = await fetch(apiUrl, { method: 'GET', headers });

            if (response.status === 403) return NextResponse.json({ code: "UV_QUOTA_EXCEEDED" }, { status: 403 });
            
            if (!response.ok) return NextResponse.json({ code: "UV_FETCH_FAILED" }, { status: response.status });

            const uvData = await response.json();
            return NextResponse.json(uvData, { status: 200 });

        } catch (fetchError) {
            console.error("Error calling OpenUV API:", fetchError);
            return NextResponse.json({ code: "UPSTREAM_SERVICE_UNAVAILABLE" }, { status: 502 })
        } 
        
    } catch (error) {
        console.error("Error fetching UV data:", error);
        return NextResponse.json({ code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}