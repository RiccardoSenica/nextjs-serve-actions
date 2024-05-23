import prisma from '../prisma/prisma';

export async function initializeUser() {
  return await prisma.user.upsert({
    where: {
      email: process.env.EMAIL!
    },
    update: {},
    create: {
      email: process.env.EMAIL!,
      password: process.env.EMAIL!,
      name: process.env.EMAIL!,
      Profiles: {
        create: {
          name: 'Default profile'
        }
      }
    }
  });
}
