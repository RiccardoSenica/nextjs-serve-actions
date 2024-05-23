'use server';

import { z } from 'zod';
import prisma from '../../../../../prisma/prisma';

interface TagActionProps {
  id: string;
  name: string;
  error?: string;
}

export async function UpdateTagAction({ id, name }: TagActionProps) {
  const validatedBody = z.string().safeParse(name);

  if (!validatedBody.success) {
    throw new Error('Bad request');
  }

  try {
    await prisma.tag.update({
      where: {
        id
      },
      data: {
        name: validatedBody.data
      }
    });
  } catch (error) {
    throw new Error(`Failed to update tag`);
  }
}
