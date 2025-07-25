"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectGallery from "../../components/project/ProjectGallery";
import ProjectDetails from "../../components/project/ProjectDetails";
import ProjectAgentActions from "../../components/project/ProjectAgentActions";
import ProjectDescription from "../../components/project/ProjectDescription";
import ProjectFeatures from "../../components/project/ProjectFeatures";
import ProjectMap from "../../components/project/ProjectMap";
import ProjectCalculators from "../../components/project/ProjectCalculators";
import ProjectPermit from "../../components/project/ProjectPermit";
import ProjectSuggestions from "../../components/project/ProjectSuggestions";

export default function ProjectPage() {
  const params = useParams();
  const id = params?.id;
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/pf/projects/${id}`);
        const json = await res.json();
        if (json.success) {
          setProject(json.data);
        } else {
          console.error("API Error:", json.error);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchProject();
  }, [id]);

  console.log(project);

  if (!project) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="bg-[#f8f8f8] text-black">
      <ProjectGallery images={project.data.media.images} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <ProjectDetails project={project} />
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2 space-y-6">
            <ProjectDescription description={project.data.description?.en} />
            <ProjectFeatures
              features={[
                `Furnishing: ${project.data.furnishingType}`,
                `${project.data.bedrooms} Bedrooms`,
                `${project.data.bathrooms} Bathrooms`,
                `BUA: ${project.data.size} sqft`,
                `Type: ${project.data.type}`,
                `Location: ${project.location}`,
                `Reference: ${project.data.reference}`,
              ]}
              amenities={project.data.amenities}
            />

            <ProjectMap location={project.location} />
            <ProjectCalculators pricing={project.data.price}/>
            <ProjectPermit compliance={project.data.compliance} />
          </div>
          <div className="space-y-6">
            <ProjectAgentActions agent={project.data.assignedTo} />
          </div>
        </div>
        <ProjectSuggestions suggestions={project.suggestions} />
      </div>
    </div>
  );
}
