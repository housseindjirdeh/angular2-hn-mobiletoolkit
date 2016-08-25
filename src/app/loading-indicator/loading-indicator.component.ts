import { Component } from '@angular/core';
import { MdProgressBar } from '@angular2-material/progress-bar';

@Component({
  moduleId: module.id,
  selector: 'app-loading-indicator',
  template: `
  <div class="loading-wrapper">
    <div class="content">
      <md-progress-bar mode="indeterminate" color="warn" class="long"></md-progress-bar>
    </div>
  </div>
  `,
  styles: [`
    .content {
      position: absolute;
      top: 35vh;
      width: 100%;
    }

    .loading-wrapper {
      min-height: 70vh;
      width: 100%;
    }
  `],
  directives: [MdProgressBar]
})
export default class LoadingIndicatorComponent {

  constructor() {}

}