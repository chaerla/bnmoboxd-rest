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
    const count = await prisma.curatorReview.count({
      where: {
        userId,
      },
    });

    const reviews = await prisma.curatorReview.findMany({
      where: {
        userId,
      },
      skip,
      take,
    });
    return { reviews, count };
  };

  insertReview = async (data: IInsertReview) => {
    return await prisma.curatorReview.create({ data });
  };

  updateReview = async (id: number, data: IUpdateReview) => {
    return await prisma.curatorReview.update({
      where: { id },
      data,
    });
  };

  deleteReview = async (id: number) => {
    await prisma.curatorReview.delete({
      where: { id },
    });
  };

  async getReviewById(id: number) {
    return await prisma.curatorReview.findFirst({
      where: { id },
    });
  }
}

export default CuratorReviewRepository;
