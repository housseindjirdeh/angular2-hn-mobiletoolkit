import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

export interface Item {
  id: number;
}

@Injectable()
export class HackerNewsAPIService {
	private _items$: Subject<Item[]>;
	private baseUrl: string;
	private dataStore: {
		items: Item[]
	};

	constructor(private http: Http) {
		this.baseUrl = 'https://hacker-news.firebaseio.com/v0';
		this.dataStore = {items: []};
		this._items$ = < Subject < Item[] >> new Subject();
	}

	get items$() {
		return this._items$.asObservable();
	}

	fetchStories(storyType: string) {
		this.http.get(`${this.baseUrl}/${storyType}.json`).map(response => response.json()).subscribe(data => {
			this.dataStore.items = data;
			this._items$.next(this.dataStore.items);
		}, error => console.log('Could not load top story IDs.'));
	}

	fetchItem(id: number) {
		return this.http.get(`${this.baseUrl}/item/${id}.json`).map(response => response.json());
	}

  	fetchUser(id: string) {
    	return this.http.get(`${this.baseUrl}/user/${id}.json`).map(response => response.json());
  	}
}