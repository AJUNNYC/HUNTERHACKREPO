//import NavigationButtons from "./NavigationButtons";

//import { Place } from "../../../types/types";

// import "../styles/tailwindStyle.css"

import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Request, Service } from "../../types/types";



type HomeViewProps = {
  requests: Request[];
  services: Service[];
};

export default function HomeView({ 
  requests,
  services
}: HomeViewProps) {


  const requestsList = requests.map((request) => (
    <Card key={request.id} className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle>
          <Link to={`/requests/${request.id}`} className="hover:underline">
            {request.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>{request.description}</CardContent>
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
      <CardContent>{service.description}</CardContent>
    </Card>
  ));

  return(
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <section>
          <h1 className="text-4xl font-bold mb-4">Requests</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Make any requests or something you need help with
          </p>
          <div className="text-muted-foreground mb-8">
            Post your volunteer needs and connect with people willing to help. Whether it's a community project, event
            assistance, or any other volunteer opportunity, this is the place to find the support you need.
          </div>

          {requestsList}

          <Button asChild>
            <Link to="/requests">View All Requests</Link>
          </Button>
        </section>

        <section>
          <h1 className="text-4xl font-bold mb-4">Service Offers</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Look for volunteers who can provide assistance
          </p>
          <div className="text-muted-foreground mb-8">
            Browse services offered by volunteers in your community. Our members share their skills and time to help
            with various needs, from technical expertise to manual labor and everything in between.
          </div>

          {servicesList}

          <Button asChild>
            <Link to="/offers">View All Offers</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}