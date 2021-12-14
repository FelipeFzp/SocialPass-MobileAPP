import { ApiModel } from '../abstraction/api-model';

export interface CardCategory extends ApiModel {
    name: string;
    parent: string;
}