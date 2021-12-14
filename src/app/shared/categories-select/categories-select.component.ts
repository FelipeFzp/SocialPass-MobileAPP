import { Component, OnInit, Input, ChangeDetectorRef, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast.service';
import { CardCategoryWithRelated } from '../../models/api/card-category-with-related';
import { CardCategoryService } from '../../services/card-category.service';

@Component({
  selector: 'categories-select',
  templateUrl: './categories-select.component.html',
  styleUrls: ['./categories-select.component.scss']
})
export class CategoriesSelectComponent {
  @Input() maxCategories: number = 3;
  @Input() selectedCategoriesIds: string[];
  @Output() onSelectionChange = new EventEmitter<string[]>();

  public showCategoriesSearch: boolean = false;
  public allCategories: CardCategoryWithRelated[];
  public categories: CardCategoryWithRelated[];
  public reachLimit: boolean;
  public selectedCategories: CardCategoryWithRelated[];

  public loading: boolean = true;

  private MAX_CATEGORIES_PAGE = 5;

  constructor(
    private _apiCardCategoryService: CardCategoryService,
    private _toastService: ToastService
  ) {
    this._loadCategories();
  }

  private _loadCategories(): void {
    this._apiCardCategoryService.getAllWithRelated()
      .subscribe(categories => {
        this.allCategories = categories.map(p => p.childs).reduce((a, b) => a.concat(b));

        this.categories = this.allCategories.filter(c => !this.selectedCategoriesIds.includes(c.id))
          .slice(0, this.MAX_CATEGORIES_PAGE);

        this.loading = false;

        this.selectedCategories = this.allCategories.filter(p => this.selectedCategoriesIds.includes(p.id));
        this.reachLimit = this.selectedCategories?.length >= this.maxCategories;
      });
  }

  public onSearchChange(el: HTMLInputElement): void {
    const search = el.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (search?.length) {
      this.categories = this.allCategories.filter(c => !this.selectedCategories.map(p => p.id).includes(c.id) && c.name.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(search)).slice(0, this.MAX_CATEGORIES_PAGE);
      this.showCategoriesSearch = true;
    } else {
      this.showCategoriesSearch = false;
      this.categories = this.allCategories.slice(0, this.MAX_CATEGORIES_PAGE);
    }
  }

  public addCategory(categoryId: string): void {
    if (this.reachLimit) {
      this._toastService.show('Ops, você atingiu o limite de 3 categorias, remova alguma para continuar selecionando. ✨')
      return;
    }

    const categoryToAdd = this.allCategories.find(p => p.id == categoryId);

    this.selectedCategories.push(categoryToAdd);
    this.onSelectionChange.next(this.selectedCategories.map(p => p.id));
    this.reachLimit = this.selectedCategories?.length >= this.maxCategories;
  }

  public removeCategory(categoryId: string): void {
    this.selectedCategories = this.selectedCategories.filter(p => p.id != categoryId);
    this.onSelectionChange.next(this.selectedCategories.map(p => p.id));
    this.reachLimit = this.selectedCategories?.length >= this.maxCategories;
  }

  public onCategorySelect(categoryId: string): void {
    // TODO: add to selection array here
    // this.reachLimit = selectedValues?.length >= this.maxCategories;
    // this._onSelectionChange.next(selectedValues);
  }

  // public filterCategories(event: CustomEvent): void {
  //   this.categories = JSON.parse(JSON.stringify(this.allCategories))
  //     .map(p => {
  //       p.childs = p.childs.filter(p =>
  //         event.detail.value?.length > 0 ?
  //           p.name.toLowerCase().includes(event.detail.value.toLowerCase()) : true);
  //       return p;
  //     })
  //     .filter(p => p.childs?.length > 0);
  // }
}
