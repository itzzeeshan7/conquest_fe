export interface IPropertyFilter {
  property: string;
  min: number;
  max: number;
  name: string;
  step: number;
  sup?: string;
}

export interface IPropertyService {
  property: string;
  name: string;
  value: boolean;
}

export interface ISearchFilters {
  propertyFilters: IPropertyFilter[];
  propertyServices: IPropertyService[];
  buttonFilters: IButtonFilters;
}

export interface IButtonFilters {
  sales: boolean;
  rental: boolean;
  condo: boolean;
  coop: boolean;
  condop: boolean;
  single: boolean;
  multi: boolean;
  commercial: boolean;
}
