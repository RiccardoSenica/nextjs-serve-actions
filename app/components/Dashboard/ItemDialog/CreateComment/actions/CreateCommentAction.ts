'use server';

import { CreateCommentFormSchema } from '../../../../../../data/types';
import prisma from '../../../../../../prisma/prisma';

interface ItemDialogActionProps {
  clear: boolean;
  itemId: string;
  error?: string;
}

export async function CreateCommentAction(
  { itemId }: ItemDialogActionProps,
  formData: FormData
) {
  const formDataObj = Object.fromEntries(formData.entries());

  const validatedBody = CreateCommentFormSchema.safeParse(formDataObj);

  if (!validatedBody.success) {
    throw new Error('Bad request');
  }

  const { body, score, regret } = validatedBody.data;

  try {
    await prisma.itemComment.create({
      data: {
        body,
        score,
        regret,
        Item: {
          connect: {
            id: itemId
          }
        }
      }
    });
  } catch (error) {
    throw new Error(`Failed to create comment`);
  }

  return { clear: true, itemId };
}
