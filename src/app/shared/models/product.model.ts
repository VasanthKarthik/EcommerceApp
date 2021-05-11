import { IUserFeedback } from './user-feedback.model';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  productImages: string[];
  productType: string;
  overAllRating: number;
  stockAvailable: number;
  actualPrice: number;
  discountPrice: number;
  discountPercentage: number;
  specialOffer: string;
  tags: string[];
  reviews: IUserFeedback[];
}
