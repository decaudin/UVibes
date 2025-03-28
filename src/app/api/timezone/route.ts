import { NextResponse } from 'next/server';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');

    if (!latitude || !longitude) {
        return NextResponse.json({ error: 'Latitude et longitude sont nécessaires.' }, { status: 400 });
    }

    try {
        const apiKey = process.env.TIMEZONE_API_KEY;
        const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;

        const response = await fetch(url);
        const data = await response.json();
        if (data) {
            const timeZone = data.zoneName || null;
            const localTime = data.formatted || null;
        
            return NextResponse.json({ timeZone, localTime });
        } else {
            return NextResponse.json({ error: 'Erreur lors de la récupération des données.' }, { status: 500 });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: 'Erreur lors de la récupération des données.' }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Erreur inconnue lors de la récupération des données.' }, { status: 500 });
        }
    }
}