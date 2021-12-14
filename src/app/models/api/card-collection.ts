import { ApiModel } from '../abstraction/api-model';

export interface CardCollection extends ApiModel {
    name: string;
    cardsIds: string[];
    cards?: {
        name: string,
        bio: string,
        nickname: string,
        imageUrl: string
    }[];
}