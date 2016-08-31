import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FromUnixPipe, TimeAgoPipe } from 'angular2-moment/src';

import { Comment } from '../interfaces/comment';
import { HackerNewsAPIService } from '../services/hackernews-api.service';

@Component({
  moduleId: module.id,
  selector: 'app-comment',
  template:`
  <div class="loading-section" *ngIf="!comment$">
    <div class="loader">
      Loading...
    </div>
  </div>
  <div *ngIf="comment$">
    <div *ngIf="!comment$.deleted">
      <div class="meta" [class.meta-collapse]="collapse">
        <span class="collapse" (click)="collapse = !collapse">[{{collapse ? '+' : '-'}}]</span> 
        <a [routerLink]="['/user', comment$.by]" routerLinkActive="active">{{comment$.by}}</a>
        <span class="time">{{ (comment$.time | amFromUnix) | amTimeAgo }}</span>
      </div>
      <div class="comment-tree">
        <div [hidden]="collapse">
          <p class="comment-text" [innerHTML]="comment$.text"></p>
          <div class="subtree" *ngFor="let kidId of comment$.kids">
            <app-comment commentID="{{ kidId }}"></app-comment>
          </div>
        </div>
      </div>
    </div>
    <div *ngIf="comment$.deleted">
      <div class="deleted-meta">
        <span class="collapse">[deleted]</span> | Comment Deleted
      </div>
    </div>
  </div>
   `,
  pipes: [FromUnixPipe, TimeAgoPipe],
  providers: [HackerNewsAPIService],
  styles: [`
    :host >>> a {
      color: #b92b27;
      font-weight: bold;
      text-decoration: none;
    }

    :host >>> a:hover {
      text-decoration: underline;
    }

    :host >>> pre {
      white-space: pre-wrap;
    }

    .meta {
      font-size: 13px;
      color: #696969;
      font-weight: bold;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }

    .meta a {
      color: #b92b27;
    }

    .meta .time {
      padding-left: 5px;
    }

    @media screen and (max-width: 768px) {
      .meta {
        font-size: 14px;
        margin-bottom: 10px;
      }

      .meta .time {
        padding: 0;
        float: right;
      }
    }

    .meta-collapse {
      margin-bottom: 20px;
    }

    .deleted-meta {
      font-size: 12px;
      color: #696969;
      font-weight: bold;
      letter-spacing: 0.5px;
      margin: 30px 0;
    }

    .deleted-meta a {
      color: #b92b27;
      text-decoration: none;
    }

    .collapse {
      font-size: 13px;
      letter-spacing: 2px;
      cursor: pointer;
    }

    .comment-tree {
      margin-left: 24px;
    }

    @media screen and (max-width: 1024px) {
      .comment-tree {
        margin-left: 10px;
      }
    }

    .comment-text {
      font-size: 14px;
      margin-top: 0;
      margin-bottom: 20px;
      word-wrap: break-word;
      line-height: 1.5em;
    }

    .subtree {
      margin-left: 22px;
    }

    @media screen and (max-width: 768px) {
      .subtree {
        margin-left: 5px;
      }
    }

    .loading-section {
      height: 70px;
      margin: 40px 0 40px 40px;
    }

    @media screen and (max-width: 768px) {
      .loading-section {
        height: 50px;
        margin: 0 0 30px 40px
      }
    }

    .loader:before,
    .loader:after,
    .loader {
      border-radius: 50%;
      width: 1.5em;
      height: 1.5em;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      -webkit-animation: load7 1.8s infinite ease-in-out;
      animation: load7 1.8s infinite ease-in-out;
    }
    .loader {
      color: #B92B27;
      font-size: 10px;
      margin: 20px;
      position: relative;
      text-indent: -9999em;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
    .loader:before {
      left: -3.5em;
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }
    .loader:after {
      left: 3.5em;
    }
    .loader:before,
    .loader:after {
      content: '';
      position: absolute;
      top: 0;
    }
    @-webkit-keyframes load7 {
      0%,
      80%,
      100% {
        box-shadow: 0 2.5em 0 -1.3em;
      }
      40% {
        box-shadow: 0 2.5em 0 0;
      }
    }
    @keyframes load7 {
      0%,
      80%,
      100% {
        box-shadow: 0 2.5em 0 -1.3em;
      }
      40% {
        box-shadow: 0 2.5em 0 0;
      }
    }
  `],
  directives: [CommentComponent, ROUTER_DIRECTIVES]
})
export default class CommentComponent {
  @Input() commentID: number;
  comment$: Observable<Comment>; 
  collapse: boolean;

  constructor(private _hackerNewsAPIService: HackerNewsAPIService) {}

  ngOnInit() {
    this._hackerNewsAPIService.fetchItem(this.commentID).subscribe(data => {
      this.comment$ = data;
    }, error => console.log('Could not load comment item'));

    this.collapse = false;
  }
}