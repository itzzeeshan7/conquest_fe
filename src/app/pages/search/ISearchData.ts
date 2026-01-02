export interface ISearchResponse {
  searchData: ISearchData[];
  minMaxPrice: IMinMaxPrice;
  totalResults: number;
}

export interface IMinMaxPrice {
  min: number;
  max: number;
}

export interface ISearchData {
  id: number;
  building_name: string;
  city: string;
  image_list: string[];
  listing_price_formatted: string;
  listing_price: number;
  address_with_unit: string;
  combined_latitude: number;
  combined_longitude: number;
  num_bedrooms: number;
  num_baths: number;
  sqft: number;
  place_name: string;
  region: string;
  list_date: Date;
  listing_price_per_sqft: number;
  monthly_payment: number;
  max_financing_pct: number;
  num_rooms: number;
  width: number;
  year_built: number;
  virtual_doorman: boolean;
  building_gym: boolean;
  building_garage: boolean;
  building_pool: boolean;
  building_elevator: boolean;
  building_pets: boolean;
  dishwasher: boolean;
  building_prewar: boolean;
  building_rooftop: boolean;
  has_fireplace: boolean;
  has_outdoor_space: boolean;
  building_laundry: boolean;
  new_development: boolean;
  created_at: Date;
  saved_data: boolean;
  date_created: Date;
  apartment: boolean;
  building: boolean;
  address: boolean;
  building_key: string;
  listing_key: string;
}
