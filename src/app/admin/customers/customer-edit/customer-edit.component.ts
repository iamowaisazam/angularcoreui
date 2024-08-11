import { Component } from '@angular/core';
import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, TableDirective, TableColorDirective, TableActiveDirective, AvatarComponent, ProgressBarDirective, ProgressComponent, ModalBodyComponent, ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { cilList, cilShieldAlt,cilX,cilXCircle,cilBrush} from '@coreui/icons';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CustomerService } from "../customer.service";

@Component({
  selector: 'app-customer-edit',
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
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss'
})
export class CustomerEditComponent {

  public form:FormGroup;
  public formLoader:boolean = true;
  public editId:string = '';
  public editData:string = '';

  constructor(
    public db:CustomerService,
    private fb: FormBuilder,
    private router:ActivatedRoute
  ){
    
    this.form = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      cnic: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      street_address: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {

       this.formLoader = true;
       this.editId = this.router.snapshot.paramMap.get('id') as string;
       this.getRecord();
      
  }


 async getRecord() {
      
      this.formLoader = true;
      let res = await this.db.editCustomer(this.editId);
      this.form.patchValue({
        fullname: res.fullname,
        email:res.email,
        phone: res.phone,
        cnic: res.cnic,
        country:res.country,
        state:res.state,
        city: res.city,
        postal_code:res.postal_code,
        street_address:res.street_address,
      });

      this.formLoader = false;
 }

 async onSubmit() {
     
    if(this.form.valid){
      this.formLoader = true;

      console.log(this.form.value);

      let res = await this.db.update(this.editId,{
        fullname : this.form.value.fullname,
        email: this.form.value.email,
        phone: this.form.value.phone,
        city : this.form.value.city,
        cnic : this.form.value.cnic,
        country : this.form.value.country,
        postal_code : this.form.value.postal_code,
        state : this.form.value.state,
        street_address : this.form.value.street_address,
      });

      if(res){
         alert('Customer Updated');
         this.formLoader = false;
         this.getRecord();
      }else{
         alert('Customer Not Updated');
         this.formLoader = false;
      }

    }else{
       console.log('Failed',this.form.value);  
       console.log(this.form);
    }

  }

}
