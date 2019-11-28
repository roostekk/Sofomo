import {Component} from '@angular/core';
import {Person} from './models/person';
import {DataService} from './services/data.service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {DateRange} from './models/dateRange';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  people$: Observable<Person[]>;

  dateRange: DateRange[] = [
    {
      min: 0,
      max: 20
    },
    {
      min: 20,
      max: 40
    },
    {
      min: 40,
      max: 60
    },
    {
      min: 60,
      max: 80
    },
    {
      min: 80,
      max: 100
    },
    {
      min: 100,
      max: null
    },
  ];

  constructor(
    private dataService: DataService
  ) {
    this.people$ = dataService.getPeople().pipe(
      map(item => {
        item.map(e => {
          e.mass = +e.mass;
          e.height = +e.height;
          e.birth_yearNo = +e.birth_year.replace('BBY', '');
        });
        item.sort((a, b) => a.birth_yearNo - b.birth_yearNo);
        return item;
      }),
    );
  }

  setBgColor(person: Person): string {
    const BMI = person.mass / Math.sqrt(person.height / 100);
    if (BMI < 16) {
      return 'blue';
    } else if (BMI >= 16 && BMI < 25) {
      return 'green';
    } else if (BMI >= 25 && BMI < 40) {
      return 'orange';
    } else if (BMI >= 40) {
      return 'red';
    }
  }
}
