"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Phone, MessageCircle, Mail, MapPin, Award, Shield, Star, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export default function AgentPage() {
  const params = useParams();
  const router = useRouter();
  const agentId = params?.id;
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!agentId) return;

    const fetchAgent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/pf/agents/${agentId}`);
        const json = await res.json();
        
        if (json.success) {
          setAgent(json.data);
        } else {
          console.error("Failed to fetch agent:", json.error);
        }
      } catch (err) {
        console.error("Error fetching agent:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [agentId]);

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, "_self");
  };

  const handleWhatsApp = (whatsapp) => {
    window.open(`https://wa.me/${whatsapp.replace("+", "")}`, "_blank");
  };

  const handleEmail = (email) => {
    window.open(`mailto:${email}`, "_self");
  };

  if (loading) {
    return (
      <section className="py-32 bg-gradient-to-b from-white via-earth-50 to-white min-h-screen">
        <div className="container mx-auto px-6 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand mx-auto mb-4"></div>
            <p className="text-earth-600 text-xl">Loading agent profile...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!agent) {
    return (
      <section className="py-32 bg-gradient-to-b from-white via-earth-50 to-white min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-earth-800 mb-4">Agent Not Found</h1>
          <Button onClick={() => router.push('/agents')} className="bg-brand hover:bg-brand-hover">
            Back to Agents
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-gradient-to-b from-white via-earth-50 to-white min-h-screen">
      <div className="w-[80vw] mx-auto px-6">
        {/* Back Button */}
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mb-8 border-earth-300 hover:bg-earth-50"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Agents
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Agent Photo & Basic Info */}
          <div className="lg:col-span-1">
            <Card className="bg-white border border-earth-200  overflow-hidden shadow-xl">
              <CardContent className="p-0">
                {/* Agent Photo */}
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {agent.verification === 'verified' && (
                      <div className="bg-green-600 text-white px-3 py-1  text-sm font-semibold flex items-center gap-2">
                        <Shield size={16} />
                        Verified
                      </div>
                    )}
                    {agent.isSuperAgent && (
                      <div className="bg-brand text-white px-3 py-1  text-sm font-semibold flex items-center gap-2">
                        <Award size={16} />
                        Elite Agent
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Section */}
                <div className="p-6 space-y-4">
                  <div className="text-center border-b border-earth-100 pb-4">
                    <h1 className="text-2xl font-bold text-earth-800 mb-2">{agent.name}</h1>
                    <p className="text-brand font-semibold text-lg">{agent.position}</p>
                    {agent.role && (
                      <p className="text-earth-600 text-sm mt-1">{agent.role}</p>
                    )}
                  </div>

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleCall(agent.phone)}
                      className="w-full bg-brand hover:bg-brand-hover text-white py-3"
                    >
                      <Phone size={16} className="mr-2" />
                      Call {agent.phone}
                    </Button>
                    <Button
                      onClick={() => handleWhatsApp(agent.whatsapp)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                    >
                      <MessageCircle size={16} className="mr-2" />
                      WhatsApp
                    </Button>
                    <Button
                      onClick={() => handleEmail(agent.email)}
                      variant="outline"
                      className="w-full border-brand text-brand hover:bg-brand hover:text-white py-3"
                    >
                      <Mail size={16} className="mr-2" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Agent Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Professional Summary */}
            <Card className="bg-white border border-earth-200  shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-earth-800 mb-6 flex items-center gap-3">
                  <Award className="text-brand" size={24} />
                  Professional Summary
                </h2>
                
                {agent.bio ? (
                  <p className="text-earth-600 leading-relaxed text-lg">{agent.bio}</p>
                ) : (
                  <p className="text-earth-500 italic">No bio available for this agent.</p>
                )}
              </CardContent>
            </Card>

            {/* Professional Stats */}
            <Card className="bg-white border border-earth-200  shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-earth-800 mb-6 flex items-center gap-3">
                  <Star className="text-brand" size={24} />
                  Professional Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-earth-50  p-6 text-center">
                    <div className="text-3xl font-bold text-earth-800 mb-2">
                      {agent.verification === 'verified' ? 'Verified' : 'Pending'}
                    </div>
                    <div className="text-earth-600 text-sm uppercase tracking-wide">Verification Status</div>
                  </div>
                  
                  <div className="bg-brand/5  p-6 text-center">
                    <div className="text-3xl font-bold text-earth-800 mb-2">
                      {agent.compliances?.length || 0}
                    </div>
                    <div className="text-earth-600 text-sm uppercase tracking-wide">Active Licenses</div>
                  </div>
                  
                  <div className="bg-green-50  p-6 text-center">
                    <div className="text-3xl font-bold text-earth-800 mb-2">
                      {agent.isSuperAgent ? 'Elite' : 'Standard'}
                    </div>
                    <div className="text-earth-600 text-sm uppercase tracking-wide">Agent Level</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Licenses & Compliance */}
            {agent.compliances && agent.compliances.length > 0 && (
              <Card className="bg-white border border-earth-200  shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-earth-800 mb-6 flex items-center gap-3">
                    <Shield className="text-brand" size={24} />
                    Licenses & Certifications
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {agent.compliances.map((compliance, index) => (
                      <div key={index} className="bg-earth-50  p-4 border border-earth-200">
                        <div className="font-semibold text-earth-800">{compliance.name || `License ${index + 1}`}</div>
                        <div className="text-earth-600 text-sm">{compliance.type || 'Professional License'}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Information */}
            <Card className="bg-white border border-earth-200  shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-earth-800 mb-6 flex items-center gap-3">
                  <MapPin className="text-brand" size={24} />
                  Contact Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="text-brand" size={20} />
                    <span className="text-earth-700 font-medium">Phone:</span>
                    <span className="text-earth-600">{agent.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MessageCircle className="text-green-600" size={20} />
                    <span className="text-earth-700 font-medium">WhatsApp:</span>
                    <span className="text-earth-600">{agent.whatsapp}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="text-blue-600" size={20} />
                    <span className="text-earth-700 font-medium">Email:</span>
                    <span className="text-earth-600">{agent.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}