import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { IQueryFilter, QueryFilter } from '../../pages/search/QueryFilter';
import { IAutocomplete } from './IAutocomplete';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  standalone: false,
})
export class AutocompleteComponent implements OnChanges, OnInit {
  @Input()
  public query: string = '';

  @Output()
  public handleSelect = new EventEmitter<IAutocomplete>();

  @Input()
  public searchType: string;
  public loading: boolean = false;

  private hidden: boolean;

  autocomplete: IAutocomplete[] = [];
  previousSearch: IAutocomplete[] = [];

  headers: any;

  clicked: boolean = false;

  public queryFilter: IQueryFilter;

  private serverUrl = environment.serverUrl;

  constructor(
    private readonly eRef: ElementRef,
    private http: HttpClient,
    private readonly route: ActivatedRoute,
  ) {
    this.route?.queryParams?.subscribe((params) => {
      this.queryFilter = params as QueryFilter;
      this.queryFilter = { ...this.queryFilter };
    });
    let previousSearchLocal = JSON.parse(sessionStorage.getItem('previousSearch'));
    if (previousSearchLocal) {
      this.previousSearch = [...Object.values(previousSearchLocal)] as IAutocomplete[];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { query = null } = changes;
    if (!query) return;
    if (query.currentValue) {
      this.hidden = false;
    }
    if (query?.currentValue && query?.currentValue?.length > 3) {
      this.loading = true;
      this.previousSearch = [];
      this.autocomplete = [];
      const search = encodeURI(query.currentValue);
      const saleOrRental = this.searchType ? this.searchType : this.queryFilter.salesOrRental;
      this.http
        .get(`${this.serverUrl}/listings/autosugestion?saleOrRental=${saleOrRental}&search=${search.toLowerCase()}`)
        .subscribe((data: IAutocomplete[]) => {
          this.loading = false;
          this.autocomplete = data;
          this.headers = [...new Set(this.autocomplete.map((el) => el.type))];
        });
    }
    if (!query.currentValue && !query.firstChange) {
      this.autocomplete = [];
      this.getPreviousSearchesFromLocalStorage();
    }
  }

  ngOnInit(): void {
    this.hidden = true;
  }

  public get show(): boolean {
    return !this.hidden && (this.query?.length || this.previousSearch?.length) ? true : false;
  }

  public select(item: IAutocomplete): void {
    item.sale_or_rental = this.searchType;
    let previousSearchLocal = JSON.parse(sessionStorage.getItem('previousSearch'));

    if (previousSearchLocal) {
      previousSearchLocal[
        `${item.type}_${item.address || item.building_name || item.city || item.place_name || item.region || item.zip}`
      ] = item;
    } else {
      const key = `${item.type}_${
        item.address || item.building_name || item.city || item.place_name || item.region || item.zip
      }`;
      previousSearchLocal = {};
      previousSearchLocal[key] = item;
    }

    sessionStorage.setItem('previousSearch', JSON.stringify(previousSearchLocal));
    this.handleSelect.emit(item);
    this.hide();
  }

  @HostListener('document:click', ['$event'])
  public clickOut($event: any) {
    if (!this.eRef.nativeElement.contains($event.target)) {
      this.hide();
    } else {
      if ($event.target.nodeName === 'INPUT') {
        this.clicked = true;
        this.hidden = false;
        if (this.autocomplete.length === 0) {
          let previousSearchLocal = JSON.parse(sessionStorage.getItem('previousSearch'));
          if (previousSearchLocal) {
            this.previousSearch = [...Object.values(previousSearchLocal)] as IAutocomplete[];
            this.headers = [...new Set(this.previousSearch.map((el) => el.type))];
          } else {
            this.previousSearch = [];
            this.hidden = !!this.query;
          }
        }
      }
    }
  }

  private getPreviousSearchesFromLocalStorage() {
    let previousSearchLocal = JSON.parse(sessionStorage.getItem('previousSearch'));
    if (previousSearchLocal) {
      this.previousSearch = [...Object.values(previousSearchLocal)] as IAutocomplete[];
      this.headers = [...new Set(this.previousSearch.map((el) => el.type))];
    } else {
      this.previousSearch = [];
      this.hidden = !!this.query;
    }
  }

  private hide(): void {
    setTimeout(() => {
      this.hidden = true;
    });
  }
}
