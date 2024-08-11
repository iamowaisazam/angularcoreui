import { Component } from '@angular/core';
import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, TableDirective, TableColorDirective, TableActiveDirective, AvatarComponent, ProgressBarDirective, ProgressComponent, ModalBodyComponent, ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { cilList, cilShieldAlt,cilX,cilXCircle,cilBrush} from '@coreui/icons';

import { Router, RouterLink } from '@angular/router';

import { CustomerService } from "../customer.service";

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    RowComponent, 
    ColComponent, 
    TextColorDirective, 
    CardComponent, 
    CardHeaderComponent, 
    CardBodyComponent, 
    DocsExampleComponent, 
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
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {

  public favoriteColor = '#26ab3c';
  icons = { cilList, cilShieldAlt,cilX,cilXCircle,cilBrush };


  //List
  public listLoader = false;
  public dataSource:any = [];

  
   /**
   *
   */
   constructor(
    private db:CustomerService,
    private router:Router
   ) {

      this.getListData();

  }

  async getListData(){

    this.listLoader = true;
    let data = await this.db.getAllRecords();
    let tabledata :any = [];

    console.log(data);
    

    data.forEach((element,key) => {
      tabledata.push({
          key:key + 1,
          id:element.id,
          fullname: element.fullname, 
          email: element.email,
          phone: element.phone,
          country: element.country,
          state: element.state,
          city: element.city,
          street_address: element.street_address,
      });
    });

    this.dataSource = tabledata;
    this.listLoader = false;

}



 // Edit Record
 async edit(id:string){

  this.router.navigate(['/admin/customer/'+id]);

}


  // Delete Record
 async delete(id:string){

      this.listLoader= true;
      let res = await this.db.deleteCustomer(id);
      if(res){
        alert('Record Deleted Successfully');
        this.getListData();
      }else{
        this.listLoader= false;
        alert('Record Not Deleted');
      }
  }


}


