import {Pipe, PipeTransform} from '@angular/core';
import {Person} from "./models/person";

@Pipe({
  name: 'person'
})
export class PersonPipe implements PipeTransform {

  transform(people: Person[], filter: { minYear?: number, maxYear?: number }): Person[] {
    if (!filter.minYear && !filter.maxYear) {
      return people.filter(e => e.birth_year === 'unknown')
    } else if (filter.minYear && !filter.maxYear) {
      return people.filter(e => Number(e.birth_year) > filter.minYear)
    } else if ((filter.minYear || filter.minYear === 0) && filter.maxYear) {
      return people.filter(e =>
        Number(e.birth_year) > filter.minYear && Number(e.birth_year) < filter.maxYear
      )
    } else {
      return null;
    }
  }

}
