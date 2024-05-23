import { Button, TableCell, TableRow, TextField } from '@mui/material';
import { Dispatch, useState } from 'react';
import { Profile } from '../../../../data/types';
import { DeleteProfileAction } from './actions/DeleteProfileAction';
import { UpdateProfileAction } from './actions/UpdateProfileAction';

interface ProfilesTableRowProps {
  profile: Profile;
  selected: string | undefined;
  setSelected: Dispatch<string | undefined>;
  onDelete: () => void;
}

export default function ProfilesTableRow({
  profile,
  selected,
  setSelected,
  onDelete
}: ProfilesTableRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);

  const handleClick = () => {
    setSelected(profile.id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = async () => {
    setIsEditing(false);

    try {
      await UpdateProfileAction({
        id: profile.id,
        name
      });
    } catch (error) {
      console.error("Couldn't update profile.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDelete = async () => {
    try {
      await DeleteProfileAction(profile.id);
      onDelete();
    } catch (error) {
      console.error("Couldn't delete profile.");
    }
  };

  return (
    <TableRow key={profile.id}>
      <TableCell
        align="center"
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        sx={{ bgcolor: profile.id === selected ? 'lightblue' : 'inherit' }}
      >
        {isEditing ? (
          <TextField
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          name
        )}
      </TableCell>
      <TableCell align="center">
        <Button onClick={handleDelete}>Delete</Button>
      </TableCell>
    </TableRow>
  );
}
