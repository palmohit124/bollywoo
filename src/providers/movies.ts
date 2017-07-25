import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Item } from '../models/item';

@Injectable()
export class Movies {

  movies: any;

  constructor(public http: Http) {

  }
  getMovies(): any{

        return this.http.get('assets/movies.json').map(res => res.json())

    }

    getActors(): any{

          return this.http.get('assets/actors.json').map(res => res.json())

      }
}
