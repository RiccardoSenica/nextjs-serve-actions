import { Card, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Item, ItemComment } from '../../../../data/types';

interface ItemDataProps {
  item: Item;
  comments: ItemComment[];
}

export default function ItemData({ item, comments }: ItemDataProps) {
  return (
    <Box>
      <Typography>Description: {item.description}</Typography>
      <Typography>
        Price: {Number(item.price).toFixed(2)} {item.currency}
      </Typography>
      <Box
        sx={{
          height: 250,
          overflowY: 'auto'
        }}
      >
        {comments &&
          comments.map((comment) => (
            <Card key={comment.id} sx={{ margin: '5px', padding: '10px' }}>
              <Typography>Comment: {comment.body}</Typography>
              <Typography>Score: {comment.score}</Typography>
              <Typography>Regret: {comment.regret ? 'Yes' : 'No'}</Typography>
              <Typography>
                Created:{' '}
                {comment.createdAt &&
                  new Date(comment.createdAt).toLocaleString()}
              </Typography>
            </Card>
          ))}
      </Box>
    </Box>
  );
}
