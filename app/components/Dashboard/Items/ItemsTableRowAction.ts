'use server';

import { z } from 'zod';
import { ItemComment } from '../../../../data/types';
import prisma from '../../../../prisma/prisma';

export async function ItemsTableRowAction(id: string) {
  const validatedId = z.string().safeParse(id);

  if (!validatedId.success) {
    throw new Error('Bad request');
  }

  try {
    const itemWithComments = await prisma.item.findFirstOrThrow({
      where: {
        id: validatedId.data
      },
      include: {
        ItemComment: true
      }
    });

    return itemWithComments.ItemComment as ItemComment[];
  } catch (error) {
    throw new Error('Failed to find item comments');
  }
}
