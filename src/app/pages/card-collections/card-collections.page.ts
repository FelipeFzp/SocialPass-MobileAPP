import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CardCollection } from '../../models/api/card-collection';
import { FollowerSummary } from '../../models/api/follower-summary';
import { User } from '../../models/api/user';
import { AlertService } from '../../services/alert.service';
import { CardCollectionService } from '../../services/card-collection.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-card-collections',
    templateUrl: 'card-collections.page.html',
    styleUrls: ['card-collections.page.scss'],
})
export class CardCollectionsPage {
    public loading: boolean;
    public collections: CardCollection[];

    constructor(private _navCtrl: NavController,
        private _toastService: ToastService,
        private _alertService: AlertService,
        private _cardCollectionService: CardCollectionService) { }

    ionViewDidEnter() {
        this.loadCollections();
    }

    public loadCollections(): void {
        this.loading = true;

        this._cardCollectionService.getCollectionsWithCards()
            .subscribe(collections => {
                this.collections = collections;
                this.loading = false;
            }, error => {
                this._toastService.showHttpError(error);
                this.loading = false;
            });
    }

    public deleteCollection(collectionId: string): void {
        this._alertService.show({
            subHeader: 'Tem certeza que deseja excluir essa coleção?',
            buttons: [
                {
                    text: 'Não',
                    role: 'cancel'
                },
                {
                    text: 'Sim',
                    cssClass: 'danger',
                    handler: () => {
                        this.loading = true;
                        this._cardCollectionService.deleteCollection(collectionId)
                            .subscribe(() => {
                                this.collections = this.collections.filter(c => c.id != collectionId);
                                this._toastService.show('Coleção deletada com sucesso. 👀')
                                this.loading = false;
                            }, error => {
                                this._toastService.showHttpError(error);
                                this.loading = false;
                            });
                    }
                }
            ]
        });
    }

    public goToCard(nickname: string): void {
        this._navCtrl.navigateForward('/home/card', {
            queryParams: {
                userName: nickname
            }
        });
    }
}
