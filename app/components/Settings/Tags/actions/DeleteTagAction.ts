'use server';

import { z } from 'zod';
import prisma from '../../../../../prisma/prisma';

export async function DeleteTagAction(id: string) {
  const validatedBody = z.string().safeParse(id);

  if (!validatedBody.success) {
    throw new Error('Bad request');
  }

  try {
    await prisma.tag.delete({
      where: {
        id
      }
    });
  } catch (error) {
    throw new Error(`Failed to delete tag`);
  }
}
