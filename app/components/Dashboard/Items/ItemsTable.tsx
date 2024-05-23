import { ProfilesAction } from '@/components/Settings/Profiles/actions/ProfilesAction';
import { ProfileContext } from '@/contexts/ProfileContext';
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { nanoid } from 'nanoid';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Item, Items, Profiles } from '../../../../data/types';
import CreateItemDialog from '../CreateItem/CreateItemDialog';
import ItemDialog from '../ItemDialog/ItemDialog';
import { ItemsTableAction } from './actions/ItemsTableAction';
import ItemsTableRow from './ItemsTableRow';

export default function ItemsTable() {
  const [items, setItems] = useState<Items>([]);
  const [take, setTake] = useState<number>(20);
  const tableRef = useRef<HTMLDivElement>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [formKey, setFormKey] = useState(() => nanoid());
  const [profiles, setProfiles] = useState<Profiles>([]);
  const { profile, setProfile } = useContext(ProfileContext);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  const handleUpdateProfiles = useCallback(async () => {
    const updatedProfiles = await ProfilesAction();
    setProfiles(updatedProfiles);
  }, []);

  useEffect(() => {
    handleUpdateProfiles();
  }, [handleUpdateProfiles]);

  const handleUpdateItems = useCallback(
    async (id: string) => {
      try {
        const updatedItems = await ItemsTableAction({
          take,
          profile: id
        });
        setItems(updatedItems);
      } catch (error) {
        console.error("Couldn't fetch items.");
      }
    },
    [take]
  );

  const handleFetchItems = useCallback(
    (event: SelectChangeEvent<string>) => {
      handleUpdateItems(event.target.value);
      setFormKey(nanoid());
      setProfile(event.target.value);
    },
    [handleUpdateItems, setProfile]
  );

  useEffect(() => {
    if (profile) {
      handleUpdateItems(profile);
      setFormKey(nanoid());
    }
  }, [profile, handleUpdateItems]);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLDivElement;
      const bottom =
        target.scrollHeight - target.scrollTop === target.clientHeight;
      if (bottom) {
        setTake((prevTake) => prevTake + 20);
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);

      return () => {
        tableElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [take]);

  const handleCreateItemDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = async (created: boolean) => {
    setFormKey(nanoid());
    setOpenCreateDialog(false);

    if (created) {
      const updatedItems = await ItemsTableAction({
        take,
        profile
      });

      setItems(updatedItems);
    }
  };

  const handleOpenItemDialog = (item: Item) => {
    setCurrentItem(item);
    setOpenItemDialog(true);
  };

  const handleCloseItemDialog = async () => {
    setOpenItemDialog(false);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <Stack direction="row" spacing={2} padding={2}>
        {profiles.length > 0 && (
          <Select
            labelId="profile-label"
            sx={{ width: '200px' }}
            onChange={handleFetchItems}
            value={profile ?? ''}
          >
            {profiles.map((profile) => (
              <MenuItem key={profile.id} value={profile.id}>
                {profile.name}
              </MenuItem>
            ))}
          </Select>
        )}
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          onClick={handleCreateItemDialog}
          sx={{ width: '200px' }}
        >
          Create Item
        </Button>
      </Stack>
      <Box
        sx={{
          height: 'calc(100vh - 50px)',
          overflowY: 'scroll',
          padding: 2,
          paddingTop: 0
        }}
        ref={tableRef}
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
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items &&
              items.map((item) => (
                <ItemsTableRow
                  key={item.id}
                  item={item}
                  onClick={handleOpenItemDialog}
                />
              ))}
          </TableBody>
        </Table>
      </Box>
      {currentItem && (
        <ItemDialog
          item={currentItem}
          open={openItemDialog}
          handleClose={handleCloseItemDialog}
        />
      )}
      <CreateItemDialog
        key={formKey}
        open={openCreateDialog}
        close={handleCloseCreateDialog}
        profile={profile}
      />
    </Paper>
  );
}
