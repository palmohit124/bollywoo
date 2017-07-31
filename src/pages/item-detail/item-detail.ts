import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Movies } from '../../providers/movies';
import { ModelData } from '../../providers/modelDataProvider';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  movieList: any;
  displayedMovie: any = {};
  errorMessage: String;

  constructor(public navCtrl: NavController, navParams: NavParams, private movies: Movies, private modelData: ModelData) {
    this.item = navParams.get('item');
  }

  ionViewWillEnter() {
    this.movieList = this.modelData.getMoviesModel();

    if(this.movieList) {
      this.selectRandomly()
    } else {
      this.movies.getMovies()
      .subscribe(
        data => {
          this.movieList = this.modelData.mapMoviesModel(data.data);
          this.selectRandomly()
        },
        err => {
          this.errorMessage='The list of movies could not be retrieved.'
        }
      );
    }
  }

  selectRandomly() {
    if(this.item.source == 'movies') {
      this.displayedMovie = this.item
    } else if(this.item.source == 'actors') {
      let list = [];
      this.movieList.forEach(movie => {
        let found = movie.cast.find(actor => actor.toLowerCase().trim() == this.item.name.toLowerCase().trim() )
        if(found) { list.push(movie) }
      } )
      let index = Math.floor(Math.random() * ((list.length-1) - 0 + 1)) + 0

      this.displayedMovie = list[index]

      if(list.length === 0) {
        this.errorMessage='Sorry, we could not find a movie for the selected actor.'
      }
    }
  }
}
