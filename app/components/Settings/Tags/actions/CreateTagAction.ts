'use server';

import { CreateProfileFormSchema } from '../../../../../data/types';
import prisma from '../../../../../prisma/prisma';

interface CreateItemActionProps {
  clear: boolean;
  profileId: string | undefined;
  error?: string;
}

export async function CreateTagAction(
  { profileId }: CreateItemActionProps,
  formData: FormData
) {
  const formDataObj = Object.fromEntries(formData.entries());

  const validatedBody = CreateProfileFormSchema.safeParse(formDataObj);

  if (!validatedBody.success || !profileId) {
    throw new Error('Bad request');
  }

  const { name } = validatedBody.data;

  try {
    const existingTag = await prisma.tag.findFirst({
      where: {
        profileId,
        name
      }
    });

    if (existingTag) {
      return { clear: false, profileId };
    }
  } catch (error) {
    throw new Error(`Failed to find tag`);
  }

  try {
    await prisma.tag.create({
      data: {
        profileId,
        name
      }
    });

    return { clear: true, profileId };
  } catch (error) {
    throw new Error(`Failed to create tag`);
  }
}
