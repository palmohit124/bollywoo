import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Movies } from '../../providers/movies';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  movieList: any;
  displayedMovie: any = {};

  constructor(public navCtrl: NavController, navParams: NavParams, private movies: Movies) {
    this.item = navParams.get('item');
  }

  ionViewWillEnter() {
    this.movies.getMovies().subscribe(data => {
        this.movieList = data.data;
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
        }
    });
  }
}
