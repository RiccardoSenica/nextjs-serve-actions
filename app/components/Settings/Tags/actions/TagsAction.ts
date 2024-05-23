'use server';

import { z } from 'zod';
import { initializeUser } from '../../../../../data/initializeUser';
import { Profiles } from '../../../../../data/types';
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
    const profiles = await prisma.tag.findMany({
      where: {
        Profile: {
          User: {
            id: user.id
          },
          id: selectedProfile
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return profiles as Profiles;
  } catch (error) {
    throw new Error('Failed to find tags');
  }
}
