'use server';

import { Items } from '../../../../../data/types';
import prisma from '../../../../../prisma/prisma';

interface ItemsTableActionProps {
  take: number;
  profile: string | undefined;
}

export async function ItemsTableAction({
  take,
  profile
}: ItemsTableActionProps) {
  if (!profile) {
    return [] as Items;
  }

  try {
    const items = await prisma.item.findMany({
      where: {
        profileId: profile
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        Tag: {
          select: {
            name: true
          }
        }
      },
      take
    });

    const itemsWithTag = items.map((item) => {
      return {
        ...item,
        tag: item?.Tag?.name
      };
    });

    return itemsWithTag as Items;
  } catch (error) {
    throw new Error('Failed to find items');
  }
}
