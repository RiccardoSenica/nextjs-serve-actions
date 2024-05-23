'use server';

import { z } from 'zod';
import prisma from '../../../../../prisma/prisma';

interface ProfileActionProps {
  id: string;
  name: string;
  error?: string;
}

export async function UpdateProfileAction({ id, name }: ProfileActionProps) {
  const validatedBody = z.string().safeParse(name);

  if (!validatedBody.success) {
    throw new Error('Bad request');
  }

  try {
    await prisma.profile.update({
      where: {
        id
      },
      data: {
        name: validatedBody.data
      }
    });
  } catch (error) {
    throw new Error(`Failed to update profile`);
  }
}
