import axios from "axios";
import tokenManager from "../../../../../lib/tokenManager";
import { NextResponse } from "next/server";

// Helper function to get location details from our locations endpoint
async function getLocationDetails(locationId) {
  console.log("getLocationDetails called with locationId:", locationId);

  if (!locationId) {
    console.log("No locationId provided, returning Dubai");
    return "Dubai";
  }

  try {
    console.log("Making location API call to our endpoint for ID:", locationId);
    const locationRes = await axios.get(
      `${
        process.env.NEXTAUTH_URL || "http://localhost:3000"
      }/api/pf/locations?id=${locationId}`,
      {
        timeout: 5000,
      }
    );

    console.log("Location endpoint response status:", locationRes.status);
    console.log("Location endpoint response:", locationRes.data);

    if (locationRes.data.success && locationRes.data.data) {
      console.log("Location hierarchy:", locationRes.data.data.hierarchy);
      return locationRes.data.data.hierarchy;
    }

    console.log("No location data found, returning Dubai");
    return "Dubai";
  } catch (error) {
    console.error(
      "Error calling location endpoint:",
      error.response?.data || error.message
    );
    return "Dubai";
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = parseInt(searchParams.get("limit") || "20");

    // Get filter parameters
    const search = searchParams.get('search');
    const priceFrom = searchParams.get('priceFrom');
    const priceTo = searchParams.get('priceTo');
    const locationId = searchParams.get('locationId');
    const bedrooms = searchParams.get('bedrooms');
    const bathrooms = searchParams.get('bathrooms');
    const type = searchParams.get('type');
    const developer = searchParams.get('developer');
    const completionStatus = searchParams.get('completionStatus');
    const orderBy = searchParams.get('orderBy') || 'publishedAt';
    const sort = searchParams.get('sort') || 'desc';

    console.log('Search filters received:', {
      search, priceFrom, priceTo, locationId, bedrooms, bathrooms, type, developer, completionStatus, orderBy, sort
    });

    const token = await tokenManager.getToken();

    if (!token) {
      throw new Error("No valid token available");
    }

    // Build API URL with filters
    const apiUrl = new URL("https://atlas.propertyfinder.com/v1/listings");
    apiUrl.searchParams.set("page", page);
    apiUrl.searchParams.set("limit", limit);

    // Add filters to API call
    // Correct usage of filters as per documentation
    if (search) {
      apiUrl.searchParams.set("filter[title]", search); // Assuming title is valid
    }
    if (priceFrom) {
      apiUrl.searchParams.set("filter[price][from]", priceFrom);
    }
    if (priceTo) {
      apiUrl.searchParams.set("filter[price][to]", priceTo);
    }
    if (locationId) {
      apiUrl.searchParams.set("filter[locationId]", locationId);
    }
    if (bedrooms) {
      apiUrl.searchParams.set("filter[bedrooms]", bedrooms);
    }
    if (bathrooms) {
      apiUrl.searchParams.set("filter[bathrooms]", bathrooms);
    }
    if (type) {
      apiUrl.searchParams.set('filter[type]', type);
    }
    
    if (completionStatus) {
      apiUrl.searchParams.set('filter[completion_status]', completionStatus);
    }

    // Add sorting
    apiUrl.searchParams.set("sort", `${sort === "desc" ? "-" : ""}${orderBy}`);

    console.log("API URL with filters:", apiUrl.toString());

    const res = await axios.get(apiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const json = res.data;

    console.log("PropertyFinder API Response:", {
      total: json.total,
      resultsCount: json.results?.length,
      page: page,
      limit: limit,
    });

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
          image: item.media?.images?.[0]?.original?.url || "https://via.placeholder.com/400x300?text=No+Image",
          status: item.projectStatus || item.status || "Available",
          type: item.type || item.category || "Apartment",
          category: item.category || "residential",
          completionStatus: item.completionStatus || item.projectStatus || item.status || "Ready",
          offeringType: item.offeringType,
          developer: item.developer|| "Not Specified",
          
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: formattedProjects,
      total: json.total || formattedProjects.length,
      pagination: {
        currentPage: parseInt(page),
        perPage: limit,
        totalPages: Math.ceil((json.total || formattedProjects.length) / limit),
      },
    });
  } catch (error) {
    console.error(
      "Error in projects search API route:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { success: false, error: "Failed to fetch filtered projects" },
      { status: 500 }
    );
  }
}




