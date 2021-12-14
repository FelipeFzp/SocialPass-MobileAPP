export interface AddressOutput {

    description: string;
    postalCode?: string;
    city: string;
    region: string;
    country: string;
    referencePoint?: string;
    complement?: string;
    latitude: number;
    longitude: number;
}