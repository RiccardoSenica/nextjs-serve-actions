import { Button, TableCell, TableRow, TextField } from '@mui/material';
import { useState } from 'react';
import { Tag } from '../../../../data/types';
import { DeleteTagAction } from './actions/DeleteTagAction';
import { UpdateTagAction } from './actions/UpdateTagAction';

interface TagsTableRowProps {
  tag: Tag;
  onDelete: () => void;
}

export default function TagsTableRow({ tag, onDelete }: TagsTableRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(tag.name);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = async () => {
    setIsEditing(false);

    try {
      await UpdateTagAction({
        id: tag.id,
        name
      });
    } catch (error) {
      console.error("Couldn't update tag.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDelete = async () => {
    try {
      await DeleteTagAction(tag.id);
      onDelete();
    } catch (error) {
      console.error("Couldn't delete tag.");
    }
  };

  return (
    <TableRow sx={{ '& td': { textAlign: 'center' } }} key={tag.id}>
      <TableCell onDoubleClick={handleDoubleClick}>
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
      <TableCell>
        <Button onClick={handleDelete}>Delete</Button>
      </TableCell>
    </TableRow>
  );
}
