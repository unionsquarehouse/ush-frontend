import { NextResponse } from 'next/server';
import axios from 'axios';
import tokenManager from '../../../../../lib/tokenManager';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const publicProfileId = searchParams.get('publicProfileId');

    if (!publicProfileId) {
      return NextResponse.json(
        { success: false, error: 'Missing publicProfileId' },
        { status: 400 }
      );
    }

    const token = await tokenManager.getToken();
    if (!token) throw new Error('No valid token');

    const apiUrl = `https://atlas.propertyfinder.com/v1/users?publicProfileId=${publicProfileId}`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(apiUrl,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    

    return NextResponse.json({
      success: true,
      data: response.data,
    });

  } catch (error) {
    console.error('User profile fetch error:', error.response?.data || error.message);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}
