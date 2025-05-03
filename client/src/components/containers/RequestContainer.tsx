import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';  // Import doc and getDoc
import { db } from '../../config/firebase'; // Updated import path
import RequestView from '../views/RequestView';
import { Request } from '../../types/types';

export default function RequestContainer() {
  const { id } = useParams();
  const [request, setRequest] = useState<Request | null>(null);

  useEffect(() => {
    if (!id) return;  // If the ID is missing, don't try to fetch anything

    async function fetchRequest() {

      if (typeof id !== 'string') return;  // Make sure 'id' is a string

      const docRef = doc(db, "Requests", id);  // "Requests" is the collection, "id" is the document ID from the URL
      const docSnap = await getDoc(docRef);   // Fetch the document with that ID

      if (docSnap.exists()) {
        setRequest({ id: docSnap.id, ...docSnap.data() } as Request);  // If the document exists, set the state
      } else {
        setRequest(null);  // If no document is found, set the state to null (request not found)
      }
    }

    fetchRequest();  // Call the async function to fetch the request

  }, [id]);

  if (!request) return <div className="p-4">Request not found or loading...</div>;

  return <RequestView request={request} />;
}