import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { FromUnixPipe, TimeAgoPipe } from 'angular2-moment/src';
import { Title } from '@angular/platform-browser';

import CommentTreeComponent from '../comment-tree/comment-tree.component';

import { HackerNewsAPIService } from '../services/hackernews-api.service';

export interface Item {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: Date;
  title: string;
  type: string;
  url: string;
}

@Component({
  moduleId: module.id,
  selector: 'app-item-comments',
  template: `
  <div *ngIf="item$" class="item">
    <div [class.item-header]="item$.descendants !== 0 && item$.type !== 'job'" [class.head-margin]="item$.text">
      <p *ngIf="item$.url">
        <a class="title" href="{{item$.url}}">
        {{item$.title}}
        </a>
        <span class="domain">{{shortenDomain(item$.url)}}</span>
      </p>
      <p *ngIf="!item$.url">
        <a class="title" [routerLink]="['/item', item$.id]" routerLinkActive="active">
        {{item$.title}}
        </a>
        <span class="domain">{{shortenDomain(item$.url)}}</span>
      </p>
      <div class="subtext-laptop">
        <span *ngIf="item$.type !== 'job'">
        {{item$.score}} points by 
          <a [routerLink]="['/user', item$.by]" routerLinkActive="active">{{item$.by}}</a>
        </span> 
        <span [class.item-details]="item$.type !== 'job'">
          {{ (item$.time | amFromUnix) | amTimeAgo }}
          <span *ngIf="item$.type !== 'job'"> |
            <a [routerLink]="['/item', item$.id]" routerLinkActive="active">
              <span *ngIf="item$.descendants !== 0">
                {{item$.descendants}}
                <span *ngIf="item$.descendants === 1">comment</span>
                <span *ngIf="item$.descendants > 1">comments</span>
              </span>
              <span *ngIf="item$.descendants === 0">discuss</span>
            </a>
          </span>
        </span> 
      </div>
      <div class="subtext-palm">
        <div class="details" *ngIf="item$.type !== 'job'">
          <span class="name"> <a [routerLink]="['/user', item$.by]" routerLinkActive="active">{{item$.by}}</a></span>
          <span class="right">{{item$.score}} ★</span>
        </div>
        <div class="details">
          {{ (item$.time | amFromUnix) | amTimeAgo }}
          <span *ngIf="item$.type !== 'job'"> • 
            <a [routerLink]="['/item', item$.id]" routerLinkActive="active">
              <span *ngIf="item$.descendants !== 0">
                {{item$.descendants}}
                <span *ngIf="item$.descendants === 1">comment</span>
                <span *ngIf="item$.descendants > 1">comments</span>
              </span>
              <span *ngIf="item$.descendants === 0">discuss</span>
            </a>
          </span>
        </div>
      </div>
    </div>
    <p [innerHTML]="item$.text"></p>
    <app-comment-tree itemKids="{{ item$.kids }}" itemCount="{{ item$.descendants }}"></app-comment-tree>
  </div>
  `,
  pipes: [FromUnixPipe, TimeAgoPipe],
  providers: [HackerNewsAPIService, Title],
  styles: [`
    .item {
      box-sizing: border-box;
      padding: 10px 40px 0 40px;
      z-index: 0;
    }

    @media screen and (max-width: 1024px) {
      .item {
        padding: 10px 20px 0 40px;
      }
    }

    @media screen and (max-width: 768px) {
      .item {
        box-sizing: border-box;
        padding: 75px 15px 0 15px;
      }
    }

    .head-margin {
      margin-bottom: 15px;
    }

    p {
      margin: 2px 0;
    }

    a {
      color: #000;
      cursor: pointer;
      text-decoration: none;
    }

    .title {
      font-size: 16px;
    }

    .subtext-laptop {
      font-size: 12px;
    }

    .subtext-palm {
      font-size: 13px;
    }

    .domain,
    .subtext-laptop, .subtext-palm {
      color: #696969;
      font-weight: bold;
      letter-spacing: 0.5px;
    }

    .domain a,
    .subtext-laptop a,
    .subtext-palm a {
      color: #b92b27;
    }

    .subtext-laptop a:hover,
    .subtext-palm a:hover {
      text-decoration: underline;
    }

    .subtext-palm .details {
      margin-top: 5px;
    }

    .subtext-palm .details .right {
      float: right;
    }

    @media screen and (max-width: 768px) {
      .subtext-laptop {
        display: none;
      }
    }

    @media screen and (min-width: 769px) {
      .subtext-palm {
        display: none;
      }
    }

    .item-details {
      padding: 10px;
    }

    .long {
      margin: 18px 20px 0;
      width: 20%;
    }

    .short {
      margin: 8px 20px;
      width: 10%;
    }

    .item-header {
      border-bottom: 2px solid #b92b27;
      padding-bottom: 10px;
    }
  `],
  directives: [CommentTreeComponent, ROUTER_DIRECTIVES]
})
export default class ItemCommentsComponent implements OnInit {
  private sub: any;
  item$: Observable<Item>; 

  constructor(
    private _hackerNewsAPIService: HackerNewsAPIService,
    private route: ActivatedRoute,
    private titleService: Title) 
  {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let itemID = +params['id']; // (+) converts string 'id' to a number
      this._hackerNewsAPIService.fetchItem(itemID).subscribe(data => {
        this.item$ = data;
        this.titleService.setTitle(data.title + ' | Angular 2 HN');
      }, error => console.log('Could not load item'));
    });
  }

  shortenDomain(url) {
    // Should use a pipe for this, but pipes seem to break the App Shell :(
    if (url) {
      var domain = '(' + url.split('/')[2] + ')';
      return domain ? domain.replace('www.', '') : '';
    }
  }
}
