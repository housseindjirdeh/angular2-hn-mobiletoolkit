import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { FromUnixPipe, TimeAgoPipe } from 'angular2-moment/src';
import { Title } from '@angular/platform-browser';

import CommentTreeComponent from '../comment-tree/comment-tree.component';

import { Item } from '../interfaces/item';
import { HackerNewsAPIService } from '../services/hackernews-api.service';

@Component({
  moduleId: module.id,
  selector: 'app-item-comments',
  template: `
  <div *ngIf="item$" class="item">
    <div class="mobile" [class.item-header]="item$.descendants !== 0 && item$.type !== 'job'" [class.head-margin]="item$.text">
      <p class="title-block">
        <span class="back-button" (click)="goBack()">
          ↶
        </span>
        <a *ngIf="item$.url" class="title" href="{{item$.url}}">
          {{item$.title}}
        </a>
        <a *ngIf="!item$.url" class="title" [routerLink]="['/item', item$.id]" routerLinkActive="active">
          {{item$.title}}
        </a>
      </p>
    </div>
    <div class="laptop" [class.item-header]="item$.descendants !== 0 && item$.type !== 'job'" [class.head-margin]="item$.text">
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
      <div class="subtext">
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
        padding: 110px 15px 0 15px;
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

    @media screen and (max-width: 768px) {
      .laptop {
        display: none;
      }
    }

    @media screen and (min-width: 769px) {
      .mobile {
        display: none;
      }
    }

    .title {
      font-size: 16px;
    }

    .title-block {
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      padding: 0 75px;
    }

    @media screen and (max-width: 768px) {
      .title {
        font-size: 15px;
        margin-right: 10px;
      }

      .back-button {
        color: #b92b27;
        float: left;
        position: absolute;
        left: 10px;
        font-weight: bold;
        font-size: 18px;
      }
    }

    .subtext {
      font-size: 12px;
    }

    .domain,
    .subtext {
      color: #696969;
      font-weight: bold;
      letter-spacing: 0.5px;
    }

    .domain a,
    .subtext a {
      color: #b92b27;
    }

    .subtext a:hover {
      text-decoration: underline;
    }

    .item-details {
      padding: 10px;
    }

    .item-header {
      border-bottom: 2px solid #b92b27;
      padding-bottom: 10px;
    }

    @media screen and (max-width: 768px) {
      .item-header {
        padding: 10px 0 10px 0;
        background-color: #F6F6EF;
        position: fixed;
        width: 100%;
        left: 0;
        top: 62px;
      }
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
    private titleService: Title,
    private _location: Location
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let itemID = +params['id']; // (+) converts string 'id' to a number
      this._hackerNewsAPIService.fetchItem(itemID).subscribe(data => {
        this.item$ = data;
        this.titleService.setTitle(data.title + ' | Angular 2 HN');
      }, error => console.log('Could not load item'));
    });
  }

  goBack() {
    this._location.back();
  }

  shortenDomain(url) {
    // Should use a pipe for this, but pipes seem to break the App Shell :(
    if (url) {
      var domain = '(' + url.split('/')[2] + ')';
      return domain ? domain.replace('www.', '') : '';
    }
  }
}
