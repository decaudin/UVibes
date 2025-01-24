import { NextResponse } from 'next/server';
import headers from '@/utils/headers';

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    const altitude = searchParams.get('altitude');

    if (!latitude || !longitude) {
        return NextResponse.json({ error: 'Latitude and Longitude are required' }, { status: 400 });
    }

    const apiUrl = `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}&alt=${altitude || ''}`;

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