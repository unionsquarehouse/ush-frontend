import { useState, useEffect, useRef } from "react";
import {
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const agents = [
  {
    id: 2,
    name: "Ahmed Al-Mansouri",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    phone: "+971507654321",
    whatsapp: "+971507654321",
    specialty: "Commercial Real Estate",
    experience: "12 Years",
    sales: "400+ Properties",
    rating: 4.8,
    color: "from-blue-400 to-purple-500",
  },
  {
    id: 3,
    name: "Fatima Al-Rashid",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    phone: "+971509876543",
    whatsapp: "+971509876543",
    specialty: "Residential Villas",
    experience: "6 Years",
    sales: "180+ Properties",
    rating: 4.9,
    color: "from-green-400 to-teal-500",
  },
  {
    id: 4,
    name: "Omar Al-Khalili",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    phone: "+971502468135",
    whatsapp: "+971502468135",
    specialty: "Investment Properties",
    experience: "10 Years",
    sales: "320+ Properties",
    rating: 4.7,
    color: "from-red-400 to-pink-500",
  },
  {
    id: 5,
    name: "Layla Al-Hashemi",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    phone: "+971503691470",
    whatsapp: "+971503691470",
    specialty: "Waterfront Properties",
    experience: "7 Years",
    sales: "200+ Properties",
    rating: 4.8,
    color: "from-cyan-400 to-blue-500",
  },
];

const AgentsSection = () => {
  const [activeAgent, setActiveAgent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % agents.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextAgent = () => {
    setActiveAgent((prev) => (prev + 1) % agents.length);
  };

  const prevAgent = () => {
    setActiveAgent((prev) => (prev - 1 + agents.length) % agents.length);
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, "_self");
  };

  const handleWhatsApp = (whatsapp) => {
    window.open(`https://wa.me/${whatsapp.replace("+", "")}`, "_blank");
  };

  const getCardPosition = (index) => {
    const diff = (index - activeAgent + agents.length) % agents.length;
    if (diff === 0) return "center";
    if (diff === 1 || diff === agents.length - 1) return "side";
    return "hidden";
  };

  return (
    <section className=" flex flex-col justify-center items-center bg-black   relative  h-[120vh]">
      {/* Animated background elements */}

      <div className="container mx-auto px-4 relative z-10 ">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-brand-hover"></div>
            <Award className="text-brand-hover" size={40} />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Elite Real Estate
            <span className="block text-primary">Agents</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet our exceptional team of certified real estate professionals
            dedicated to making your property dreams a reality
          </p>
        </div>

        {/* Agents Showcase */}
        <div
          className="relative flex items-center justify-center"
          ref={containerRef}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Agent Cards */}
          <div className="relative h-[50vh] w-full max-w-6xl">
            {agents.map((agent, index) => {
              const position = getCardPosition(index);
              const isActive = index === activeAgent;

              return (
                <div
                  key={agent.id}
                  className={`absolute transition-all duration-700 ease-in-out ${
                    position === "hidden"
                      ? "opacity-0 scale-50 pointer-events-none"
                      : position === "center"
                      ? "opacity-100 scale-100 z-20"
                      : "opacity-60 scale-75 z-10"
                  }`}
                  style={{
                    left:
                      position === "center"
                        ? "50%"
                        : position === "side" &&
                          (index - activeAgent + agents.length) %
                            agents.length ===
                            1
                        ? "75%"
                        : "25%",
                    transform:
                      position === "center"
                        ? "translateX(-50%) translateZ(0)"
                        : position === "side" &&
                          (index - activeAgent + agents.length) %
                            agents.length ===
                            1
                        ? "translateX(-25%) translateZ(-50px)"
                        : "translateX(-75%) translateZ(-50px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Card
                    className={`w-80 relative rounded-tl-[2rem] rounded-br-[2rem] overflow-hidden group cursor-pointer transition-all duration-500 border-0 ${
                      isActive
                        ? "backdrop-blur-xl bg-white/25 hover:bg-white/30"
                        : "backdrop-blur-md bg-white/10 hover:bg-white/15"
                    }`}
                    style={{
                      backdropFilter: "blur(16px)",
                      background: isActive
                        ? "rgba(255, 255, 255, 0.25)"
                        : "rgba(255, 255, 255, 0.1)",
                      boxShadow: isActive
                        ? `
                          0 8px 32px 0 rgba(31, 38, 135, 0.37),
                          0 20px 60px -12px rgba(0, 0, 0, 0.25),
                          0 35px 100px -20px rgba(0, 0, 0, 0.15),
                          inset 0 1px 0 rgba(255, 255, 255, 0.3)
                        `
                        : `
                          0 4px 16px 0 rgba(31, 38, 135, 0.2),
                          0 8px 32px -8px rgba(0, 0, 0, 0.15),
                          0 16px 48px -16px rgba(0, 0, 0, 0.1),
                          inset 0 1px 0 rgba(255, 255, 255, 0.2)
                        `,
                      transform: isActive
                        ? "translateY(-8px) rotateX(2deg)"
                        : "translateY(0) rotateX(0deg)",
                    }}
                  >
                    {/* Multiple glassmorphism layers for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-transparent to-white/10 pointer-events-none"></div>

                    {/* Inner glass effect with depth */}
                    <div className="absolute inset-[1px] rounded-tl-[2rem] rounded-br-[2rem] bg-gradient-to-br from-white/20 to-white/5 pointer-events-none"></div>

                    {/* Depth shadow behind card */}
                    <div className="absolute -inset-2 bg-black/10 rounded-tl-[2rem] rounded-br-[2rem] blur-xl -z-10 opacity-60"></div>

                    {/* Floating effect shadow */}
                    <div
                      className={`absolute -bottom-6 left-4 right-4 h-6 bg-black/20 rounded-full blur-lg -z-20 transition-all duration-500 ${
                        isActive
                          ? "opacity-40 scale-110"
                          : "opacity-20 scale-100"
                      }`}
                    ></div>
                    <CardContent className="p-0 h-full relative">
                      {/* Background gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                      ></div>

                      {/* Agent Photo */}
                      <div className="relative h-[25vh] overflow-hidden">
                        <img
                          src={agent.photo}
                          alt={agent.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>

                        {/* Rating Badge */}
                        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                          <Star
                            size={14}
                            className="text-yellow-500 fill-yellow-500"
                          />
                          <span className="text-sm font-semibold">
                            {agent.rating}
                          </span>
                        </div>
                      </div>

                      {/* Agent Info */}
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            {agent.name}
                          </h3>
                          <p className="text-primary font-medium">
                            {agent.specialty}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-accent/50 rounded-lg p-2 text-center">
                            <div className="font-semibold text-foreground">
                              {agent.experience}
                            </div>
                            <div className="text-muted-foreground">
                              Experience
                            </div>
                          </div>
                          <div className="bg-accent/50 rounded-lg p-2 text-center">
                            <div className="font-semibold text-foreground">
                              {agent.sales}
                            </div>
                            <div className="text-muted-foreground">Sold</div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleCall(agent.phone)}
                            size="sm"
                            variant="outline"
                            className="flex-1 group/btn hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                          >
                            <Phone
                              size={16}
                              className="mr-2 group-hover/btn:animate-bounce"
                            />
                            Call
                          </Button>
                          <Button
                            onClick={() => handleWhatsApp(agent.whatsapp)}
                            size="sm"
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white group/btn transition-colors duration-300"
                          >
                            <MessageCircle
                              size={16}
                              className="mr-2 group-hover/btn:animate-bounce"
                            />
                            WhatsApp
                          </Button>
                        </div>
                      </div>

                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="absolute top-1/2 left-4 z-30 hidden lg:block">
            <button
              onClick={prevAgent}
              className="w-12 h-12  rounded-tl-xl rounded-br-xl flex items-center justify-center border border-white text-white hover:bg-white hover:text-black transition-colors"
              aria-label="Previous amenity"
            >
              <ChevronLeft className="text-xl" />
            </button>
          </div>

          <div className="absolute top-1/2 right-4 z-30 hidden lg:block">
            <button
              onClick={nextAgent}
              className="w-12 h-12 rounded-tl-xl rounded-br-xl flex items-center justify-center border border-white text-white hover:bg-white hover:text-black transition-colors"
              aria-label="Next amenity"
            >
              <ChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-3">
          {agents.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveAgent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeAgent
                  ? "bg-white scale-125 shadow-lg shadow-primary/50"
                  : "bg-white hover:bg-white/50 hover:scale-110"
              }`}
            />
          ))}
        </div>

        {/* Statistics */}
        {/* <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: "Active Agents", value: "20+", icon: "👥" },
            { label: "Properties Sold", value: "1,200+", icon: "🏠" },
            { label: "Happy Clients", value: "950+", icon: "😊" },
            { label: "Years Experience", value: "15+", icon: "⭐" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default AgentsSection;
