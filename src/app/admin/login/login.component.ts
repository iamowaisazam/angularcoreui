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
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-admin-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

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
      email: ['iamowaisazam@gmail.com', [Validators.required, Validators.email]],
      password: ['owais123', [Validators.required,Validators.min(6)]]
    });


  }

  loginSubmit() {
    
    this.formLoader = true;
    if (this.myForm.valid) {
      
        this.formLoader = false;
        this.auth.login(this.myForm.value.email,this.myForm.value.password)
        .then((response) =>{

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

