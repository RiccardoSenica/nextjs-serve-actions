'use server';

import { z } from 'zod';
import { initializeUser } from '../../../../../data/initializeUser';
import prisma from '../../../../../prisma/prisma';

interface TagsActionProps {
  selectedProfile: string | undefined;
}

export async function TagsAction({ selectedProfile }: TagsActionProps) {
  const validatedBody = z.string().safeParse(selectedProfile);

  if (!validatedBody.success) {
    throw new Error('Bad request');
  }

  const user = await initializeUser();

  try {
    const tags = await prisma.tag.findMany({
      where: {
        Profile: {
          User: {
            id: user.id
          },
          id: selectedProfile
        }
      },
      include: {
        Items: {
          select: {
            id: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return tags.map((tag) => ({
      ...tag,
      Items: tag.Items.length
    }));
  } catch (error) {
    throw new Error('Failed to find tags');
  }
}
