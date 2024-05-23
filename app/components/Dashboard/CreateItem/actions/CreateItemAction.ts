'use server';

import { nanoid } from 'nanoid';
import { initializeUser } from '../../../../../data/initializeUser';
import { CreateItemFormSchema } from '../../../../../data/types';
import prisma from '../../../../../prisma/prisma';

interface CreateItemActionProps {
  open: boolean;
  profile?: string;
  error?: string;
}

export async function CreateItemAction(
  { profile }: CreateItemActionProps,
  formData: FormData
) {
  await initializeUser();

  const profileId = profile ?? (await prisma.profile.findFirst())?.id;

  const formDataObj = Object.fromEntries(formData.entries());

  const validatedBody = CreateItemFormSchema.safeParse(formDataObj);

  if (!validatedBody.success || !profileId) {
    throw new Error('Bad request');
  }

  const { name, description, price, currency, tag, body, score, regret } =
    validatedBody.data;

  const newId = nanoid();

  try {
    await prisma.$transaction([
      prisma.item.create({
        data: {
          id: newId,
          name,
          description,
          price,
          currency,
          Profile: {
            connect: {
              id: profileId
            }
          },
          Tag: tag
            ? {
                connect: {
                  id: tag
                }
              }
            : undefined
        }
      }),
      prisma.itemComment.create({
        data: {
          body,
          score,
          regret,
          Item: {
            connect: {
              id: newId
            }
          }
        }
      })
    ]);
  } catch (error) {
    throw new Error(`Failed to create item`);
  }

  return { open: false, profile: profileId };
}
