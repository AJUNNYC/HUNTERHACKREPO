import HomeView from "../views/HomeView";
import { useEffect, useState } from "react";
import { Request, Service, MOCK_REQUESTS, MOCK_SERVICES } from "../../types/types";
import NavigationButtons from "../views/NavigationButtons";
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../../config/firebase";

export default function HomeContainer() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const requestsCollectionRef = collection(db, "Requests");
  const servicesCollectionRef = collection(db, "Services");

  const fetchRequests = async () => {
    try {
      const snapshot = await getDocs(requestsCollectionRef);
      const firebaseRequests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Request[];
      setRequests(firebaseRequests);
    } catch (err) {
      console.error("Error fetching requests:", err);
      // Fallback to mock requests if there's an error
      setRequests(MOCK_REQUESTS);
    }
  };

  const fetchServices = async () => {
    try {
      const snapshot = await getDocs(servicesCollectionRef);
      const firebaseServices = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[];

      // Get mock services that don't exist in Firebase
      const mockServiceIds = new Set(firebaseServices.map(svc => svc.id));
      const remainingMockServices = MOCK_SERVICES.filter(svc => !mockServiceIds.has(svc.id));

      // Combine Firebase services with remaining mock services
      setServices([...firebaseServices, ...remainingMockServices]);
    } catch (err) {
      console.error("Error fetching services:", err);
      // Fallback to mock services if there's an error
      setServices(MOCK_SERVICES);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchServices();
  }, []);

  return (
    <div>
      <NavigationButtons />
      <HomeView 
        requests={requests}
        services={services}
      />
    </div>
  );
}