import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import RequestView from '../views/RequestView';
import { Request, MOCK_REQUESTS } from '../../types/types';

export default function RequestContainer() {
  const { id } = useParams();
  const [request, setRequest] = useState<Request | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchRequest() {
      if (typeof id !== 'string') return;

      const docRef = doc(db, "Requests", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRequest({ id: docSnap.id, ...docSnap.data() } as Request);
      } else {
        // Check if request exists in mock data
        const mockRequest = MOCK_REQUESTS.find(req => req.id === id);
        if (mockRequest) {
          // Create new document with the mock data
          const newDocRef = doc(collection(db, "Requests"));
          const { id: _, ...mockDataWithoutId } = mockRequest;
          await setDoc(newDocRef, mockDataWithoutId);
          // Fetch the newly created document
          const newDocSnap = await getDoc(newDocRef);
          if (newDocSnap.exists()) {
            setRequest({ id: newDocSnap.id, ...newDocSnap.data() } as Request);
          }
        } else {
          setRequest(null);
        }
      }
    }

    fetchRequest();
  }, [id]);

  if (!request) return <div className="p-4">Request not found or loading...</div>;

  return <RequestView request={request} />;
}