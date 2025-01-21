import { NextApiRequest, NextApiResponse } from 'next';
import headers from '@/utils/headers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const { latitude, longitude, altitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }

    const apiUrl = `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}&alt=${altitude || ''}`;

    try {
        const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        });

        if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch UV data' });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
    }
}
