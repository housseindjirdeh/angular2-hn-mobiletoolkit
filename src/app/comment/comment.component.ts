import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdProgressBar } from '@angular2-material/progress-bar';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FromUnixPipe, TimeAgoPipe } from 'angular2-moment/src';

import { HackerNewsAPIService } from '../services/hackernews-api.service';

export interface Comment {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: Date;
  type: string;
}

@Component({
  moduleId: module.id,
  selector: 'app-comment',
  template:` 
  <div class="loading-bars" *ngIf="!comment$">
    <div class="meta" [class.meta-collapse]="collapse">
      <span class="collapse">[-]</span> 
      <a>-------------</a> 
      X hours ago
    </div>
    <div class="bars-section">
      <md-progress-bar mode="indeterminate" color="warn" class="short"></md-progress-bar>
      <md-progress-bar mode="indeterminate" color="warn" class="long"></md-progress-bar>
      <md-progress-bar mode="indeterminate" color="warn" class="short"></md-progress-bar>
    </div>
  </div>
  <div *ngIf="comment$">
    <div *ngIf="!comment$.deleted">
      <div class="meta" [class.meta-collapse]="collapse">
        <span class="collapse" (click)="collapse = !collapse">[{{collapse ? '+' : '-'}}]</span> 
        <a [routerLink]="['/user', comment$?.by]" routerLinkActive="active">{{comment$?.by}}</a> 
        {{ (comment$?.time | amFromUnix) | amTimeAgo }}
      </div>
      <div class="comment-tree">
        <div [hidden]="collapse">
          <p class="comment-text" [innerHTML]="comment$?.text"></p>
          <p><a class="reply" href="https://news.ycombinator.com/reply?id={{comment$.id}}">reply</a></p>
          <div class="subtree" *ngFor="let kidId of comment$?.kids">
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
      color: #B13138;
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
      font-size: 12px;
      color: #828282;
      font-weight: bold;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }

    .meta a {
      color: #B13138;
    }

    .meta-collapse {
      margin-bottom: 20px;
    }

    .deleted-meta {
      font-size: 12px;
      color: #828282;
      font-weight: bold;
      letter-spacing: 0.5px;
      margin: 30px 0;
    }

    .deleted-meta a {
      color: #B13138;
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
      word-wrap: break-word;
    }

    @media screen and (max-width: 768px) {
      .comment-text {
        font-size: 13.5px;
        margin-top: 0;
        word-wrap: break-word;
      }
    }

    .subtree {
      margin-left: 22px;
    }

    @media screen and (max-width: 768px) {
      .subtree {
        margin-left: 10px;
      }
    }

    .reply {
      text-decoration: underline;
      font-size: 13px;
    }

    .long {
      margin: 8px 20px;
      width: 40%;
    }

    .short {
      margin: 8px 20px;
      width: 30%;
    }

    .loading-bars {
      margin-top: 30px;
      margin-bottom: 40px;
    }

    .bars-section {
      margin-top: 20px;
    }
  `],
  directives: [MdProgressBar, CommentComponent, ROUTER_DIRECTIVES]
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