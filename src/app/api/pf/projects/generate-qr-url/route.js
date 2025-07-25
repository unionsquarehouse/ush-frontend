import tokenManager from '../../../../../lib/tokenManager';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const listingAdvertisementNumber = searchParams.get('listingAdvertisementNumber');
    const type = searchParams.get('type');

    if (!listingAdvertisementNumber || !type) {
      return NextResponse.json(
        { error: 'Missing listingAdvertisementNumber or type in query parameters' },
        { status: 400 }
      );
    }

    const token = await tokenManager.getToken();

    if (!token) {
      throw new Error('No valid token available');
    }

    const complianceUrl = `https://atlas.propertyfinder.com/v1/compliances/${listingAdvertisementNumber}/633190?permitType=${type}`;

    const response = await axios.get(complianceUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    

    return NextResponse.json({
      success: true,
      data: response.data, // optionally return full API response
    });
  } catch (error) {
    console.error('Error fetching compliance data:', error.response?.data || error.message);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch compliance URL' },
      { status: 500 }
    );
  }
}
