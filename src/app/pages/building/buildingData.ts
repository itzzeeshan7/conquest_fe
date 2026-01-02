import { IBreadcrumbs } from '../../@shared/breadcrumbs/IBreadcrumbs';
import { IUIBuildingCard } from '../../@shared/building-card/building-card.component';
import { IUIMapsPlace } from '../../@shared/maps/maps.component';
import { IBuildingAmenities } from './buildingAmenties';
import { IBudildingDetails } from './buildingDetails';

export interface IBuildingData {
  apartments: Object[];
  buildingAmenities: IBuildingAmenities | any;
  buildingDetails: IBudildingDetails;
  pointOfInterest: IUIMapsPlace[];
  subwayStations: IUIMapsPlace[];
  cityBike: IUIMapsPlace[];
  breadcrumbs: IBreadcrumbs;
  similarBuildings: IUIBuildingCard[];
}
