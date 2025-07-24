import tokenManager from "../../../../lib/tokenManager";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get("id");

    if (!locationId) {
      return NextResponse.json(
        { success: false, error: "Location ID is required" },
        { status: 400 }
      );
    }

    // Get fresh token
    const token = await tokenManager.getToken();

    if (!token) {
      throw new Error("No valid token available");
    }

    console.log('Fetching location for ID:', locationId);
    console.log('Token (first 20 chars):', token.substring(0, 20) + '...');

    const url = `https://atlas.propertyfinder.com/v1/locations?filter[id]=${locationId}`;
    console.log('Request URL:', url);

    // Use axios with exact Postman configuration
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      timeout: 10000, // 10 second timeout
    });

    console.log('Location API response status:', response.status);
    console.log(response.data, "--------");

    const locationData = response.data;

    if (locationData.data && locationData.data[0] && locationData.data[0].tree) {
      const tree = locationData.data[0].tree;
      const locationHierarchy = tree.map(item => item.name).join(', ');
      
      return NextResponse.json({
        success: true,
        data: {
          id: locationId,
          hierarchy: locationHierarchy,
          tree: tree,
          coordinates: locationData.data[0].coordinates
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: locationId,
        hierarchy: "Dubai",
        tree: [],
        coordinates: null
      }
    });

  } catch (error) {
    console.error("Error in locations API route:", error);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error message:', error.message);
    }
    
    return NextResponse.json(
      { success: false, error: "Failed to fetch location details" },
      { status: 500 }
    );
  }
}


