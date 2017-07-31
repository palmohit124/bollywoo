import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemDetailPage } from '../item-detail/item-detail';
import { Movies } from '../../providers/movies';
import { ModelData } from '../../providers/modelDataProvider';


@Component({
  selector: 'page-actors',
  templateUrl: 'actors.html'
})

export class ActorsPage {

  currentItems: any = [];
  actorsList: any = [];
  actorsListFiltered: any = [];
  errorMessage: String = '';

  constructor(public navCtrl: NavController, public movies: Movies, private modelData: ModelData) { }

  ionViewDidLoad() {
    this.actorsList = this.modelData.getActorsModel();

    if(this.actorsList) {
      this.actorsList = this.modelData.getActorsModel();
      this.actorsListFiltered = JSON.parse(JSON.stringify(this.actorsList));
    } else {
      this.movies.getActors()
        .subscribe(
          data => {
            this.actorsList = this.modelData.mapActorsModel(data.data);
            this.actorsListFiltered = JSON.parse(JSON.stringify(this.actorsList));
          },
          err => {
            this.errorMessage = 'The actors list could not be retrieved.'            }
          );
    }
  }

  openItem(item) {
    item.source = 'actors';
    this.navCtrl.push(ItemDetailPage, {
      item: item,
    });
  }

  getActors(ev: any) {
    this.actorsListFiltered = JSON.parse(JSON.stringify(this.actorsList))
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.actorsListFiltered = this.actorsListFiltered.filter((actor) => {
        return (actor.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
