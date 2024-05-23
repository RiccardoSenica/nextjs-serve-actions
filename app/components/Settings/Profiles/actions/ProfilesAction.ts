'use server';

import { initializeUser } from '../../../../../data/initializeUser';
import prisma from '../../../../../prisma/prisma';

export async function ProfilesAction() {
  const user = await initializeUser();

  try {
    const profiles = await prisma.profile.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return profiles;
  } catch (error) {
    throw new Error('Failed to find profiles');
  }
}
