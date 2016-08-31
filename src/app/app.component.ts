import { Component, ApplicationRef, ViewEncapsulation } from '@angular/core';
import { APP_SHELL_DIRECTIVES } from '@angular/app-shell';
import { Router, NavigationEnd, ROUTER_DIRECTIVES } from '@angular/router';

import HeaderComponent from './header/header.component';
import LoadingScreenComponent from './loading-screen/loading-screen.component';
import StoriesComponent from './stories/stories.component';
import FooterComponent from './footer/footer.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `
    <app-loading-screen *shellRender></app-loading-screen>
    <div id="wrapper" *shellNoRender>
      <app-header></app-header>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    #wrapper {
      background-color: #F6F6EF;
      position: relative;
      width: 85%;
      min-height: 80px;
      margin: 0 auto;
      font-family: 'Open Sans', sans-serif;
      font-size: 15px;
      height: 100%;
    }

    body {
      margin-bottom: 0;
    }

    @media screen and (max-width: 768px) {
      body {
        margin: 0;
        background-color: #fff;
      }

      #wrapper {
          width: 100%;
          background-color: #fff;
      }
    }
  `],
  directives: [
    APP_SHELL_DIRECTIVES,
    HeaderComponent, 
    LoadingScreenComponent,
    StoriesComponent, 
    FooterComponent,
    ROUTER_DIRECTIVES
  ]
})

export class AppComponent {
  // Workaround for iOS to fire onInit on browser back/forward routing
  constructor(private _applicationRef: ApplicationRef, private _router: Router) {
        if(this.isMac()) {
            _router.events.subscribe(ev => {
                if(ev instanceof NavigationEnd) {
                    setTimeout(() => {
                        _applicationRef.zone.run(() => _applicationRef.tick())
                    }, 500)
                }
            })
        }
    }

  isMac() {
      if(navigator.userAgent.indexOf('Mac') > -1) {
          return true
      }
      return false
  }
}