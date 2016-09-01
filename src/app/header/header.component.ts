import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HackerNewsAPIService } from '../services/hackernews-api.service';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  template: `
  <header>
    <div id="header">
      <a class="home-link" routerLink="/news/1" routerLinkActive="active" (click)="scrollTop()">
        <img class="logo" src="/assets/images/angular2-hn.png">
      </a>
      <div class="header-text">
        <div class="left">
          <h1 class="name">
            <a routerLink="/news/1" routerLinkActive="active" (click)="scrollTop()" class="app-title">Angular 2 HN</a>
          </h1>
          <span class="header-nav">
            <a routerLink="/newest/1" routerLinkActive="active" (click)="scrollTop()">new</a>
            <span class="divider">
              |
            </span>
            <a routerLink="/show/1" routerLinkActive="active" (click)="scrollTop()">show</a>
            <span class="divider">
              |
            </span>
            <a routerLink="/ask/1" routerLinkActive="active" (click)="scrollTop()">ask</a>
            <span class="divider">
              |
            </span>
            <a routerLink="/jobs/1" routerLinkActive="active" (click)="scrollTop()">jobs</a>
          </span>
        </div>
        <div class="info">
          Built with <a href="https://mobile.angular.io/" target="_blank">Angular Mobile Toolkit</a>
        </div>
      </div>
    </div>
  </header>
   `,
  styles: [`
    .home-link {
      width: 50px;
      height: 66px;
    }

    .logo {
      width: 50px;
      padding: 3px 8px 0;
    }

    @media screen and (max-width: 768px) {
      .logo {
        width: 45px;
        padding: 0 0 0 10px;
      }

      .app-title {
        display: none;
      }
    }

    #header {
      background-color: #b92b27;
      color: #fff;
      padding: 6px 0;
      line-height: 18px;
      vertical-align: middle;
      position: relative;
      border-radius: 7px;
      z-index: 1;
      width: 100%;
    }

    @media screen and (max-width: 768px) {
      #header {
        height: 50px;
        border-radius: 0;
        position: fixed;
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
      margin-bottom: 2px;
    }

    a {
      display: inline;
    }

    .header-text {
      position: absolute;
      width: inherit;
      height: 20px;
      left: 10px;
      top: 25px;
    }

    @media screen and (max-width: 768px) {
     .header-text {
        top: 22px;
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
        left: 0;
      }
    }

    .header-nav {
      display: inline-block;
    }

    .header-nav a {
      color: #fff;
      text-decoration: none;
    }

    .header-nav a:hover {;
      font-weight: bold;
    }

    @media screen and (max-width: 768px) {
      .header-nav {
        float: right;
        margin-right: 20px;
      }
    }

    .info {
      position: absolute;
      right: 20px;
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
  directives: [ROUTER_DIRECTIVES]
})
export default class HeaderComponent {
  constructor(private _hackerNewsAPIService: HackerNewsAPIService) {}

  getStories(storyType: string) {
    this._hackerNewsAPIService.fetchStories(storyType); // load all item ids
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }
}
