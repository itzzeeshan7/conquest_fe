export interface IBuildingAmenities {
  building_id: number;
  building_bike_storage: boolean;
  building_doorman: boolean;
  building_elevator: boolean;
  building_garage: boolean;
  building_gym: boolean;
  building_laundry: boolean;
  building_pets: boolean;
  building_pool: boolean;
  building_prewar: boolean;
  building_rooftop: boolean;
  building_storage: boolean;
  new_development: boolean;
}

export class BuildingAmenities implements IBuildingAmenities {
  building_id: number;
  building_bike_storage: boolean;
  building_doorman: boolean;
  building_elevator: boolean;
  building_garage: boolean;
  building_gym: boolean;
  building_laundry: boolean;
  building_pets: boolean;
  building_pool: boolean;
  building_prewar: boolean;
  building_rooftop: boolean;
  building_storage: boolean;
  new_development: boolean;
}
