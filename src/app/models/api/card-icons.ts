import { CardIconImage } from './card-icon-image';
import { SocialNetwork } from './social-network';

export interface CardIcon {
    key: string,
    socialNetwork: SocialNetwork;
    nick?: string;
    title?: string;
    link: string;
    position: number;
    icon?: CardIconImage;
}