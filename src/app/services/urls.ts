import { environment } from '../../environments/environment'

export const URLS = {
    api: {
        auth: `${environment.apiUrl}/auth`,
        users: `${environment.apiUrl}/users`,
        cards: `${environment.apiUrl}/cards`,
        socialNetworks: `${environment.apiUrl}/socialNetworks`,
        files: `${environment.apiUrl}/files`,
        cardCategories: `${environment.apiUrl}/cardCategories`,
        trends: `${environment.apiUrl}/trends`,
        cardCollections: `${environment.apiUrl}/cardCollections`,
    }
}