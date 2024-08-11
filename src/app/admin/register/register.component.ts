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
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-admin-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  icons = {cilEnvelopeClosed};
  myForm:FormGroup;
  public formLoader = false;

  constructor(
    private auth:AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { 

    if(this.auth.db.auth){
      this.router.navigate(['/admin/dashboard']);
    }

    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.min(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.min(6)]]
    });

  }

  formSubmit() {
    
    this.formLoader = true;
    if (this.myForm.valid) {

      console.log(this.myForm.value);
      
      
        this.formLoader = false;
        const {email,password,name} = this.myForm.value;

        this.auth.register(email,password,name)
        .then((response) => {
           alert('Registeration Successfully Now You Can Logged In');
           this.router.navigate(['/admin/dashboard']);
        }).catch((error) => {

          alert(error.code);
        });

    } else {
      this.formLoader = false;
        alert('Form Not Submited');  
    }
  }

}
