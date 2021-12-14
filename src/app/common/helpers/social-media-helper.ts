import { NavController } from '@ionic/angular';
import { UserToken } from '../../models/api/user-token';
import { SocialMediaProfile } from '../../models/social-media-profile';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HttpResponseHelper } from './http-response-helper';
declare var FB;
declare var gapi;

export class SocialMediaHelper {
    private _userService: UserService;

    private readonly LINKEDIN_CLIENT_ID = '77b5hpi3ka7whq';
    private readonly GOOGLE_CLIENT_ID = '987024061044-l36ctscm31kvov6g0ac3rph33aj40f0d.apps.googleusercontent.com';

    constructor(userService: UserService) {
        this._userService = userService;
    }

    public loginWithFacebook(): Promise<SocialMediaProfile> {
        return new Promise((resolve, reject) => {
            FB.login((response) => {
                if (response.status === 'connected') {
                    console.log('Fetching informations to login...');
                    FB.api(`/me`, 'get',
                        // ,link
                        { fields: 'id,name,email' },
                        (profile: { id: string, name: string, email: string, link: string }) => {
                            resolve(profile);
                        });
                } else {
                    reject('Falha ao fazer login com o facebook.');
                }
                // ,user_link
            }, { scope: 'public_profile,email' });
        });
    }

    public loginWithGoogle(): Promise<SocialMediaProfile> {
        return new Promise(async (resolve, reject) => {
            await new Promise((resolve) => gapi.load('auth2', resolve));

            const authApi = await gapi.auth2.init({ client_id: this.GOOGLE_CLIENT_ID });
            const user = await authApi.signIn();

            if (user) {
                const profile = user.getBasicProfile();
                resolve({
                    id: user.getAuthResponse().id_token,
                    name: profile.getName(),
                    email: profile.getEmail()
                });
            } else {
                reject('Falha ao entrar com Google');
            }
        });
    }

    public loginWithLinkedin(authenticationToken?: string, redirectUrl?: string): Promise<SocialMediaProfile> {
        if (!authenticationToken) {
            const permissionScope = 'r_liteprofile r_emailaddress';
            window.location.href = `https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=${this.LINKEDIN_CLIENT_ID
                }&redirect_uri=${redirectUrl}&scope=${permissionScope}`;
        } else {
            return new Promise((resolve, reject) => {
                console.log('Loging in with linkedin, retriving profile informations...');
                this._userService.retriveLinkedinProfile(authenticationToken, redirectUrl)
                    .subscribe(result => {
                        resolve({
                            id: result.id,
                            email: result.email,
                            name: result.fullName
                        });
                    }, error => {
                        reject('Falha ao entrar com o Linkedin');
                    });
            });
        }
    }
}
