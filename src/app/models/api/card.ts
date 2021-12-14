import { ApiModel } from '../abstraction/api-model';
import { Address } from './address';
import { CardBackground } from './card-background';
import { CardCategory } from './card-category';
import { CardIcon } from './card-icons';

export interface Card extends ApiModel {
    background: CardBackground;
    icons: CardIcon[];
    viewsCount: string;
    uniqueViewsCount: string;
    followersCount?: string;
    categories: CardCategory[];
    address: Address;
}