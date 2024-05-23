'use client';

import { Button } from '@mui/material';
import { useFormStatus } from 'react-dom';

export const CreateButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button variant="outlined" color="primary" type="submit">
      {pending ? 'Please wait...' : 'Submit'}
    </Button>
  );
};
