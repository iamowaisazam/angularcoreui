import { CommonModule, NgStyle } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RouterLink } from '@angular/router';
import { AvatarComponent, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormControlDirective, FormDirective, FormLabelDirective, ProgressBarDirective, ProgressComponent, RowComponent, TextBgColorDirective, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RowComponent, 
    ColComponent, 
    TextBgColorDirective, 
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
    AvatarComponent,
    IconDirective,
    ProgressBarDirective, 
    ProgressComponent,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  public form:FormGroup;
  public formLoader:boolean = true;

  constructor(
    public db:FirebaseService,
    public auth:AuthService,
    private fb: FormBuilder
  ){

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });


  }


  ngOnInit(): void {

    this.formLoader = true;

    this.form.patchValue({
      name: this.db.auth.displayName,
      email: this.db.auth.email,
    });

    this.formLoader = false;

 }

 async onSubmit() {
     
    if(this.form.valid){

      this.formLoader = true;
      const {name} = this.form.value;
      let res = await this.auth.updateProfile({name});
      this.formLoader = false;

    }else{
      console.log('Failed',this.form.value);      

    }

    
  }


}
