import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/api/user';
import { Observable } from 'rxjs';
import { URLS } from './urls';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { UserToken } from '../models/api/user-token';
import { UserRegisterOutput } from '../models/output/user-register-output';
import { StorageService } from './storage.service';
import { UserOutput } from '../models/output/user-output';
import { LinkedinProfile } from '../models/api/linkedin-profile';
import { FollowerSummary } from '../models/api/follower-summary';
import { UserFollowStatistics } from '../models/api/user-follow-statistics';


@Injectable()
export class UserService {

    constructor(
        private _http: HttpClient,
        private _authService: AuthService,
        private _storageService: StorageService
    ) { }

    public getLoggedUser(): Observable<User> {
        return this._authService.refresh()
            .pipe(
                map(userToken => userToken.user)
            );
    }

    public register(user: UserRegisterOutput): Observable<User> {
        return new Observable(observer => {

            const body = new FormData();
            body.append('name', user.name);
            body.append('email', user.email);
            body.append('nickname', user.nickname);
            body.append('password', user.password);
            body.append('image', user.image);

            this._http.post<UserToken>(`${URLS.api.auth}/register`, body).subscribe(response => {

                this._storageService.data = {
                    user: response.user,
                    token: response.token
                };

                this._storageService.saveData().subscribe(data => {
                    observer.next(response.user);
                });
            }, error => {
                observer.error(error);
            });
        });
    }

    public update(user: UserOutput): Observable<User> {

        return new Observable(observer => {

            const body = new FormData();
            body.append('id', user.id);
            body.append('name', user.name);
            body.append('email', user.email);
            body.append('nickname', user.nickname);
            body.append('bio', user.bio);
            body.append('image', user.image);

            this._http.put<User>(`${URLS.api.users}`, body).subscribe(response => {

                this._storageService.data.user = response;

                this._storageService.saveData().subscribe(data => {
                    observer.next(response);
                });
            }, error => {
                observer.error(error);
            });
        });
    }

    public getUserFollowing(page: number, limit: number, searchTerms: string): Observable<FollowerSummary[]> {
        return this._http.post<FollowerSummary[]>(`${URLS.api.users}/cards/following`, {
            page,
            limit,
            searchTerms
        });
    }

    public getUserFollowers(page: number, limit: number, searchTerms: string): Observable<FollowerSummary[]> {
        return this._http.post<FollowerSummary[]>(`${URLS.api.users}/cards/followers`, {
            page,
            limit,
            searchTerms
        });
    }

    public getByNickname(userName: string): Observable<User> {
        return this._http.get<User>(`${URLS.api.users}/nickname/${userName}`);
    }

    public getFollowInfos(): Observable<UserFollowStatistics> {
        return this._http.get<UserFollowStatistics>(`${URLS.api.users}/followInfos`);
    }

    public toggleFollow(userId: string, follow: boolean): Observable<void> {
        return this._http.patch<void>(`${URLS.api.users}/follow/${userId}/${follow}`, {});
    }

    public unlinkGoogleAccount(googleUserId: string): Observable<User> {
        return this._http.patch<User>(`${URLS.api.users}/unlinkAccount/google`, { googleUserId });
    }

    public unlinkFacebookAccount(facebookUserId: string): Observable<User> {
        return this._http.patch<User>(`${URLS.api.users}/unlinkAccount/facebook`, { facebookUserId });
    }

    public unlinkLinkedinAccount(linkedinUserId: string): Observable<User> {
        return this._http.patch<User>(`${URLS.api.users}/unlinkAccount/linkedin`, { linkedinUserId });
    }

    public linkGoogleAccount(googleUserId: string): Observable<User> {
        return this._http.patch<User>(`${URLS.api.users}/linkAccount/google`, { googleUserId });
    }

    public linkFacebookAccount(facebookUserId: string): Observable<User> {
        return this._http.patch<User>(`${URLS.api.users}/linkAccount/facebook`, { facebookUserId });
    }

    public linkLinkedinAccount(linkedinUserId: string): Observable<User> {
        return this._http.patch<User>(`${URLS.api.users}/linkAccount/linkedin`, { linkedinUserId });
    }

    public retriveLinkedinProfile(token: string, redirectUrl: string): Observable<LinkedinProfile> {
        return this._http.post<LinkedinProfile>(`${URLS.api.users}/linkedinProfile`, { token, redirectUrl });
    }

    public nicknameExists(nickname: string): Observable<boolean> {

        const userId = this._storageService.data ? this._storageService.data.user.id : null;

        return this._http.get<{ exists: boolean }>(`${URLS.api.users}/nicknameExists/${nickname}`, {
            params: { userId }
        }).pipe(
            map(response => response.exists)
        );
    }

    public sendLostPasswordEmail(email: string): Observable<void> {
        return this._http.post<void>(`${URLS.api.users}/sendLostPasswordEmail`, { email });
    }

    public confirmLostPasswordEmail(email: string, code: string): Observable<void> {
        return this._http.post<void>(`${URLS.api.users}/confirmLostPasswordEmail`, { email, code });
    }

    public recoverPassword(recoveryPasswordCode: string, newPassword: string, email: string): Observable<void> {
        return this._http.post<void>(`${URLS.api.users}/recoverPassword`, {
            recoveryPasswordCode,
            newPassword,
            email
        });
    }

    public sendEmailConfirmation(email: string): Observable<void> {
        return this._http.post<void>(`${URLS.api.users}/sendEmailConfirmation`, { email });
    }

    public confirmEmail(email: string, code: string): Observable<void> {
        return this._http.post<void>(`${URLS.api.users}/confirmEmail`, { email, code });
    }
}