'use server';

import { z } from 'zod';
import prisma from '../../../../../prisma/prisma';

export async function DeleteProfileAction(id: string) {
  const validatedBody = z.string().safeParse(id);

  if (!validatedBody.success) {
    throw new Error('Bad request');
  }

  try {
    await prisma.profile.delete({
      where: {
        id
      }
    });
  } catch (error) {
    throw new Error(`Failed to delete profile`);
  }
}
