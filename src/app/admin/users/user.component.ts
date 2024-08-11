import { Component } from '@angular/core';
import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, TableDirective, TableColorDirective, TableActiveDirective, AvatarComponent, ProgressBarDirective, ProgressComponent, ModalBodyComponent, ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { cilList, cilShieldAlt,cilX,cilXCircle,cilBrush} from '@coreui/icons';

import { RouterLink } from '@angular/router';

import { FirebaseService } from "../services/firebase.service";



@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [
    RowComponent, 
    ColComponent, 
    TextColorDirective, 
    CardComponent, 
    CardHeaderComponent, 
    CardBodyComponent, 
    ReactiveFormsModule, 
    FormsModule, 
    FormDirective, 
    FormLabelDirective, 
    FormControlDirective, 
    ButtonDirective, 
    NgStyle,
    TableDirective, 
    TableColorDirective, 
    TableActiveDirective,
    TextColorDirective,
    AvatarComponent,
    IconDirective,
    ProgressBarDirective, 
    ProgressComponent,
    ModalBodyComponent, 
    ModalFooterComponent,
    ModalComponent, 
    ModalHeaderComponent, 
    ModalTitleDirective,
    ButtonCloseDirective,
    RouterLink,
    NgTemplateOutlet,
    CommonModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  public favoriteColor = '#26ab3c';
  icons = { cilList, cilShieldAlt,cilX,cilXCircle,cilBrush };


  //List
  public listLoader = false;
  public dataSource:any = [];


   /**
   *
   */
   constructor(private db:FirebaseService,private fb: FormBuilder) {

      this.getUsrs();

  }

  async getUsrs(){

    this.listLoader = true;
    let data = await this.db.getAllUsers();
    let tabledata :any = [];

    data.forEach((element,key) => {
      tabledata.push({
          id: element.id,
          key:key + 1,
          name: element.name, 
          email: element.email,
          createdAt: element.createdAt,
      });
    });

    this.dataSource = tabledata;
    this.listLoader = false;
 }

}