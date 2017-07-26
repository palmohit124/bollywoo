import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirstRunPage } from '../pages/pages';
import { SearchPage } from '../pages/search/search';
import { HomePage } from '../pages/home/home';
import { ActorsPage } from '../pages/actors/actors';

import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage = FirstRunPage;
  activePage: any;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    {title: 'Home', component: HomePage},
    {title: 'Movies', component: SearchPage},
    {title: 'Actors', component: ActorsPage}
  ]

  constructor(private translate: TranslateService, private platform: Platform,
    private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen,
    public menu: MenuController) {
    this.initTranslate();
    this.activePage = this.pages[0];
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initTranslate() {
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en');
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  closeMenu() {
    this.menu.close()
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  checkActive(page) {
    return page == this.activePage
  }
}
