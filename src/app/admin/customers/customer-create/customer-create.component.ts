import { Component } from '@angular/core';
import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, TableDirective, TableColorDirective, TableActiveDirective, AvatarComponent, ProgressBarDirective, ProgressComponent, ModalBodyComponent, ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { cilList, cilShieldAlt,cilX,cilXCircle,cilBrush} from '@coreui/icons';

import { RouterLink } from '@angular/router';

import { CustomerService } from "../customer.service";

@Component({
  selector: 'app-customer-create',
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
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.scss'
})
export class CustomerCreateComponent {

  public form:FormGroup;
  public formLoader:boolean = true;

  constructor(
    public db:CustomerService,
    private fb: FormBuilder
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

    // this.form.patchValue({
    //   name: this.db.auth.displayName,
    //   email: this.db.auth.email,
    // });

    this.formLoader = false;

 }

 async onSubmit() {
     
    if(this.form.valid){

      let res = await this.db.createCustomer({
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
        alert('Customer Created');
        this.form.reset();
      }else{
        alert('Customer Updated');
      }

      // console.log('True',this.form.value);  
      // const {name} = this.form.value;
      // let res = await this.auth.updateProfile({name});

    }else{
      console.log('Failed',this.form.value);  
      alert('Form Validation Failed');
    }


  }


}
