import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useState } from 'react';
import { Item, ItemComment } from '../../../../data/types';
import { ItemsTableRowAction } from '../Items/ItemsTableRowAction';
import CreateComment from './CreateComment/CreateComment';
import ItemData from './ItemData';

interface ItemDialogProps {
  item: Item;
  open: boolean;
  handleClose: () => void;
}

export default function ItemDialog({
  item,
  open,
  handleClose
}: ItemDialogProps) {
  const [comments, setComments] = useState<ItemComment[]>([]);
  const [formKey, setFormKey] = useState(() => nanoid());

  const fetchData = useCallback(async () => {
    try {
      const comments = await ItemsTableRowAction(item.id);
      setComments(comments);
    } catch (error) {
      console.error("Couldn't fetch comments.");
    }
  }, [item]);

  useEffect(() => {
    fetchData();
  }, [fetchData, formKey]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ alignSelf: 'center' }}>Item: {item.name}</DialogTitle>
      <DialogContent sx={{ width: 400 }}>
        <ItemData item={item} comments={comments} />
        <CreateComment key={formKey} itemId={item.id} setFormKey={setFormKey} />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClose}
          sx={{ width: '100%' }}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
