import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Title }     from '@angular/platform-browser';

import ItemComponent from '../item/item.component';

import { HackerNewsAPIService } from '../services/hackernews-api.service';

export interface Item {
  id: number;
}

@Component({
  moduleId: module.id,
  selector: 'app-stories',
  template: `
  <div class="main-content">
    <p class="job-header" *ngIf="storiesType === 'jobs'">
      These are jobs at startups that were funded by Y Combinator. 
      You can also get a job at a YC startup through <a href="https://triplebyte.com/?ref=yc_jobs">Triplebyte</a>.
      </p>
    <ol [class.list-margin]="storiesType !== 'jobs'" start="{{ indexFrom + 1 }}">
      <li *ngFor="let item of items$ | async | slice:indexFrom:indexFrom + 30" class="post">
        <item class="item-block" itemID="{{ item }}"></item>
      </li>
    </ol>
    <div class="nav">
      <a routerLink="/{{ storiesType }}/{{ pageNum - 1 }}" *ngIf="indexFrom > 0" (click)="scrollTop()" class="prev">
        ‹ Prev
      </a>
      <a routerLink="/{{ storiesType }}/{{ pageNum + 1 }}" *ngIf="(items$ | async)?.length > indexFrom + 30" (click)="scrollTop()" class="more">
        More ›
      </a>
    <div>
    <router-outlet></router-outlet>
  </div>
   `,
  styles: [`
    a {
      color: #b92b27;
      text-decoration: none;
      font-weight: bold;
    }

    a:hover {
      text-decoration: underline;
    }

    ol {
      padding: 0 40px;
      margin: 0;
    }

    @media screen and (max-width: 768px) {
      ol {
        box-sizing: border-box;
        list-style: none;
        padding: 0 10px;
      }

      .list-margin {
        margin-top: 55px;
      }
    }

    li {
      position: relative;
      -webkit-transition: background-color .2s ease;
      transition: background-color .2s ease;
    }

    .main-content {
      position: relative;
      width: 100%;
      min-height: 100vh;
      -webkit-transition: opacity .2s ease;
      transition: opacity .2s ease;
      box-sizing: border-box;
      padding: 8px 0;
      z-index: 0;
    }

    .post {
      padding: 0 0 10px 5px;
      transition: background-color 0.2s ease;
    }

    @media screen and (max-width: 768px) {
      .post {
        padding: 10px 0 10px 5px;
        border-bottom: 1px solid #CECECB;
      }
    }

    .item-block {
      display: block;
    }

    .post .itemNum {
      color: #696969;
      position: absolute;
      width: 30px;
      text-align: right;
      left: 0;
      top: 4px;
    }

    .nav {
      padding: 10px 40px;
      margin-top: 10px;
      font-size: 17px;
    }

    .nav .prev {
      padding-right: 20px;
    }

    @media screen and (max-width: 768px) {
      .nav {
        margin: 20px 0;
        text-align: center;
        padding: 10px 40px;
      }
      
      .nav .prev {
        float: left;
        padding-right: 0;
      }

      .nav .more {
        float: right;
      }
    }

    .nav a {
      color: #B92B27;
      text-decoration: none;
    }

    .nav .divider {
      color: #B92B27;
      text-decoration: none;
    }

    .job-header {
      font-size: 15px;
      padding: 0 40px 10px;
    }

    @media screen and (max-width: 768px) {
      .job-header {
        padding: 60px 15px 25px 15px;
        border-bottom: 2px dotted #b92b27;
      }
    }
  `],
  directives: [ItemComponent, ROUTER_DIRECTIVES],
  providers: [Title]
})

export default class StoriesComponent {
  private sub: any;
  items$: Observable<Item[]>;
  indexFrom: number;
  storiesType: string;
  pageNum: number;

  constructor(
    private _hackerNewsAPIService: HackerNewsAPIService,
    private _router: Router,
    private route: ActivatedRoute,
    private titleService: Title) 
  {}

  ngOnInit() {
    let currentRoute = this._router.url;
    let title: string;
    
    this.items$ = this._hackerNewsAPIService.items$; // subscribe to entire collection

    if (currentRoute.includes('newest')) {
      this.storiesType = 'newest';
      this._hackerNewsAPIService.fetchStories('newstories');
    } else if (currentRoute.includes('show')) {
      this.storiesType = 'show';
      this._hackerNewsAPIService.fetchStories('showstories');
    } else if (currentRoute.includes('ask')) {
      this.storiesType = 'ask';
      this._hackerNewsAPIService.fetchStories('askstories');
    } else if (currentRoute.includes('jobs')) {
      this.storiesType = 'jobs';
      this._hackerNewsAPIService.fetchStories('jobstories');
    } else {
      this.storiesType = 'news';
      this._hackerNewsAPIService.fetchStories('topstories');
    }

    this.sub = this.route.params.subscribe(params => {
      this.pageNum = params['page'] ? +params['page'] : 1;
      this.indexFrom = ((this.pageNum - 1) * 30);
    });

    if (this.storiesType === 'newest') {
      title = "New Links | Angular 2 HN"
    } 
    else if (this.storiesType === 'news') {
      title = "Angular 2 HN"
    }
    else {
      title = this.capitalizeFirstLetter(this.storiesType) + ' | Angular 2 HN';
    }

    this.titleService.setTitle(title);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }
}