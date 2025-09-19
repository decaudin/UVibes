import { NextResponse } from 'next/server';
import headers from '@/config/openUvHeaders';
import { UvCheckSchema } from '@/lib/schemas/uvCheckSchema';

export async function GET(req: Request) {

    try {
        const { searchParams } = new URL(req.url);

        const mode = searchParams.get('mode');

        if (mode !== 'coords' && mode !== 'city') { return NextResponse.json({ error: 'Invalid mode' }, { status: 400 })};

        const lat = searchParams.get('latitude');
        const lng = searchParams.get('longitude');
        const alt = searchParams.get('altitude');
        const skinT = searchParams.get('skinType');

        if (!lat || !lng) return NextResponse.json({ error: 'Latitude and longitude are required.' }, { status: 400 });

        const data = {
            mode,
            latitude: Number(lat),
            longitude: Number(lng),
            altitude: mode === 'coords' && alt ? Number(alt) : undefined,
            skinType: typeof skinT === 'string' && /^[1-6]$/.test(skinT) ? Number(skinT) : undefined,
            ...(mode === 'city' && { cityLatitude: Number(lat), cityLongitude: Number(lng) }),
        };

        const parsed = UvCheckSchema.safeParse(data);

        if (!parsed.success) {
            return NextResponse.json({ error: 'Invalid query parameters', details: parsed.error.format() }, { status: 400 });
        }

        const latitude = parsed.data.mode === 'coords' ? parsed.data.latitude : parsed.data.cityLatitude;
        const longitude = parsed.data.mode === 'coords' ? parsed.data.longitude : parsed.data.cityLongitude;
        const altitude = parsed.data.mode === 'coords' ? parsed.data.altitude : undefined;

        let apiUrl = `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}`;
        if (altitude != null) apiUrl += `&altitude=${altitude}`;

        try {
            const response = await fetch(apiUrl, { method: 'GET', headers });
            
            if (!response.ok) {
                return NextResponse.json({ error: 'Failed to fetch UV data' }, { status: response.status });
            }

            const uvData = await response.json();
            return NextResponse.json(uvData, { status: 200 });

        } catch (fetchError) {
            console.error("Error calling OpenUV API:", fetchError);
            return NextResponse.json({ error: "Upstream service unavailable" }, { status: 502 })
        } 
        
    } catch (error) {
        console.error('Error fetching UV data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}