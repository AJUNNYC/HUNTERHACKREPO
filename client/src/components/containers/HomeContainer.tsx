import HomeView from "../views/HomeView";

//import { useEffect, useRef, useState } from "react";
import { useEffect, useState } from "react";
import { Request, Service, MOCK_REQUESTS, MOCK_SERVICES } from "../../types/types";


export default function HomeContainer() {

  const [requests, setRequests] = useState<Request[]>([]);
  const [services, setServices] = useState<Service[]>([]);


  useEffect(() => {
    setRequests(MOCK_REQUESTS)
    setServices(MOCK_SERVICES)
  }, []);

  return (
    <HomeView 
      requests={requests}
      services={services}
    />
  );
}