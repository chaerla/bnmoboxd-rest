import CuratorReviewRepository, { GetReviewsOptions } from '@/repositories/curator-review.repository';
import { CreateCuratorReviewDto, UpdateCuratorReviewDto } from '@/domain/dtos/curator-review.dto';
import { CuratorReview } from '@prisma/client';
import NotFound from '@errors/not-found.error';
import Forbidden from '@errors/forbidden.error';
import PhpApi from '@/adapters/php-api';

class CuratorReviewService {
  constructor(
    private curatorReviewRepository: CuratorReviewRepository,
    private phpApi: PhpApi,
  ) {}

  createReview = async (data: CreateCuratorReviewDto, userId: number) => {
    return await this.curatorReviewRepository.insertReview({ ...data, userId });
  };

  getReview = async (id: number, userId: number) => {
    const review = await this.curatorReviewRepository.getReviewById(id);
    if (!review) {
      throw new NotFound();
    }
    if (review.userId != userId) {
      throw new Forbidden();
    }
    return review;
  };

  getReviews = async (userId: number, options: GetReviewsOptions) => {
    const { reviews, count } = await this.curatorReviewRepository.getReviewsByCurator(userId, options);
    console.log(reviews);
    return {
      reviews: await this.mapReviewsWithTitle(reviews),
      count,
    };
  };

  mapReviewsWithTitle = async (reviews: CuratorReview[]) => {
    const filmIds = reviews.map(review => review.filmId);
    const filmTitles = reviews.length != 0 ? await this.phpApi.searchFilmTitlesById({ filmIds }) : {};
    return reviews.map(review => {
      return {
        ...review,
        film: filmTitles[review.filmId],
      };
    });
  };

  updateReview = async (id: number, data: UpdateCuratorReviewDto, userId: number) => {
    const review = await this.getReview(id, userId);
    return await this.curatorReviewRepository.updateReview(review.id, data);
  };

  deleteReview = async (id: number, userId: number) => {
    const review = await this.getReview(id, userId);
    await this.curatorReviewRepository.deleteReview(id);
    return review;
  };
}

export default CuratorReviewService;
