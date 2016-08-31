# Angular 2 HN <img src="public/assets/images/angular2-hn.png" width = 40 style="position: absolute; padding-left: 20px;">

A progressive Hacker News client built with [Angular 2](https://angular.io/) and [RxJS](http://reactivex.io/) using it's [Firebase API](https://github.com/HackerNews/API).

Link to Application

[Mobile Demo](http://i.imgur.com/ooQoI4H.gifv)

## Really? Just another Hacker News client?

Not really. I wanted to build an application that would look and feel native on any device you use. I thought that building a Hacker News client this way will be pretty cool.

I did this by using [Angular Mobile Toolkit](https://mobile.angular.io/), the mobile integration of [Angular CLI](https://cli.angular.io/) that allows for building progressive web applications.

## Features

 + Supports display of; 
  + Stories
  + Jobs
  + Polls
  + Comments
  + User profiles
 + Application Manifest to allow you to easily install to the home screen of your mobile device where it will launch just like an app, without any browser UI 
 + Completely responsive UI that provides a native feel regardless of which device you use
 + Service Worker script that caches application data for fast loading. Pages visited previously will work without an internet connection
  + *Note: Offline capability currently only works in Firefox. Chrome offline functionality will be released in the near future*

## Installing to your home screen

 - **Chrome on Android:** Select "Add to Home Screen" from the menu. You can also see a prompt to install to home screen when you ...
 - **Safari on iOS:** Select "Add to Home Screen" from the menu.
 - **Firefox on Android:** Select the menu, tap on Page then click on "Add to Home Screen".
 - **Opera on Android:** Tap the plus sign on the left of the address bar and select "Add to Home Screen"

## Build process

 - Clone or download the repo
 - If you don't have Angular CLI installed: `npm install -g angular-cli`
 - `ng init --mobile`
 - Input `n` for each file to not overwrite any file changes
 - `ng serve` 

This will kick off the server at `http://localhost:4200/`. Any changes you do to the source files will automatically reload the app.

Click [here](https://cli.angular.io/) to see a full list of what you can do with Angular CLI.
