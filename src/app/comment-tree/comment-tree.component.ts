import { Component, Input, OnInit } from '@angular/core';

import CommentComponent from '../comment/comment.component';

import { HackerNewsAPIService } from '../services/hackernews-api.service';

@Component({
  moduleId: module.id,
  selector: 'app-comment-tree',
  template: `
    <ul class="comment-list">
      <li *ngFor="let itemID of itemKids">
        <app-comment commentID="{{ itemID }}"></app-comment>
      </li>
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
  `],
  directives: [CommentComponent]
})

export default class CommentTreeComponent implements OnInit {
  @Input() itemKids: string;

  constructor(private _hackerNewsAPIService: HackerNewsAPIService) {}

  ngOnInit() {
    this.itemKids = JSON.parse("[" + this.itemKids + "]");
  }
}
