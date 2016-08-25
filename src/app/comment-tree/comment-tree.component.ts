import { Component, Input, OnInit } from '@angular/core';

import CommentComponent from '../comment/comment.component';

import { HackerNewsAPIService } from '../services/hackernews-api.service';

@Component({
  moduleId: module.id,
  selector: 'app-comment-tree',
  template: `
    <ul class="comment-list">
      <li *ngFor="let itemID of itemKids | slice:0:indexFrom">
        <app-comment commentID="{{ itemID }}"></app-comment>
      </li>
      <div *ngIf="indexFrom < itemKids.length" class="button-block">
        <button (click)="loadMore()" class="button">Load More</button>
      </div>
    </ul>
  `,
  styles: [`
    ul {
      list-style-type: none;
      padding: 10px 0;
    }

    li {
      display: list-item;
    }

    .button-block {
      text-align: center;
    }

    .button {
      display: inline-block;
      border-radius: 4px;
      background-color: #B13138;
      border: none;
      color: #FFFFFF;
      text-align: center;
      font-size: 16px;
      padding: 10px;
      width: 130px;
      transition: all 0.5s;
      cursor: pointer;
      margin: 35px 0;
      vertical-align: middle;
    }

    .button:hover {
      background-color: #b8454b;
    }
  `],
  directives: [CommentComponent]
})

export default class CommentTreeComponent implements OnInit {
  @Input() itemKids: string;
  @Input() itemCount: number;
  indexFrom: number;
  indexChange: number;

  constructor(private _hackerNewsAPIService: HackerNewsAPIService) {}

  ngOnInit() {
    this.itemKids = JSON.parse("[" + this.itemKids + "]");

    if (this.itemCount <= 50) {
      this.indexChange = 10;
    } else if (this.itemCount <= 100) {
      this.indexChange = 7;
    } else if (this.itemCount <= 150) {
      this.indexChange = 5;
    } else {
      this.indexChange = 3;
    }

    console.log(this.indexChange);
    this.indexFrom = this.indexChange;
  }

  loadMore() {
    this.indexFrom += this.indexChange;
  }
}
