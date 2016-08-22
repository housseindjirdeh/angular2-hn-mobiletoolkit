import { Component } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HackerNewsAPIService } from '../services/hackernews-api.service';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  template: `
  <md-toolbar>
    <div id="header">
      <div class="left">
        <h1 class="name">
          <a routerLink="/news/1" routerLinkActive="active">Angular 2 HN</a>
        </h1>
        <span class="header-nav">
          <a routerLink="/newest/1" routerLinkActive="active">new</a>
          <span class="divider">
            |
          </span>
          <a routerLink="/show/1" routerLinkActive="active">show</a>
          <span class="divider">
            |
          </span>
          <a routerLink="/ask/1" routerLinkActive="active">ask</a>
          <span class="divider">
            |
          </span>
          <a routerLink="/jobs/1" routerLinkActive="active">jobs</a>
        </span>
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

    a {
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

    @media screen and (max-width: 700px) {
     .left {
        width: 100%;
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

    @media screen and (max-width: 700px) {
      .header-nav {
        float: right;
        margin-right: 20px;
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

    @media screen and (max-width: 700px) {
      .info {
        display: none;
      }
    }
  `],
  directives: [MdToolbar, ROUTER_DIRECTIVES]
})
export default class HeaderComponent {
  constructor(private _hackerNewsAPIService: HackerNewsAPIService) {}

  getStories(storyType: string) {
    this._hackerNewsAPIService.fetchStories(storyType); // load all item ids
  }
}
