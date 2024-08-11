import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { 
  ContainerComponent, 
  RowComponent, 
  ColComponent, 
  CardGroupComponent, 
  TextColorDirective, 
  CardComponent, 
  CardBodyComponent, 
  FormDirective, 
  InputGroupComponent, 
  InputGroupTextDirective, 
  FormControlDirective, 
  ButtonDirective 
} from '@coreui/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { cilEnvelopeClosed} from '@coreui/icons';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    ContainerComponent, 
    RowComponent, 
    ColComponent, 
    CardGroupComponent, 
    TextColorDirective, 
    CardComponent, 
    CardBodyComponent, 
    FormDirective, 
    InputGroupComponent, 
    InputGroupTextDirective, 
    IconDirective, 
    FormControlDirective, 
    ButtonDirective, 
    NgStyle,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  
  icons = {cilEnvelopeClosed};
  myForm:FormGroup;
  public formLoader = false;

  constructor(
    private router: Router,
    private db:FirebaseService,
    private fb: FormBuilder
  ) { 

    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

  }

  formSubmit() {
    
    this.formLoader = true;
    if (this.myForm.valid) {

        this.formLoader = false;
        const {email} = this.myForm.value;
        alert('Password Reset Successfully');


    } else {
      this.formLoader = false;
        alert('Form Not Submited');  
    }
  }

}
