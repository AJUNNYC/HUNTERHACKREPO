//import NavigationButtons from "./NavigationButtons";

//import { Place } from "../../../types/types";

// import "../styles/tailwindStyle.css"

import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Request, Service } from "../../types/types";
import { useState } from "react";

type HomeViewProps = {
  requests: Request[];
  services: Service[];
};

export default function HomeView({ 
  requests,
  services
}: HomeViewProps) {
  const [expandedSection, setExpandedSection] = useState<'requests' | 'services' | null>(null);

  const handleSectionClick = (section: 'requests' | 'services') => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleBackClick = () => {
    setExpandedSection(null);
  };

  const requestsList = requests.map((request) => (
    <Card key={request.id} className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle>
          <Link to={`/requests/${request.id}`} className="hover:underline">
            {request.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{request.description}</p>
        <p className="text-sm text-muted-foreground">
          Posted by {request.userName} on {request.createdAt}
        </p>
      </CardContent>
    </Card>
  ));

  const servicesList = services.map((service) => (
    <Card key={service.id} className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle>
          <Link to={`/services/${service.id}`} className="hover:underline">
            {service.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{service.description}</p>
        <p className="text-sm text-muted-foreground">
          Posted by {service.userName} on {service.createdAt}
        </p>
      </CardContent>
    </Card>
  ));

  return(
    <div className="container mx-auto px-4 py-12 overflow-hidden">
      {expandedSection && (
        <Button 
          onClick={handleBackClick}
          variant="outline"
          className="mb-4 transition-all duration-300 hover:scale-105"
        >
          Back to Overview
        </Button>
      )}
      
      <div className={`relative grid ${expandedSection ? 'grid-cols-1' : 'md:grid-cols-2'} gap-12 transition-all duration-500`}>
        {/* Requests Section */}
        <section 
          className={`transition-all duration-500 ease-in-out transform ${
            expandedSection === 'requests' 
              ? 'col-span-1 translate-x-0 opacity-100' 
              : expandedSection === 'services' 
                ? 'translate-x-[-100%] opacity-0 absolute' 
                : 'col-span-1 translate-x-0 opacity-100'
          }`}
        >
          <h1 
            className="text-4xl font-bold mb-4 cursor-pointer hover:text-primary transition-colors duration-300"
            onClick={() => handleSectionClick('requests')}
          >
            Requests
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Make any requests or something you need help with
          </p>
          <div className="text-muted-foreground mb-8">
            Post your volunteer needs and connect with people willing to help. Whether it's a community project, event
            assistance, or any other volunteer opportunity, this is the place to find the support you need.
          </div>

          {requestsList}

          <Button asChild variant="default" className="mt-4">
            <Link to="/requests">View All Requests</Link>
          </Button>
        </section>

        {/* Services Section */}
        <section 
          className={`transition-all duration-500 ease-in-out transform ${
            expandedSection === 'services' 
              ? 'col-span-1 translate-x-0 opacity-100' 
              : expandedSection === 'requests' 
                ? 'translate-x-[100%] opacity-0 absolute' 
                : 'col-span-1 translate-x-0 opacity-100'
          }`}
        >
          <h1 
            className="text-4xl font-bold mb-4 cursor-pointer hover:text-primary transition-colors duration-300"
            onClick={() => handleSectionClick('services')}
          >
            Service Offers
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Look for volunteers who can provide assistance
          </p>
          <div className="text-muted-foreground mb-8">
            Browse services offered by volunteers in your community. Our members share their skills and time to help
            with various needs, from technical expertise to manual labor and everything in between.
          </div>

          {servicesList}

          <Button asChild variant="default" className="mt-4">
            <Link to="/offers">View All Offers</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}