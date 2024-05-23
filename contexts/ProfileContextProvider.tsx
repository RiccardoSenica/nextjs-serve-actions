import { useState } from 'react';
import { ProfileContext } from './ProfileContext';

export function ProfileContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<string | undefined>(undefined);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
