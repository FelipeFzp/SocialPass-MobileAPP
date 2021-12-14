import { User } from './user';

export interface SearchDefaultCategoriesList {
    topWeek: User[];
    nearToYou: User[];
    likeYou: User[];
    likeYourFollows: User[];
    recent: User[];
}