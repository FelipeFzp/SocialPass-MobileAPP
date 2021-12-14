import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { IonInput, NavController } from '@ionic/angular';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TrendSearchAutocompleteResult } from 'src/app/models/api/trend-search-autocomplete-result';
import { AuthService } from 'src/app/services/auth.service';
import { Card } from '../../../../models/api/card';
import { SearchDefaultCategoriesList } from '../../../../models/api/search-default-categories-list';
import { User } from '../../../../models/api/user';
import { StorageService } from '../../../../services/storage.service';
import { TrendsService } from '../../../../services/trends.service';

enum DefaultCategories {
  topWeek = 'Top semanal',
  nearToYou = 'Perto de você',
  likeYou = 'Nas suas categorias',
  likeYourFollows = 'Siga também',
  recent = 'Visto por você'
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private readonly MAX_DATA_PER_PAGE = 50;
  private currentResultsPage = 0;

  public searchTagsChange = new Subject<string[]>();
  public searchTags: string[] = [];
  public searchValue: string;
  public loggedUser?: User;
  public selectedDefaultCategory: DefaultCategories;
  public defaultCategories = DefaultCategories;

  public searchResults: User[] = [];
  public loadingResults: boolean = false;
  public hasMore: boolean = true;

  public defaultCategoriesData: SearchDefaultCategoriesList;
  public showAutocomplete: boolean;
  public autocompletes: TrendSearchAutocompleteResult[];
  public autocompleteChange = new EventEmitter<string>();

  constructor(
    private _storageService: StorageService,
    private _authService: AuthService,
    public _navCtrl: NavController,
    private _trendsService: TrendsService) { }

  ngOnInit() {
    this._registerSearchListener();
    const loggedChangeSubscription = this._authService.onLoggedChange
      .subscribe(r => {
        loggedChangeSubscription.unsubscribe();
        this._loadLoggedUser();
        const loadResultsSubscription = this._loadResults()
          .subscribe(() => { loadResultsSubscription.unsubscribe() });
      })
  }

  ionViewDidEnter() {
    const loadResultsSubscription = this._loadResults()
      .subscribe(() => { loadResultsSubscription.unsubscribe(); });
    const loadDataSubscription = this._storageService.loadData()
      .subscribe(r => {
        this.loggedUser = r?.user;
        loadDataSubscription.unsubscribe();
      })
  }

  ionViewDidLeave() {
    this.searchResults = [];
    this.defaultCategoriesData = undefined;
  }

  public onAutocompleteClick(tagToAdd: string, searchInput: IonInput): void {
    this.searchTags.push(tagToAdd);
    this.searchTagsChange.next();
    this.autocompletes = [];
    this.showAutocomplete = false;
    searchInput.value = '';
  }

  private _loadAutocomplete(autocompleteTerms: string): Observable<void> {
    return new Observable(observer => {
      this._trendsService.getAutocompletes(autocompleteTerms)
        .subscribe(autocompletes => {
          this.autocompletes = autocompletes;
          observer.next();
          observer.complete();
          this.showAutocomplete = this.autocompletes?.length > 0;
        });
    });
  }

  private _loadLoggedUser(): void {
    const loadUserSubscription = this._storageService.loadData()
      .subscribe(r => {
        this.loggedUser = r?.user;
        loadUserSubscription.unsubscribe();
      })
  }

  private _registerSearchListener(): void {
    if (this.searchTagsChange.observers?.length <= 0) {
      this.searchTagsChange.subscribe(tags => {
        this.searchResults = [];
        this.currentResultsPage = 0;
        const loadResultsSubscription = this._loadResults()
          .subscribe(() => { loadResultsSubscription.unsubscribe(); });
      })
    }
    if (this.autocompleteChange.observers?.length <= 0) {
      this.autocompleteChange
        .pipe(debounceTime(200))
        .subscribe(autocompleteTerms => {
          if (autocompleteTerms?.length > 0) {
            const autocompleteSubscription = this._loadAutocomplete(autocompleteTerms)
              .subscribe(() => { autocompleteSubscription.unsubscribe(); });
          }
        })
    }
  }

  private _loadResults(): Observable<void> {
    return new Observable(observer => {
      this.loadingResults = true;
      if (this.selectedDefaultCategory) {
        const defaultCategoryId = Object.entries(DefaultCategories).find(e => e[1] == this.selectedDefaultCategory)[0]
        this._trendsService.searchWithDefaultCategory(defaultCategoryId, this.searchTags, this.currentResultsPage, this.MAX_DATA_PER_PAGE)
          .subscribe(users => {
            this.searchResults = this.searchResults.concat(users);
            this.loadingResults = false;
            this.hasMore = users.length >= this.MAX_DATA_PER_PAGE;

            observer.next();
            observer.complete();
          });
      }
      else if (this.searchTags?.length) {
        this._trendsService.search(this.searchTags, this.currentResultsPage, this.MAX_DATA_PER_PAGE)
          .subscribe(users => {
            this.searchResults = this.searchResults.concat(users);
            this.loadingResults = false;
            this.hasMore = users.length >= this.MAX_DATA_PER_PAGE;

            observer.next();
            observer.complete();
          });
      } else {
        this._trendsService.listDefaultCategories()
          .subscribe(defaultCategories => {
            this.defaultCategoriesData = defaultCategories;
            this.loadingResults = false;

            observer.next();
            observer.complete();
          });
      }
    })
  }

  public onSearchChange(event: Event): void {
    const input = (event.target as HTMLInputElement);
    this.searchValue = input.value;
    this.autocompleteChange.next(this.searchValue);
  }

  public addSearchTag(event: Event): void {
    const input = event.target as HTMLInputElement;
    const ENTER_KEY_CODE = "13";

    if (event['keyCode'] == ENTER_KEY_CODE) {
      this.showAutocomplete = false;
      if (this.searchValue?.length) {
        if (!this.searchTags.find(t => t == this.searchValue)) {
          this.searchTags.push(this.searchValue);
          this.searchTagsChange.next(this.searchTags);

          input.placeholder = "Digite para pesquisar"
        } else {
          input.placeholder = `Ops, você ja buscou por ${this.searchValue}`;
        }

        this.searchValue = "";
        input.value = "";
      }
    }
  }

  public onSearchTagClick(tag: string): void {
    this.searchTags = this.searchTags.filter(t => t != tag)
    this.searchTagsChange.next(this.searchTags);
  }

  public showLogin(): void {
    this._navCtrl.navigateForward('/login', {
      queryParams: {
        redirectRoute: '/home/card'
      }
    })
  }

  public onDefaultCategoryTagClick(): void {
    this.selectedDefaultCategory = undefined;
  }

  public selectDefaultCategory(defaultCategory: string): void {
    const defaultCategoryKey = Object.entries(DefaultCategories).find(e => e[1] == defaultCategory)[0];
    this.selectedDefaultCategory = DefaultCategories[defaultCategoryKey];

    this.searchResults = [];
    this.currentResultsPage = 0;
    this.searchTagsChange.next();
  }

  public loadMoreSearchResults(): void {
    this.loadingResults = true;
    this.currentResultsPage = this.currentResultsPage + 1;

    this._loadResults()
      .subscribe(() => {
        this.loadingResults = false;
      });
  }

  public onUserClick(nickname: string): void {
    this._navCtrl.navigateForward('/home/card', {
      queryParams: {
        userName: nickname
      }
    });
  }
}
