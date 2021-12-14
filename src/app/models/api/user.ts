import { ApiModel } from '../abstraction/api-model';
import { Card } from './card';

export interface User extends ApiModel {
    name: string;
    nickname: string;
    googleUserId?: string;
    facebookUserId?: string;
    linkedinUserId?: string;
    email: string;
    bio?: string;
    imageUrl?: string;
    card: Card;
    following: {
        id: string,
        followedAt: Date,
        user: string
    }[];
}