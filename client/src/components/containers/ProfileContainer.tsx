// src/components/containers/ProfileContainer.tsx
import { useState } from 'react';
import ProfileView from '../views/ProfileView';
import { MOCK_USER } from '../../types/types';


export default function ProfileContainer() {
  const [user] = useState(MOCK_USER);

  return <ProfileView user={user} />;
}
