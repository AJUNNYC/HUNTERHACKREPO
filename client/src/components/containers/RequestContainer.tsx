import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Request, MOCK_REQUESTS } from '../../types/types';
import RequestView from '../views/RequestView';

export default function RequestContainer() {
  const { id } = useParams();
  const [request, setRequest] = useState<Request | null>(null);

  useEffect(() => {
    const found = MOCK_REQUESTS.find((r) => r.id === id);
    setRequest(found || null);
  }, [id]);

  if (!request) return <div className="p-4">Request not found or loading...</div>;

  return <RequestView request={request} />;
}