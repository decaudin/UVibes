import { NextResponse } from 'next/server';
import headers from '@/config/openUvHeaders';
import { UvCheckSchema } from '@/lib/schemas/uvCheckSchema';

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);

    const lat = searchParams.get('latitude');
    const long = searchParams.get('longitude');
    const alt = searchParams.get('altitude');
    const skinT = searchParams.get('skinType');

    if (lat == null || long == null) {
        return NextResponse.json({ error: 'Latitude and longitude are required.' }, { status: 400 });
    }

    const data = {
        latitude: Number(lat),
        longitude: Number(long),
        altitude: alt ? Number(alt) : null,
        skinType: typeof skinT === 'string' && /^[1-6]$/.test(skinT) ? Number(skinT) : undefined,
    };

    const parsed = UvCheckSchema.safeParse(data);

    if (!parsed.success) {
        return NextResponse.json(
            { error: 'Invalid query parameters', details: parsed.error.format() },
            { status: 400 }
        );
    }

    const { latitude, longitude, altitude } = parsed.data;

    let apiUrl = `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}`;
    if (altitude != null) apiUrl += `&altitude=${altitude}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch UV data' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('Error fetching UV data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}