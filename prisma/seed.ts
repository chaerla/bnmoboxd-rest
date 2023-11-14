import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  const password = await bcrypt.hash('password', 10);
  const users = [
    {
      username: 'admin',
      password,
      email: `admin@example.com`,
      firstName: 'Admin',
      isAdmin: true,
    },
  ];
  const userVerifications = [];
  for (let i = 1; i <= 10; i++) {
    const user = {
      username: `user${i}`,
      password,
      email: `curator${i}@example.com`,
      firstName: `Curator`,
      lastName: `${i}`,
      isAdmin: false,
      reviewCount: 10,
    };
    const userVerification = {
      userId: i,
      status: 'ACCEPTED',
    };
    users.push(user);
    userVerifications.push(userVerification);
  }

  await prisma.user.createMany({ data: users });
  await prisma.userVerification.createMany({ data: userVerifications });
  const reviews = [];
  for (let i = 2; i <= 11; i++) {
    for (let j = 1; j <= 10; j++) {
      const review = {
        rating: Math.floor(Math.random() * 5) + 1,
        review: `Review by User ${
          i - 1
        } Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        filmId: j, // Replace with the actual film ID
        userId: i, // Assign the review to user1
      };

      reviews.push(review);
    }
  }

  await prisma.curatorReview.createMany({ data: reviews });
}

seed();
