import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-footer',
  template: `
   <center class="footer">
    <p>Show this project some ❤ on <a href="https://github.com/hdjirdeh/angular2-hn" target="_blank">GitHub</a></p>
  </center>
  `,
  styles: [`
	.footer {
	  position: relative;
	  padding: 10px;
	  height: 60px;
	  border-top: 2px solid #b92b27;
	  letter-spacing: 0.7px;
	}

	.footer a {
	  color: #b92b27;
	  font-weight: bold;
	  text-decoration: none;
	}

	.footer a:hover {
	  text-decoration: underline;
	}

	@media screen and (max-width: 768px) {
      .footer {
        display: none;
      }
    }
  `]
})
export default class FooterComponent {

  constructor() {}

}
