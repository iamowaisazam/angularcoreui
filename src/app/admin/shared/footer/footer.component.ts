import { Component } from '@angular/core';
import { FooterComponent as DefaultFooterComponent } from '@coreui/angular';

@Component({
    selector: 'app-admin-default-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
})
export class FooterComponent extends DefaultFooterComponent {
  constructor() {
    super();
  }
}
