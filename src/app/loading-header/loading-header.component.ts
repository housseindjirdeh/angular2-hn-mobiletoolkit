import { Component } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';

@Component({
  moduleId: module.id,
  selector: 'app-loading-header',
  template: `
  <md-toolbar>
    <div id="header">
      <img class="logo" src="https://raw.githubusercontent.com/hdjirdeh/angular2-hackernews/master/public/assets/images/angular2-hn.png">
      <div class="header-text">
        <div class="left">
          <h1 class="name">
            <a href="/">Angular 2 HN</a>
          </h1>
        </div>
        <div class="info">
          Built with <a href="https://mobile.angular.io/" target="_blank">Angular Mobile Toolkit</a>
        </div>
      </div>
    </div>
  </md-toolbar>
   `,
  styles: [`
      .logo {
      width: 50px;
    }

    @media screen and (max-width: 768px) {
      .logo {
        display: none;
      }
    }

    md-toolbar {
      background-color: rgb(177, 49, 56);
      color: #fff;
      padding: 6px;
      line-height: 18px;
      vertical-align: middle;
      position: relative;
      border-radius: 7px;
    }

    @media screen and (max-width: 768px) {
      md-toolbar {
        background-color: rgb(177, 49, 56);
        color: #fff;
        padding: 6px;
        height: 34px;
        border-radius: 0;
        line-height: 18px;
        vertical-align: middle;
        position: fixed;
        width: 100%;
      }
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
      width: inherit;
    }

    .header-text {
      position: absolute;
      width: inherit;
      height: 20px;
      left: 0;
      top: 28px;
    }

    @media screen and (max-width: 768px) {
     .header-text {
        top: 23px;
      }
    }

    .left {
      position: absolute;
      left: 60px;
      font-size: 16px;
    }

    @media screen and (max-width: 768px) {
     .left {
        width: 100%;
        left: 10px;
      }
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

    @media screen and (max-width: 768px) {
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
