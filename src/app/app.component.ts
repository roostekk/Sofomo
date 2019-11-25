import {Component} from '@angular/core';
import {Person} from "./models/person";
import {DataService} from "./services/data.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  people: Person[];

  constructor(
    private dataService: DataService
  ) {
    dataService.getPeople().subscribe(r => {
      this.people = r['results'];
      this.people.forEach(e =>
        e.birth_year = e.birth_year.replace('BBY', '')
      );
      this.people.sort((a, b) => Number(a.birth_year) - Number(b.birth_year));
    });
  }

  setBgColor(person: Person): Object {
    const BMI = Number(person.mass) / Math.sqrt(Number(person.height) / 100);
    if (BMI < 16) {
      return {'background-color': 'black'}
    } else if (BMI >= 16 && BMI < 25) {
      return {'background-color': 'green'}
    } else if (BMI >= 25 && BMI < 40) {
      return {'background-color': 'orange'}
    } else if (BMI >= 40) {
      return {'background-color': 'red'}
    }
  }
}
