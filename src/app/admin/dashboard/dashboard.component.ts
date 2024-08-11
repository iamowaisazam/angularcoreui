import { DOCUMENT, NgStyle } from '@angular/common';
import { Component,OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';


import { WidgetsDropdownComponent } from '../../views/widgets/widgets-dropdown/widgets-dropdown.component';


@Component({
  templateUrl: 'dashboard.component.html',
  // styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [
    WidgetsDropdownComponent, 
    TextColorDirective, 
    CardComponent, 
    CardBodyComponent, 
    RowComponent, 
    ColComponent, 
    ButtonDirective, 
    IconDirective, 
    ReactiveFormsModule, 
    ButtonGroupComponent, 
    FormCheckLabelDirective, 
    ChartjsComponent, 
    NgStyle, 
    CardFooterComponent, 
    GutterDirective, 
    ProgressBarDirective, 
    ProgressComponent, 
    CardHeaderComponent, 
    TableDirective, 
    AvatarComponent
  ]
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
   
  }

  
 
}
