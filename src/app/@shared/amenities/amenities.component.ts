import { Component, Input } from '@angular/core';

interface IUIAmenities {
  icon?: string;
  name: string;
  title?: string;
}

const icons = {
  garage: 'filter-icon-3',
  gym: 'filter-icon-24',
  dishwasher: 'filter-icon-16',
  prewar: 'filter-icon-8',
  elevator: 'filter-icon-9',
  pool: 'filter-icon-22',
  pets: 'filter-icon-20',
  outdoorspace: 'filter-icon-17',
  doorman: 'filter-icon-1',
  washerdryer: 'filter-icon-10',
  new_development: 'filter-icon-13',
};

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss'],
  standalone: false,
})
export class AmenitiesComponent {
  @Input()
  public list: string[];
  @Input()
  public newList: object;

  objectKeys = Object.keys;

  public get amenities(): IUIAmenities[] {
    return this.list.map<IUIAmenities>((item) => ({
      icon: this.getIconByName(item.split(' ').join('').toLowerCase()),
      name: item,
    }));
  }

  public get newAmenities(): any {
    return Object.keys(this.newList).reduce((acc, key: string) => {
      let value = (this.newList as any)[key];
      if (key === 'Pet Policy') {
        value = this.getPetsAllowed(value);
      }
      acc.push({
        title: key,
        name: typeof value !== 'boolean' ? value : undefined,
      });

      return acc;
    }, [] as any);
  }

  public getIconByName(name: string): string {
    // @ts-ignore
    return icons[name];
  }

  private getPetsAllowed(petsValues: string[]) {
    let petsAllowed = [] as any;
    petsValues.forEach((pet) => {
      switch (pet.trim()) {
        case 'BirdOK':
          petsAllowed.push('Birds are allowed.');
          break;
        case 'BreedRestrictions':
          petsAllowed.push('There are breed restrictions on allowed pets.');
          break;
        case 'BuildingCatsOK':
          petsAllowed.push('Building Cats OK');
          break;
        case 'BuildingDogsOK':
          petsAllowed.push('Building Dogs OK');
          break;
        case 'BuildingNo':
          petsAllowed.push('Building No');
          break;
        case 'BuildingSizeLimit':
          petsAllowed.push('Building Size Limit');
          break;
        case 'BuildingYes':
          petsAllowed.push('Building Yes');
          break;
        case 'Call':
          petsAllowed.push('Call to inquire about pet restrictions.');
          break;
        case 'CatsOK':
          petsAllowed.push('Cats are allowed.');
          break;
        case 'ChickensOK':
          petsAllowed.push('Chickens OK.');
          break;
        case 'Conditional':
          petsAllowed.push('Pets may be allowed under specific conditions.');
          break;
        case 'DogsOK':
          petsAllowed.push('Dogs are allowed.');
          break;
        case 'FishOK':
          petsAllowed.push('Fish are allowed');
          break;
        case 'Negotiable':
          petsAllowed.push('Pets are negotiable.');
          break;
        case 'No':
          petsAllowed.push('No pets are allowed.');
          break;
        case 'NoBreedRestrictions':
          petsAllowed.push('No Breed Restrictions');
          break;
        case 'NoDogs':
          petsAllowed.push('No Dogs.');
          break;
        case 'NoPetRestrictions':
          petsAllowed.push('No Pet Restrictions');
          break;
        case 'NoSizeLimit':
          petsAllowed.push('No Size Limit');
          break;
        case 'NumberLimit':
          petsAllowed.push('There is a limit on the number of pets allowed.');
          break;
        case 'Other':
          petsAllowed.push('Other');
          break;
        case 'OwnerOnly':
          petsAllowed.push('Owner Only');
          break;
        case 'PetDeposit':
          petsAllowed.push('Pet Deposit');
          break;
        case 'PetFee':
          petsAllowed.push('Pet Fee');
          break;
        case 'PetRestrictions':
          petsAllowed.push('The property has pet restrictions.');
          break;
        case 'ReptileOK':
          petsAllowed.push('Reptiles are allowed.');
          break;
        case 'SeeRemarks':
          petsAllowed.push('See Remarks');
          break;
        case 'SizeLimit':
          petsAllowed.push('There are size restrictions on allowed pets.');
          break;
        case 'Yes':
          petsAllowed.push('All pets are allowed.');
          break;
      }
    });
    return petsAllowed.join(',');
  }
}
