import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ServicesView from '../views/ServicesView';
import { Service, MOCK_SERVICES } from '../../types/types';

export default function ServicesContainer() {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchService() {
      if (typeof id !== 'string') return;

      const docRef = doc(db, "Services", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setService({ id: docSnap.id, ...docSnap.data() } as Service);
      } else {
        // Check if service exists in mock data
        const mockService = MOCK_SERVICES.find(svc => svc.id === id);
        if (mockService) {
          // Create new document with the mock data
          const newDocRef = doc(collection(db, "Services"));
          const { id: _, ...mockDataWithoutId } = mockService;
          await setDoc(newDocRef, mockDataWithoutId);
          // Fetch the newly created document
          const newDocSnap = await getDoc(newDocRef);
          if (newDocSnap.exists()) {
            setService({ id: newDocSnap.id, ...newDocSnap.data() } as Service);
          }
        } else {
          setService(null);
        }
      }
    }

    fetchService();
  }, [id]);

  if (!service) return <div className="p-4">Service not found or loading...</div>;

  return <ServicesView service={service} />;
} 