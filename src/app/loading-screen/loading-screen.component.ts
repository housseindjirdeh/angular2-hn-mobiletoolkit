import { Component } from '@angular/core';
import { MdProgressBar } from '@angular2-material/progress-bar';

@Component({
  moduleId: module.id,
  selector: 'app-loading-screen',
  template: `
  <div class="loading-image">
    <img class="logo" src="https://raw.githubusercontent.com/hdjirdeh/angular2-hackernews/master/public/assets/images/angular2-hn.png">
  </div>
  `,
  styles: [`
    .loading-image {
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      z-index: -1;
    }

    @media screen and (max-width: 768px) {
      .loading-image {
        background-color: #f6f6ef;
      }
    }

    .loading-image .logo {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 20vh;
      transform: translate(-50%, -50%);
    }
  `],
  directives: [MdProgressBar]
})
export default class LoadingIndicatorComponent {

  constructor() {}

}