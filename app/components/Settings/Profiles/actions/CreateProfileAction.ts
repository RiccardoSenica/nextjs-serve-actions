'use server';

import { initializeUser } from '../../../../../data/initializeUser';
import { CreateProfileFormSchema } from '../../../../../data/types';
import prisma from '../../../../../prisma/prisma';

interface CreateItemActionProps {
  clear: boolean;
  error?: string;
}

export async function CreateProfileAction(
  _: CreateItemActionProps,
  formData: FormData
) {
  const formDataObj = Object.fromEntries(formData.entries());

  const validatedBody = CreateProfileFormSchema.safeParse(formDataObj);

  if (!validatedBody.success) {
    throw new Error('Bad request');
  }

  const user = await initializeUser();

  try {
    const existingProfile = await prisma.profile.findFirst({
      where: {
        userId: user.id,
        name: validatedBody.data.name
      }
    });

    if (existingProfile) {
      return { clear: false };
    }
  } catch (error) {
    throw new Error(`Failed to find profile`);
  }

  try {
    await prisma.profile.create({
      data: {
        userId: user.id,
        name: validatedBody.data.name
      }
    });

    return { clear: true };
  } catch (error) {
    throw new Error(`Failed to create profile`);
  }
}
