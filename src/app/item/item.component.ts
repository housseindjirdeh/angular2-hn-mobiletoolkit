import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FromUnixPipe, TimeAgoPipe } from 'angular2-moment/src';

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
  selector: 'item',
  template:` 
  <div class="loading-section" *ngIf="!item$">
    <div class="loader">
      Loading...
    </div>
  </div>
  <div *ngIf="item$">
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
   `,
  pipes: [FromUnixPipe, TimeAgoPipe],
  providers: [HackerNewsAPIService],
  styles: [`
    p {
      margin: 2px 0;
    }

    @media screen and (max-width: 768px) {
      p {
        margin-bottom: 5px;
        margin-top: 0;
      }
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

    .loader,
    .loader:before,
    .loader:after {
      background: #B92B27;
      -webkit-animation: load1 1s infinite ease-in-out;
      animation: load1 1s infinite ease-in-out;
      width: 1em;
      height: 4em;
    }

    .loader:before,
    .loader:after {
      position: absolute;
      top: 0;
      content: '';
    }

    .loader:before {
      left: -1.5em;
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    .loading-section {
      height: 40px;
    }

    @media screen and (max-width: 768px) {
      .loading-section {
        height: 50px;
      }
    }

    .loader {
      color: #B92B27;
      text-indent: -9999em;
      margin: 20px 20px;
      position: relative;
      font-size: 11px;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }

    @media screen and (max-width: 768px) {
      .loader {
        margin: 20px auto;
      }
    }

    .loader:after {
      left: 1.5em;
    }

    @-webkit-keyframes load1 {
      0%,
      80%,
      100% {
        box-shadow: 0 0;
        height: 2em;
      }
      40% {
        box-shadow: 0 -2em;
        height: 3em;
      }
    }

    @keyframes load1 {
      0%,
      80%,
      100% {
        box-shadow: 0 0;
        height: 2em;
      }
      40% {
        box-shadow: 0 -2em;
        height: 3em;
      }
    }

    @media screen and (max-width: 768px) {
      @-webkit-keyframes load1 {
        0%,
        80%,
        100% {
          box-shadow: 0 0;
          height: 4em;
        }
        40% {
          box-shadow: 0 -2em;
          height: 5em;
        }
      }

      @keyframes load1 {
        0%,
        80%,
        100% {
          box-shadow: 0 0;
          height: 3em;
        }
        40% {
          box-shadow: 0 -2em;
          height: 4em;
        }
      }
    }
  `],
  directives: [ROUTER_DIRECTIVES]
})
export default class ItemComponent {
  @Input() itemID: number;
  item$: Observable<Item>; 

  constructor(private _hackerNewsAPIService: HackerNewsAPIService) {}

  ngOnInit() {
    this._hackerNewsAPIService.fetchItem(this.itemID).subscribe(data => {
      this.item$ = data;
    }, error => console.log('Could not load item'));
  }

  shortenDomain(url) {
    // Should use a pipe for this, but pipes seem to break the App Shell :(
    if (url) {
      var domain = '(' + url.split('/')[2] + ')';
      return domain ? domain.replace('www.', '') : '';
    }
  }
}