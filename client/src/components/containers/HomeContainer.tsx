import HomeView from "../views/HomeView";

//import { useEffect, useRef, useState } from "react";
import { useEffect, useState } from "react";
import { Request, Service, MOCK_REQUESTS, MOCK_SERVICES } from "../../types/types";
import NavigationButtons from "../views/NavigationButtons";

import { getDocs, collection } from 'firebase/firestore';
import { db } from "../../config/firebase";

export default function HomeContainer() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [stringFromDB, setStringFromDB] = useState<string>("");
  const testingCollectionRef = collection(db, "testing");
  const requestsCollectionRef = collection(db, "Requests");

  const getStringFromDB = async () => {
    console.log("getStringFromDB");
    try {
      const data = await getDocs(testingCollectionRef);
      if (data.docs.length > 0) {
        const testString = data.docs[0].data().test;
        setStringFromDB(testString);
        console.log("getStringFromDB: ", testString);
      }
    } catch (err) {
      console.error("Error fetching Firestore data:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const snapshot = await getDocs(requestsCollectionRef);
      const firebaseRequests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Request[];

      // Get mock requests that don't exist in Firebase
      const mockRequestIds = new Set(firebaseRequests.map(req => req.id));
      const remainingMockRequests = MOCK_REQUESTS.filter(req => !mockRequestIds.has(req.id));

      // Combine Firebase requests with remaining mock requests
      setRequests([...firebaseRequests, ...remainingMockRequests]);
    } catch (err) {
      console.error("Error fetching requests:", err);
      // Fallback to mock requests if there's an error
      setRequests(MOCK_REQUESTS);
    }
  };

  useEffect(() => {
    fetchRequests();
    setServices(MOCK_SERVICES);
    getStringFromDB();
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