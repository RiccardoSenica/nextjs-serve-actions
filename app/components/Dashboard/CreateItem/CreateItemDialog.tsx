import { TagsAction } from '@/components/Settings/Tags/actions/TagsAction';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { Tags } from '../../../../data/types';
import { CreateItemAction } from './actions/CreateItemAction';
import { CreateItemForm } from './CreateItemForm';

interface CreateItemProps {
  open: boolean;
  close: (created: boolean) => void;
  profile: string | undefined;
}

export default function CreateItemDialog({
  open,
  close,
  profile
}: CreateItemProps) {
  const [tags, setTags] = useState<Tags>([]);

  const [formState, formAction] = useFormState(CreateItemAction, {
    open: true,
    profile
  });

  useEffect(() => {
    const updateTags = async () => {
      if (profile) {
        try {
          const updatedTags = await TagsAction({ selectedProfile: profile });
          setTags(updatedTags);
        } catch (error) {
          console.error("Couldn't fetch tags.");
        }
      }
    };

    updateTags();
  }, [profile]);

  useEffect(() => {
    if (!formState.open) {
      close(true);
    }
  }, [open, close, formState]);

  const handleClose = async () => {
    close(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ alignSelf: 'center' }}>Create a new item</DialogTitle>
      <DialogContent sx={{ width: '400px' }}>
        <CreateItemForm profile={profile} formAction={formAction} tags={tags} />
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
