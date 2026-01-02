export interface IAutocomplete {
  type: string;
  place_name: string;
  region: string;
  address: string;
  building_name: string;
  sale_or_rental: string;
  zip: string;
  city: string;
  building_key: string | number;
  apartment_key: string | number;
}
