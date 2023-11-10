import prisma from '@/database/prisma';

export interface IInsertReview {
  rating: number;
  review: string;
  filmId: number;
  userId: number;
}

export interface IUpdateReview {
  rating?: number;
  review?: string;
  filmId?: number;
}

export interface GetReviewsOptions {
  page?: number;
  take?: number;
}
class CuratorReviewRepository {
  getReviewsByCurator = async (userId: number, options: GetReviewsOptions) => {
    const take = options.take || 10;
    const skip = options.page && options.page - 1 > 0 ? (options.page - 1) * take : 0;
    const [reviews, count] = await prisma.$transaction([
      prisma.curatorReview.findMany({
        where: {
          userId,
        },
        skip,
        take,
      }),
      prisma.curatorReview.count({
        where: {
          userId,
        },
      }),
    ]);
    return { reviews, count };
  };

  insertReview = async (data: IInsertReview) => {
    const [review] = await prisma.$transaction([
      prisma.curatorReview.create({ data }),
      prisma.user.update({ where: { id: data.userId }, data: { reviewCount: { increment: 1 } } }),
    ]);
    return review;
  };

  updateReview = async (id: number, data: IUpdateReview) => {
    return await prisma.curatorReview.update({
      where: { id },
      data,
    });
  };

  deleteReview = async (id: number, userId: number) => {
    await prisma.$transaction([
      prisma.curatorReview.delete({
        where: { id },
      }),
      prisma.user.update({ where: { id: userId }, data: { reviewCount: { decrement: 1 } } }),
    ]);
  };

  async getReviewById(id: number) {
    return await prisma.curatorReview.findFirst({
      where: { id },
    });
  }
}

export default CuratorReviewRepository;
