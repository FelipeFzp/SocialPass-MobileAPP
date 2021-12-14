import { ApiModel } from '../abstraction/api-model';

export interface SocialNetwork extends ApiModel {
    key: string;
    title: string;
    placeholderPrefix: string;
    placeholderValue: string;
    baseUrl?: string;
}