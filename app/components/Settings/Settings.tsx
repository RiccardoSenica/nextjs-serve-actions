import { ProfileContext } from '@/contexts/ProfileContext';
import { Card, Paper, Stack } from '@mui/material';
import { nanoid } from 'nanoid';
import { useContext, useEffect, useState } from 'react';
import ProfilesTable from './Profiles/ProfilesTable';
import TagsTable from './Tags/TagsTable';

export default function Settings() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [formKey, setFormKey] = useState(() => nanoid());

  useEffect(() => {
    if (profile) {
      setFormKey(nanoid());
    }
  }, [profile]);

  return (
    <Paper sx={{ width: '100%', height: 'calc(100vh - 50px)' }}>
      <Stack direction="row" spacing={2} padding={2}>
        <Card sx={{ width: '50%', height: '100%' }}>
          <ProfilesTable
            selectedProfile={profile}
            setSelectedProfile={setProfile}
          />
        </Card>
        <Card sx={{ width: '50%', height: '100%' }}>
          <TagsTable key={formKey} selectedProfile={profile} />
        </Card>
      </Stack>
    </Paper>
  );
}
