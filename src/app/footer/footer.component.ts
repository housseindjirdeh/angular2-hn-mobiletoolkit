import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-footer',
  template: `
   <center class="footer">
    <p>Show this project some ❤ on <a href="https://github.com/hdjirdeh/angular2-hn" target="_blank">GitHub</a></p>
    <p>Show me some ❤ on <a href="https://twitter.com/hdjirdeh" target="_blank">Twitter</a></p>
  </center>
  `,
  styles: [`
	.footer {
	  position: relative;
	  padding: 10px;
	  height: 90px;
	  border-top: 2px solid #B13138;
	  letter-spacing: 0.7px;
	}

	.footer a {
	  color: #B13138;
	  font-weight: bold;
	  text-decoration: none;
	}

	.footer a:hover {
	  text-decoration: underline;
	}
  `]
})
export default class FooterComponent {

  constructor() {}

}
