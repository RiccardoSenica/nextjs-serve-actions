import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { nanoid } from 'nanoid';
import { Dispatch, useCallback, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { Profiles } from '../../../../data/types';
import { CreateProfileAction } from './actions/CreateProfileAction';
import { ProfilesAction } from './actions/ProfilesAction';
import ProfilesTableRow from './ProfilesTableRow';

interface ProfilesTableProps {
  selectedProfile: string | undefined;
  setSelectedProfile: Dispatch<string | undefined>;
}

export default function ProfilesTable({
  selectedProfile,
  setSelectedProfile
}: ProfilesTableProps) {
  const [profiles, setProfiles] = useState<Profiles>([]);
  const [formKey, setFormKey] = useState(() => nanoid());
  const [refreshKey, setRefreshKey] = useState(0);

  const [formState, formAction] = useFormState(CreateProfileAction, {
    clear: false
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profiles = await ProfilesAction();
        setProfiles(profiles);
      } catch (error) {
        console.error("Couldn't fetch profiles.");
      }
    };

    if (formState.clear) {
      setFormKey(nanoid());
    }

    fetchProfiles();
  }, [formState, refreshKey]);

  const handleDelete = useCallback(async () => {
    setRefreshKey((prevKey) => prevKey + 1);
    setSelectedProfile(undefined);
  }, [setSelectedProfile]);

  return (
    <Stack
      sx={{
        spacing: 2,
        padding: 2
      }}
    >
      <Typography variant="h6">Profiles</Typography>
      <Box>
        <form key={formKey} action={formAction}>
          <TextField fullWidth name="name" placeholder="Add new profile" />
        </form>
        <Box
          sx={{
            maxHeight: 'calc(100vh - 200px)',
            overflow: 'auto'
          }}
        >
          <Table
            stickyHeader
            sx={{
              width: '100%'
            }}
          >
            <TableHead>
              <TableRow sx={{ '& th': { textAlign: 'center' } }}>
                <TableCell>Name</TableCell>
                <TableCell>Creation date</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {profiles &&
                profiles.map((profile) => (
                  <ProfilesTableRow
                    key={profile.id}
                    profile={profile}
                    selected={selectedProfile}
                    setSelected={setSelectedProfile}
                    onDelete={handleDelete}
                  />
                ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Stack>
  );
}
