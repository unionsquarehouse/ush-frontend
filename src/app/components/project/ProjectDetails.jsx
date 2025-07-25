"use client";

export default function ProjectDetails({ project }) {
  const title = project?.data?.title?.en;
  const location = project?.location;
  const price = project?.data?.price?.amounts?.sale;
  const size = project?.data?.size;
  const bedrooms = project?.data?.bedrooms;
  const bathrooms = project?.data?.bathrooms;
  const completionStatus = project?.data?.projectStatus;
  const summary = project?.data?.description?.en;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {/* Price */}
      {price && (
        <h2 className="text-2xl font-semibold text-green-700 mb-1">
          AED {Number(price).toLocaleString()}
        </h2>
      )}

      {/* Title */}
      {title && (
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h1>
      )}

      {/* Subtitle */}
      {location && <p className="text-gray-500 mb-4">{location}</p>}

      {/* Key Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mb-4">
        {size && (
          <div className="flex items-center gap-1">
            <span className="font-medium">{size} sqft</span>
          </div>
        )}
        {bedrooms && (
          <div className="flex items-center gap-1">
            <span className="font-medium">{bedrooms} Beds</span>
          </div>
        )}
        {bathrooms && (
          <div className="flex items-center gap-1">
            <span className="font-medium">{bathrooms} Baths</span>
          </div>
        )}
        {completionStatus && (
          <div className="ml-auto px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 capitalize">
            {completionStatus.replace(/_/g, " ")}
          </div>
        )}
      </div>

      {/* Description Summary */}
      {summary && (
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-6">
          {summary}
        </p>
      )}
    </div>
  );
}
