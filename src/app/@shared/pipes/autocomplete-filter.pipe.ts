import { Pipe, PipeTransform } from '@angular/core';
import { IAutocomplete } from '../autocomplete/IAutocomplete';

@Pipe({
  name: 'autocompleteFilter',
  standalone: false,
})
export class AutocompleteFilterPipe implements PipeTransform {
  transform(items: IAutocomplete[], filter: string): IAutocomplete[] {
    if (!items) {
      return;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: IAutocomplete) => item.type === filter);
  }
}
