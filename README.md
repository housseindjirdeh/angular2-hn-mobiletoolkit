<img alt="Angular 2 HN" title="Angular 2 HN" src="http://i.imgur.com/92Lll7T.png" width="500">

**A progressive Hacker News client built with [Angular 2](https://angular.io/) and [RxJS](http://reactivex.io/) using it's [Firebase API](https://github.com/HackerNews/API).**

[Live Version](https://angular2-hn.firebaseapp.com)

## Mobile Preview

<p align="center">
  <img src = "http://i.imgur.com/46BnTDt.gif">
</p>

## Laptop Preview

<p align="center">
  <img src = "http://i.imgur.com/6QquRtl.gif">
</p>

## Features

 + Supports display of:
  + [Stories](https://angular2-hn.firebaseapp.com/item/12398451)
  + [Jobs](https://angular2-hn.firebaseapp.com/item/12366966)
  + [User profiles](https://angular2-hn.firebaseapp.com/user/dhouston)
 + Completely responsive UI that provides a native feel regardless of which device you use
 + Application Manifest to allow you to easily install to the home screen of your mobile device where it will launch just like an app without any browser UI 
 + Service Worker script that caches assets and application data. Pages visited previously will work without an internet connection
  + *Note: Offline capability currently only works in Firefox. Chrome offline functionality will be released in the near future*

## Another Hacker News client?

Yeah I know, there are [a ton](https://github.com/cheeaun/awesome-hacker-news) of Hacker News readers out there. I wanted to play around with [Angular Mobile Toolkit](https://mobile.angular.io/) to build an app that would look native on any device you use, so I thought it would be fun to build Hacker News :smile:.

## Areas of improvement

 - Comment requests stagger and take a while with a large number of comments (>200). This needs to be sped up considerably
 - Service worker script fails to retrieve cached network calls in Chrome when offline
 - Support for polls

Feel free to send me feedback on [twitter](https://twitter.com/hdjirdeh) or [file an issue](https://github.com/hdjirdeh/angular2-hn/issues/new)!

## Build process

 - Clone or download the repo
 - If you don't have Angular CLI installed: `npm install -g angular-cli`
 - `ng init --mobile`
 - Input `n` for each file to not overwrite any file changes
 - Delete/comment out `app.component.spec.ts`
 - `ng serve`

This will kick off the server at `http://localhost:4200/`. Any changes you do to the source files will automatically reload the app.


Click [here](https://cli.angular.io/) to see a full list of what you can do with Angular CLI.
