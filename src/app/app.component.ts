import { Component, ViewEncapsulation } from '@angular/core';
import { APP_SHELL_DIRECTIVES } from '@angular/app-shell';
import { ROUTER_DIRECTIVES } from '@angular/router';

import HeaderComponent from './header/header.component';
import LoadingHeaderComponent from './loading-header/loading-header.component';
import LoadingIndicatorComponent from './loading-indicator/loading-indicator.component';
import StoriesComponent from './stories/stories.component';
import FooterComponent from './footer/footer.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div id="wrapper">
      <app-loading-header *shellRender></app-loading-header>
      <app-header *shellNoRender></app-header>
      <app-loading-indicator *shellRender></app-loading-indicator>
      <router-outlet *shellNoRender></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    #wrapper {
      background-color: #f6f6ef;
      position: relative;
      width: 85%;
      min-height: 80px;
      margin: 0 auto;
      font-family: 'Open Sans', Verdana, sans-serif;
      font-size: 15px;
      height: 100%;
    }

    body {
      margin-bottom: 0;
    }

    @media screen and (max-width: 768px) {
      body {
        margin: 0;
      }

      #wrapper {
          width: 100%;
      }
    }
  `],
  directives: [
    APP_SHELL_DIRECTIVES,
    HeaderComponent, 
    LoadingHeaderComponent,
    LoadingIndicatorComponent, 
    StoriesComponent, 
    FooterComponent,
    ROUTER_DIRECTIVES
  ]
})

export class AppComponent {
  
}