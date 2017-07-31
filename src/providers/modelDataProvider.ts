import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ModelData {
  constructor() {}
  mapMoviesModel(data) {
    let movieList = [];
    data.forEach((movie) => {
      let movieDetails = {
        "title": movie.title,
        "coverPic": movie.profilePic,
        "cast": movie.cast,
        "description": movie.description
      }

      movieList.push(movieDetails)
    })
    localStorage.setItem('movieList', JSON.stringify(movieList))
    return movieList;
  }

  mapActorsModel(data) {
    let actorList = [];
    data.forEach((actor) => {
      let actorDetails = {
        "name": actor.name,
        "profilePic": actor.profilePic
      }

      actorList.push(actorDetails)
    })
    localStorage.setItem('actorList', JSON.stringify(actorList))
    return actorList;
  }

  getMoviesModel() {
    let movieList = JSON.parse(localStorage.getItem('movieList'));
    if(movieList) {
      return movieList
    }
  }

  getActorsModel() {
    let actorList = JSON.parse(localStorage.getItem('actorList'));
    if(actorList) {
      return actorList
    }
  }
}
