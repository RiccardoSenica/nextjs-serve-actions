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
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { Tags } from '../../../../data/types';
import { CreateTagAction } from './actions/CreateTagAction';
import { TagsAction } from './actions/TagsAction';
import TagsTableRow from './TagsTableRow';

interface TagsTableProps {
  selectedProfile: string | undefined;
}

export default function TagsTable({ selectedProfile }: TagsTableProps) {
  const [tags, setTags] = useState<Tags>([]);
  const [formKey, setFormKey] = useState(() => nanoid());
  const [refreshKey, setRefreshKey] = useState(0);

  const [formState, formAction] = useFormState(CreateTagAction, {
    clear: false,
    profileId: selectedProfile
  });

  useEffect(() => {
    const fetchTags = async () => {
      if (selectedProfile) {
        try {
          const tags = await TagsAction({ selectedProfile });
          setTags(tags);
        } catch (error) {
          console.error("Couldn't fetch tags.");
        }
      }
    };

    if (formState.clear) {
      setFormKey(nanoid());
    }

    fetchTags();
  }, [formState, selectedProfile, refreshKey]);

  return (
    <Stack
      sx={{
        spacing: 2,
        padding: 2
      }}
    >
      <Typography variant="h6">Tags</Typography>
      <Box>
        <form key={formKey} action={formAction}>
          <TextField
            fullWidth
            disabled={!selectedProfile}
            name="name"
            placeholder="Add new tag"
          />
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
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tags &&
                tags.map((tag) => (
                  <TagsTableRow
                    key={tag.id}
                    tag={tag}
                    onDelete={() => setRefreshKey((prevKey) => prevKey + 1)}
                  />
                ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Stack>
  );
}
