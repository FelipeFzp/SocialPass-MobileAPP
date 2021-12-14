import { ApiModel } from '../abstraction/api-model';

export interface CardCategoryWithRelated extends ApiModel {
    name: string;
    childs: CardCategoryWithRelated[];
}