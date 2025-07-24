import tokenManager from '../../../../lib/tokenManager';
import { NextResponse } from 'next/server';

// Helper function to get location details
async function getLocationDetails(locationId, token) {
  console.log('getLocationDetails called with locationId:', locationId);
  
  if (!locationId) {
    console.log('No locationId provided, returning Dubai');
    return "Dubai";
  }
  
  try {
    console.log('Making location API call for ID:', locationId);
    const locationRes = await fetch(
      `https://atlas.propertyfinder.com/v1/locations?filter[id]=${locationId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Location API response status:', locationRes.status);
    
    if (!locationRes.ok) {
      console.log('Location API response not ok, returning Dubai');
      return "Dubai";
    }
    
    const locationData = await locationRes.json();
    console.log(locationData,"--------");
    
    if (locationData.data && locationData.data[0] && locationData.data[0].tree) {
      const tree = locationData.data[0].tree;
      // Extract names from tree hierarchy and join with commas
      const locationHierarchy = tree.map(item => item.name).join(', ');
      console.log('Location hierarchy:', locationHierarchy);
      return locationHierarchy;
    }
    
    console.log('No tree data found, returning Dubai');
    return "Dubai";
  } catch (error) {
    console.error('Error fetching location details:', error);
    return "Dubai";
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = parseInt(searchParams.get('limit') || '20');

    // Get fresh token
    const token = await tokenManager.getToken();

    if (!token) {
      throw new Error('No valid token available');
    }

    const res = await fetch(
      `https://atlas.propertyfinder.com/v1/listings?page=${page}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', res.status, errorText);
      throw new Error(`Failed to fetch from external API: ${res.status}`);
    }

    const json = await res.json();
    
    // Process each item and get location details
    const formattedProjects = await Promise.all(
      json.results.map(async (item) => {
        const locationDetails = await getLocationDetails(item.location?.id, token);
        
        return {
          id: item.id,
          title: item.title.en,
          location: locationDetails,
          info: item.description?.en?.slice(0, 100) || "",
          price: item.price?.amounts?.sale || 0,
          beds: item.bedrooms,
          baths: item.bathrooms,
          area: item.size,
          color: "#e5d2b1",
          features: item.amenities || [],
          image: item.media?.images?.[0]?.original?.url || 
                 "https://via.placeholder.com/400x300?text=No+Image",
          status: item.projectStatus || "Available",
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
    console.error("Error in projects API route:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}





