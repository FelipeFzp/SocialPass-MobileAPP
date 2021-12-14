import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardCollection } from '../../models/api/card-collection';
import { CardCollectionService } from '../../services/card-collection.service';
import { ColoredTabsService } from '../../services/colored-tabs.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'card-collection-selector',
  templateUrl: './card-collection-selector.component.html',
  styleUrls: ['./card-collection-selector.component.scss'],
})
export class CardCollectionSelectorComponent implements OnInit {
  @Input() public cardId: string;

  public opened: boolean;
  public type: 'new' | 'list' = 'list';
  public collectionName: string;
  public collections: CardCollection[];

  public loading: boolean = false;

  constructor(
    private _tabsService: ColoredTabsService,
    private _toastService: ToastService,
    private _cardCollectionService: CardCollectionService) { }

  ngOnInit() { }

  public open(): void {
    this.opened = true;
    this._tabsService.toggleTabs(false);
    this.loadCollections();
  }

  public close(): void {
    this.opened = false;
    this._tabsService.toggleTabs(true);
    this.collections = undefined;
  }

  public loadCollections(): void {
    this.loading = true;
    this._cardCollectionService.getAvailableCollections()
      .subscribe(collections => {
        this.collections = collections;
        if (this.collections?.length > 0) {
          this.type = 'list';
        } else {
          this.type = 'new';
        }
        this.loading = false;
      }, error => {
        this._toastService.showHttpError(error);
        this.loading = false;
      });
  }

  public async saveCollection(): Promise<void> {
    this.loading = true;
    try {
      this._cardCollectionService.createCollection(this.collectionName)
        .subscribe(collection => {
          this.collections.push(collection);
          this.addToCollection(collection.id);
        }, error => {
          this._toastService.showHttpError(error);
          this.loading = false;
        })

    } catch (e) {
      this._toastService.showHttpError(e);
    }

    this.loading = false
  }

  public addToCollection(collectionId: string): void {
    this.loading = true;
    const collection = this.collections.find(p => p.id == collectionId);
    this._cardCollectionService.toggleCardIntoCollection(collectionId, this.cardId)
      .subscribe(() => {
        this.loading = false
        this._toastService.show(`Cartão ${collection.cardsIds?.includes(this.cardId) ? 'removido da' : 'salvo na'} lista ${collection.name} 👏.`);
        this.close();
      }, error => {
        this.loading = false
        this._toastService.showHttpError(error);
      });
  }
}
