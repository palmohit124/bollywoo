import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { ActorsPage } from '../actors/actors';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  redirectToMovies() {
    this.navCtrl.push(SearchPage), {}, {
      animate: true,
      direction: 'forward'
    };
  }

  redirectToActors() {
    this.navCtrl.push(ActorsPage), {}, {
      animate: true,
      direction: 'forward'
    };
  }
}
