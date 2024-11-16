import {Component} from '@angular/core';

@Component({
  selector: 'app-branding',
  standalone: true,
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="../../../../assets/images/logos/logo_maisonduwev.svg"
          class="align-middle m-2"
          width="230"
          height="70"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {
  }
}
