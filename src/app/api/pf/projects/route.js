import tokenManager from '../../../../lib/tokenManager';
import axios from 'axios';
import { NextResponse } from 'next/server';

// Helper function to get location details from our locations endpoint
async function getLocationDetails(locationId) {
  console.log('getLocationDetails called with locationId:', locationId);

  if (!locationId) {
    console.log('No locationId provided, returning Dubai');
    return "Dubai";
  }

  try {
    console.log('Making location API call to our endpoint for ID:', locationId);
    const locationRes = await axios.get(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/pf/locations?id=${locationId}`,
      {
        timeout: 5000,
      }
    );

    console.log('Location endpoint response status:', locationRes.status);
    console.log('Location endpoint response:', locationRes.data);

    if (locationRes.data.success && locationRes.data.data) {
      console.log('Location hierarchy:', locationRes.data.data.hierarchy);
      return locationRes.data.data.hierarchy;
    }

    console.log('No location data found, returning Dubai');
    return "Dubai";
  } catch (error) {
    console.error('Error calling location endpoint:', error.response?.data || error.message);
    return "Dubai";
  }
}


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = parseInt(searchParams.get('limit') || '20');

    const token = await tokenManager.getToken();

    if (!token) {
      throw new Error('No valid token available');
    }

    const res = await axios.get(
      `https://atlas.propertyfinder.com/v1/listings?page=${page}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const json = res.data;

    const formattedProjects = await Promise.all(
      json.results.map(async (item) => {
        const locationDetails = await getLocationDetails(item.location?.id);

        return {
          id: item.id,
          title: item.title.en,
          location: locationDetails,
          locationId: item.location?.id,
          info: item.description?.en?.slice(0, 100) || "",
          price: item.price?.amounts?.sale || 0,
          beds: parseInt(item.bedrooms) || 0,
          baths: parseInt(item.bathrooms) || 0,
          area: item.size,
          color: "#e5d2b1",
          features: item.amenities || [],
          image: item.media?.images?.[0]?.original?.url || 
                 "https://via.placeholder.com/400x300?text=No+Image",
          status: item.projectStatus || item.status || "Available",
          type: item.type || item.category || "Apartment",
          category: item.category || "residential",
          completionStatus: item.completionStatus || item.projectStatus || item.status || "Ready",
          offeringType: item.offeringType,
          developer: item?.developer  || "Not Specified",
        };
      })
    );

    const limitedProjects = formattedProjects.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: limitedProjects,
      total: json.total || formattedProjects.length
    });

  } catch (error) {
    console.error("Error in projects API route:", error.response?.data || error.message);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}





