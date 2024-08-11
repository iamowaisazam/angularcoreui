import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { FooterComponent} from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { navItems } from './shared/_nav';
import { FirebaseService } from './services/firebase.service';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    HeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    FooterComponent
  ]
})
export class AdminComponent implements OnInit {

  
  public navItems = navItems;

  constructor (
    public db:FirebaseService,
    private router:Router,
  ){

  }

  ngOnInit(): void {
    console.log('On Init');

    if(!this.db.auth){
      this.router.navigate(['/admin/login']);
  
    }
    
 }


  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }
}
