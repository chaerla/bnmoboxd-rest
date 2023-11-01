import { IUpdateReview } from '@/repositories/curator-review.repository';

export type CreateCuratorReviewDto = {
  rating: number;
  review: string;
  filmId: number;
  userId: number;
};

export type UpdateCuratorReviewDto = IUpdateReview;
