import { CreateButton } from '@/components/UI/CreateButton';
import { Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { CreateCommentAction } from './actions/CreateCommentAction';

interface CreateCommentProps {
  itemId: string;
  setFormKey: (key: string) => void;
}

export default function CreateComment({
  itemId,
  setFormKey
}: CreateCommentProps) {
  const [formState, formAction] = useFormState(CreateCommentAction, {
    itemId,
    clear: false
  });

  useEffect(() => {
    if (formState.clear) {
      setFormKey(nanoid());
    }
  }, [setFormKey, formState]);

  return (
    <form action={formAction}>
      <Stack spacing={2} marginY={2}>
        <TextField name="body" label="Comment" variant="outlined" required />
        <TextField
          name="score"
          label="Score"
          variant="outlined"
          type="number"
          inputProps={{ step: 1, min: 0, max: 10 }}
        />
        <FormControlLabel name="regret" control={<Checkbox />} label="Regret" />
        <CreateButton />
      </Stack>
    </form>
  );
}
