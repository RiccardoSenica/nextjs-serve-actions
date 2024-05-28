import { CreateButton } from '@/components/UI/CreateButton';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField
} from '@mui/material';
import { Currency } from '@prisma/client';
import { useState } from 'react';
import { Tag } from '../../../../data/types';

interface CreateItemProps {
  profile: string | undefined;
  formAction: (payload: FormData) => void;
  tags: Tag[];
}

export function CreateItemForm({ profile, formAction, tags }: CreateItemProps) {
  const [selectedTag, setSelectedTag] = useState('');

  const handleTagChange = (event: SelectChangeEvent<string>) => {
    setSelectedTag(event.target.value as string);
  };

  return (
    <form action={formAction}>
      <Stack spacing={2} my={2}>
        <TextField name="name" label="Item" variant="outlined" required />
        <TextField name="description" label="Description" variant="outlined" />
        <TextField
          name="price"
          label="Price"
          variant="outlined"
          required
          type="number"
          inputProps={{ defaultValue: 0, step: 0.01, min: 0 }}
        />
        <FormControl variant="outlined">
          <InputLabel id="currency-label">Currency</InputLabel>
          <Select
            name="currency"
            label="Currency"
            labelId="currency-label"
            value={Currency.DKK}
          >
            {Object.values(Currency).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {profile && (
          <FormControl variant="outlined" required>
            <InputLabel id="tag-label">Tag</InputLabel>
            <Select
              name="tag"
              label="Tag"
              labelId="tag-label"
              value={selectedTag} // Use the state here
              onChange={handleTagChange}
            >
              {tags.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <TextField name="body" label="Comment" variant="outlined" />
        <TextField
          name="score"
          label="Score"
          variant="outlined"
          type="number"
          inputProps={{ step: 1, min: 0, max: 10 }}
        />
        <FormControlLabel control={<Checkbox name="regret" />} label="Regret" />
        <CreateButton />
      </Stack>
    </form>
  );
}
