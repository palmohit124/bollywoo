import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemDetailPage } from '../item-detail/item-detail';
import { Movies } from '../../providers/movies';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {

  currentItems: any = [];
  movieList: any = [];
  movieListFiltered: any = [];
  errorMessage: String;

  constructor(public navCtrl: NavController, public movies: Movies) { }

  ionViewDidLoad() {
    this.movies.getMovies()
      .subscribe(
        data => {
          this.movieList = data.data;
          this.movieListFiltered = data.data;
        },
        err => {
          this.errorMessage='The list of movies could not be retrieved.'
        }
      );
  }

  openItem(item) {
    item.source = 'movies';
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  getItems(ev: any) {
    this.movieListFiltered = JSON.parse(JSON.stringify(this.movieList))
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.movieListFiltered = this.movieListFiltered.filter((movie) => {
        return (movie.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
