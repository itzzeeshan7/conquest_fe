import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { delay, switchMap, takeUntil } from 'rxjs/operators';
import { IButtonFilters, IPropertyFilter, IPropertyService, ISearchFilters } from '../ISearchFilters';
import { QueryFilter } from '../QueryFilter';

@Component({
  selector: 'app-search-filtres',
  templateUrl: './search-filtres.component.html',
  styleUrls: ['./search-filtres.component.scss'],
  standalone: false,
})
export class SearchFiltresComponent implements OnInit {
  private copyFilters: ISearchFilters;
  private bedsNum = [
    {
      value: 5,
      label: 'Studio',
    },
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4+',
    },
  ];
  private bathsNum = [
    {
      value: 1,
      label: '1+',
    },
    {
      value: 1.5,
      label: '1.5+',
    },
    {
      value: 2,
      label: '2+',
    },
    {
      value: 3,
      label: '3+',
    },
    {
      value: 4,
      label: '4+',
    },
  ];

  @Output()
  public hide = new EventEmitter();

  @Input()
  public filters: ISearchFilters;

  @Input()
  public filterByPrice: any;

  @Output()
  public propertyFiltersChange = new EventEmitter<IPropertyFilter>();

  @Output()
  public propertyServicesChange = new EventEmitter<IPropertyService>();

  @Output()
  public buttonServiceChange = new EventEmitter<IButtonFilters>();

  @Output()
  public resetFilters = new EventEmitter<boolean>();

  @Output()
  public priceFilterChange = new EventEmitter<any>();

  @Output()
  public bedsFilterChange = new EventEmitter<any>();

  @Output()
  public bathsFilterChange = new EventEmitter<any>();

  public filterByPriceMin: any;
  public filterByPriceMax: any;
  public filterByBedsMin: any;
  public filterByBedsMax: any;
  public filterByBathsMin: any;
  public filterByBathsMax: any;

  public bedsNumMin = [{ value: 0, label: 'No Min' }, ...this.bedsNum];
  public bedsNumMax = [{ value: 0, label: 'No Max' }, ...this.bedsNum];
  public bathsNumMin = [{ value: 0, label: 'No Min' }, ...this.bathsNum];
  public bathsNumMax = [{ value: 0, label: 'No Max' }, ...this.bathsNum];

  typing = new Subject();

  delayTyping = {
    getData: (item: any) => of(item).pipe(delay(1500)),
  };
  queryFilter: QueryFilter;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.copyFilters = JSON.parse(JSON.stringify(this.filters));
    this.route.queryParams.subscribe((params) => {
      this.queryFilter = params as QueryFilter;
      this.queryFilter = { ...this.queryFilter };
      this.updateData();
      if (this.queryFilter.salesOrRental === 'R') {
        this.filters.propertyFilters = this.filters.propertyFilters.filter(
          (property) => property.property !== 'monthlies',
        );
      }
    });
  }

  updateData() {
    this.filters.buttonFilters.sales = this.queryFilter.salesOrRental === 'S' ? true : false;
    this.filters.buttonFilters.rental = this.queryFilter.salesOrRental === 'R' ? true : false;
    if (this.queryFilter.propertyType) {
      this.queryFilter.propertyType.forEach((item) => {
        switch (item) {
          case '540':
            this.filters.buttonFilters.condo = true;
            break;
          case '550':
            this.filters.buttonFilters.coop = true;
            break;
          case '100':
            this.filters.buttonFilters.commercial = true;
            break;
          case '580':
            this.filters.buttonFilters.multi = true;
            break;
          case '560':
            this.filters.buttonFilters.single = true;
            break;
          case '530':
            this.filters.buttonFilters.condop = true;
            break;
        }
      });
    }
    this.filters.propertyFilters = this.filters.propertyFilters.map((value) => {
      switch (value.property) {
        case 'priceSqf':
          value.min = this.queryFilter.priceSqfFrom;
          value.max = this.queryFilter.priceSqfTo;
          break;
        case 'monthlies':
          value.min = this.queryFilter.monthliesFrom;
          value.max = this.queryFilter.monthliesTo;
          break;
        case 'totalRooms':
          value.min = this.queryFilter.totalRoomsFrom;
          value.max = this.queryFilter.totalRoomsTo;
          break;
        case 'sqft':
          value.min = this.queryFilter.sqftFrom;
          value.max = this.queryFilter.sqftTo;
          break;
        case 'yearBuilt':
          value.min = this.queryFilter.yearBuiltFrom;
          value.max = this.queryFilter.yearBuiltTo;
          break;
      }
      return value;
    });
    this.filters.propertyServices = this.filters.propertyServices.map((value) => {
      // @ts-ignore
      if (typeof this.queryFilter[value.property] === 'undefined') {
        return value;
      }
      // @ts-ignore
      value.value = this.queryFilter[value.property].toLocaleLowerCase() === 'true' || false;

      return value;
    });

    if (this.queryFilter.priceTo) {
      this.filterByPriceMax = +this.queryFilter.priceTo;
    } else {
      this.filterByPriceMax = 0;
    }

    if (this.queryFilter.priceFrom) {
      this.filterByPriceMin = +this.queryFilter.priceFrom;
    } else {
      this.filterByPriceMin = 0;
    }

    if (this.queryFilter.bedroomsFrom) {
      if (this.queryFilter.bedroomsTo == 0) {
        this.filterByBedsMin = 5;
      } else {
        this.filterByBedsMin = +this.queryFilter.bedroomsFrom;
      }
    } else {
      this.filterByBedsMin = 0;
    }

    if (this.queryFilter.bedroomsTo) {
      if (this.queryFilter.bedroomsTo == 0) {
        this.filterByBedsMax = 5;
      } else {
        this.filterByBedsMax = +this.queryFilter.bedroomsTo;
      }
    } else {
      this.filterByBedsMax = 0;
    }

    if (this.queryFilter.bathroomsFrom) {
      this.filterByBathsMin = +this.queryFilter.bathroomsFrom;
    } else {
      this.filterByBathsMin = 0;
    }

    if (this.queryFilter.bathroomsTo) {
      this.filterByBathsMax = +this.queryFilter.bathroomsTo;
    } else {
      this.filterByBathsMax = 0;
    }
  }

  onChangePropertyFilter(items: IPropertyFilter[]) {
    this.typing.next(true);
    this.delayTyping
      .getData(items)
      .pipe(takeUntil(this.typing))
      .subscribe((res) => this.propertyFiltersChange.emit(res));
  }

  onChangePropertyService(items: IPropertyService[]) {
    this.typing.next(true);
    this.delayTyping
      .getData(items)
      .pipe(takeUntil(this.typing))
      .subscribe((res) => this.propertyServicesChange.emit(res));
  }

  onChangeFilterByPrice(from: any, to: any, reload: boolean) {
    if (!reload) {
      this.priceFilterChange.emit({ from, to, reload });
    }
    if (!from) {
      this.filterByPriceMin = 0;
    }
    if (!to) {
      this.filterByPriceMax = 0;
    }
    this.typing.next(true);
    this.delayTyping
      .getData({ from, to, reload })
      .pipe(takeUntil(this.typing))
      .subscribe((res) => this.priceFilterChange.emit(res));
  }

  onChangeFilterByBeds(from: any, to: any) {
    if (!from) {
      this.filterByBedsMin = 0;
    }
    if (!to) {
      this.filterByBedsMax = 0;
    }
    this.typing.next(true);
    this.delayTyping
      .getData({ from, to, bedrooms: true })
      .pipe(takeUntil(this.typing))
      .subscribe((res) => this.bathsFilterChange.emit(res));
  }

  onChangeFilterByBaths(from: any, to: any) {
    if (!from) {
      this.filterByBathsMin = 0;
    }
    if (!to) {
      this.filterByBathsMax = 0;
    }
    this.typing.next(true);
    this.delayTyping
      .getData({ from, to, bedrooms: false })
      .pipe(takeUntil(this.typing))
      .subscribe((res) => this.bathsFilterChange.emit(res));
  }

  reset() {
    this.filters = { ...this.copyFilters };
    this.filterByBathsMin = 0;
    this.filterByBathsMax = 0;
    this.filterByBedsMin = 0;
    this.filterByBedsMax = 0;
    this.filterByPriceMin = 0;
    this.filterByPriceMax = 0;
    this.onChangeFilterByPrice(0, 0, false);
    this.resetFilters.emit(true);
  }

  removeChecked(index: number, newValue: boolean) {
    if (this.filters.propertyServices[index].value === newValue) {
      this.filters.propertyServices[index].value = null;
      this.onChangePropertyService(this.filters.propertyServices);
    }
  }
  updateSalesRentals(salesRental: string) {
    if (salesRental === 'sales') {
      this.filters.buttonFilters.sales = !this.filters.buttonFilters.sales;
      this.filters.buttonFilters.rental = !this.filters.buttonFilters.sales;
      const indexOfMontlies = this.filters.propertyFilters.findIndex((property) => property.property === 'monthlies');
      if (indexOfMontlies === -1) {
        this.filters.propertyFilters.push({
          property: 'monthlies',
          min: null as number,
          max: null as number,
          name: 'Monthlies',
          step: 500,
        });
      }
    } else {
      this.filters.buttonFilters.rental = !this.filters.buttonFilters.rental;
      this.filters.buttonFilters.sales = !this.filters.buttonFilters.rental;
      this.filters.propertyFilters = this.filters.propertyFilters.filter(
        (property) => property.property !== 'monthlies',
      );
    }
    this.typing.next(true);
    this.delayTyping
      .getData(this.filters.buttonFilters)
      .pipe(takeUntil(this.typing))
      .subscribe((res) => this.buttonServiceChange.emit(res));
  }

  updateProperty(property: string) {
    // @ts-ignore
    this.filters.buttonFilters[property] = !this.filters.buttonFilters[property];
    this.typing.next(true);
    this.delayTyping
      .getData(this.filters.buttonFilters)
      .pipe(takeUntil(this.typing))
      .subscribe((res) => this.buttonServiceChange.emit(res));
  }
}
