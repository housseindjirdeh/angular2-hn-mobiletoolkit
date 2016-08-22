import { Component } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';

@Component({
  moduleId: module.id,
  selector: 'app-loading-header',
  template: `
  <md-toolbar>
    <div id="header">
      <div class="left">
        <h1 class="name">
          <a href="/">Angular 2 HN</a>
        </h1>
      </div>
      <div class="info">
        Built with <a href="https://mobile.angular.io/" target="_blank">Angular Mobile Toolkit</a>
      </div>
    </div>
  </md-toolbar>
   `,
  styles: [`
   md-toolbar {
      background-color: rgb(177, 49, 56);
      color: #fff;
      padding: 6px;
      line-height: 18px;
      vertical-align: middle;
      position: relative;
      border-radius: 7px;
    }

    h1 {
      font-weight: bold;
      display: inline-block;
      vertical-align:middle;
      margin: 0;
      font-size: 16px;
    }

    h1 a {
      color: #fff;
      text-decoration: none;
    }

    .name {
      margin-right: 30px;
    }

    p {
      display: inline;
    }

    #header {
      position: absolute;
      width: inherit;
      height: 20px;
      left: 0;
      top: 28px;
    }

    .left {
      position: absolute;
      left: 10px;
      font-size: 16px;
    }

    .header-nav {
      display: inline-block;
      font-family: 'Open Sans', Verdana, sans-serif;
      color: #fff;
    }

    .info {
      position: absolute;
      right: 10px;
      font-size: 16px;
    }

    .info a {
      color: #fff;
      font-weight: bold;
      text-decoration: none;
    }

    @media screen and (max-width: 700px) {
      .info {
        display: none;
      }
    }
  `],
  directives: [MdToolbar]
})
export default class LoadingHeaderComponent {
  constructor() {}
}
