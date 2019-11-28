import {Pipe, PipeTransform} from '@angular/core';
import {Person} from './models/person';

@Pipe({
  name: 'person'
})
export class PersonPipe implements PipeTransform {

  transform(people: Person[], filter: { minYear: number | null, maxYear?: number }): Person[] {
    return people.filter(e =>
      (!filter.minYear && !filter.maxYear) ?
        e.birth_year === 'unknown' :
        e.birth_yearNo > filter.minYear && (filter.maxYear ? e.birth_yearNo <= filter.maxYear : true)
    );
  }
}
