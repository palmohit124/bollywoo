import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Movies {

  constructor(public http: Http) {}

  getMovies(): any {
    return this.http.get('assets/movies.json').map(res => res.json())
  }

  getActors(): any {
    return this.http.get('assets/actors.json').map(res => res.json())
  }
}
