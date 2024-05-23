import { TableCell, TableRow } from '@mui/material';
import { Item } from '../../../../data/types';

interface ItemsTableRowProps {
  item: Item;
  onClick: (item: Item) => void;
}

export default function ItemsTableRow({ item, onClick }: ItemsTableRowProps) {
  return (
    <TableRow
      sx={{ '& td': { textAlign: 'center' } }}
      key={item.id}
      onClick={() => onClick(item)}
    >
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>{Number(item.price).toFixed(2)}</TableCell>
      <TableCell>{item.currency}</TableCell>
      <TableCell>{item.tag}</TableCell>
      <TableCell>
        {item.createdAt && new Date(item.createdAt).toLocaleDateString()}
      </TableCell>
    </TableRow>
  );
}
