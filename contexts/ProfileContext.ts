import { createContext } from 'react';

interface ProfileContextProps {
  profile: string | undefined;
  setProfile: (profile: string | undefined) => void;
}

export const ProfileContext = createContext<ProfileContextProps>({
  profile: undefined,
  setProfile: () => {}
});
