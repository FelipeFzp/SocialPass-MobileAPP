import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FollowerSummary } from '../../models/api/follower-summary';
import { User } from '../../models/api/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-account-follows',
    templateUrl: 'account-follows.page.html',
    styleUrls: ['account-follows.page.scss'],
})
export class AccountFollowsPage {
    public user: User;
    public tab: 'followers' | 'following';
    public followers: FollowerSummary[] = [];
    public searchChange = new Subject<string>();

    public showLoadMore: boolean;
    public showLoading: boolean;
    public pageIndex: number = 0;
    public pageLimit: number = 15;

    private _searchTerms: string;
    private _searchChangeSubscription: Subscription;

    constructor(private _userService: UserService,
        private _activatedRoute: ActivatedRoute,
        private _navCtrl: NavController) { }

    ionViewDidEnter() {

        this._searchChangeSubscription = this.searchChange
            .pipe(debounceTime(500))
            .subscribe(searchTerms => {
                this._searchTerms = searchTerms;

                this.loadFollowers(true);
            });

        this.switchTab(this._activatedRoute.snapshot.params.tab)
        this._userService.getLoggedUser()
            .subscribe(user => this.user = user);
    }

    ionViewDidLeave() {
        this._searchChangeSubscription.unsubscribe();
    }

    public goToFollower(nickname: string): void {
        this._navCtrl.navigateForward('/home/card', {
            queryParams: {
                userName: nickname
            }
        });
    }

    public switchTab(tab?: 'followers' | 'following'): void {
        if (tab) {
            this.tab = tab;
        } else {
            if (this.tab == 'followers') {
                this.tab = 'following';
            }
            else {
                this.tab = 'followers';
            }
        }

        this.loadFollowers(true);
    }

    public async loadFollowers(reset: boolean = false): Promise<void> {
        if (reset) {
            this.followers = [];
            this.pageIndex = 0;
        }

        this.showLoading = true;
        const loadedFollowers = await new Promise<FollowerSummary[]>(resolve => {
            switch (this.tab) {
                case 'followers':
                    this._userService.getUserFollowers(this.pageIndex, this.pageLimit, this._searchTerms)
                        .subscribe(r => {
                            this.followers.push(...r);
                            resolve(r);
                        })
                    break;
                case 'following':
                    this._userService.getUserFollowing(this.pageIndex, this.pageLimit, this._searchTerms)
                        .subscribe(r => {
                            this.followers.push(...r);
                            resolve(r);
                        })
                    break;
                default:
                    resolve([]);
                    break;
            }
        });

        this.showLoading = false;
        this.showLoadMore = loadedFollowers.length >= this.pageLimit;
    }
}
