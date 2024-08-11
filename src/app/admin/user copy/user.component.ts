import { Component } from '@angular/core';
import { CommonModule, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, TableDirective, TableColorDirective, TableActiveDirective, AvatarComponent, ProgressBarDirective, ProgressComponent, ModalBodyComponent, ModalFooterComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ButtonCloseDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { cilList, cilShieldAlt,cilX,cilXCircle,cilBrush} from '@coreui/icons';

import { RouterLink } from '@angular/router';

import { FirebaseService } from "../services/firebase.service";



@Component({
  selector: 'app-user',
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
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  public favoriteColor = '#26ab3c';
  icons = { cilList, cilShieldAlt,cilX,cilXCircle,cilBrush };


  //List
  public listLoader = false;
  public dataSource:any = [];

  //Create
  public createUserModal = false;
  public createUserForm:FormGroup;
  public createFormLoader = false;

  // Edit
  public editFormLoader = false;
  public editForm:FormGroup;
  public editModal = false;
  public editData:any = false; 






   /**
   *
   */
   constructor(private db:FirebaseService,private fb: FormBuilder) {

      this.getUsrs();

      this.createUserForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });


      this.editForm = this.fb.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
      
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
          state: 'New',
          registered: 'Jan 1, 2021',
          country: 'Us',
          usage: 50,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          payment: 'Mastercard',
          activity: '10 sec ago',
          avatar: './assets/images/avatars/1.jpg',
          status: 'success',
          color: 'success'
      });
    });

    this.dataSource = tabledata;
    this.listLoader = false;

}



  addNewUser() {
    this.createUserForm.reset();
    this.createUserModal = true;
  }

  handleCreateUserForm(event: boolean) {
    
    if(event == false){
      this.createUserForm.reset();
      this.createUserModal = event;
    }

 }


  createFormSubmit() {

    if (this.createUserForm.valid) {
         
      this.createFormLoader = true;

        this.db.createUser(this.createUserForm.value);
        this.createUserForm.reset();
        // this.createUserModal = false;
        this.getUsrs();
        this.createFormLoader = false;

    } else {
      
        alert('Form Not Submited');
      
    }

    
  }




  async OpenEditUserModal(id:any) {
    
        this.editModal = true;
        this.editFormLoader = true;

        let data = await this.db.editUser({id});
        this.editFormLoader = false;
        
        if(data){
            this.editData = data;
            this.editForm.patchValue({
              id: data.id,
              name: data.name,
              email: data.email,
              password: data.password,
            });
        }else{

          // alert('record Not Found');

        }

  }



  editModalChange(event: boolean) {

      this.editModal = event;
      if(event == false){
        this.editData = false;
        this.editFormLoader = false;
      }
  
  }


  async editSubmit() {

        if (this.editForm.valid) {

            this.editFormLoader = true;
            console.log('Form Submitted!', this.editForm.value);
            let res = await this.db.updateUser(
              this.editForm.value.id,
              {
                id:this.editForm.value.id,
                name:this.editForm.value.name,
                email:this.editForm.value.email,
                password:this.editForm.value.password,
              });

            if(res){
                this.editFormLoader = false;
                this.editModal = false;
                this.getUsrs();
                alert('Data Updated');
            }else{

                alert('Record Not Updated Data');
                this.editFormLoader = false;
            }
     
        }else{

           console.log('Error', this.editForm);

        } 

  }

  

 



  // Delete User
 async deleteUser(id:string){

      this.listLoader= true;
      let res = await this.db.deleteUser(id);
      if(res){
        alert('Record Deleted Successfully');
        this.getUsrs();
      }else{
        this.listLoader= false;
        alert('Record Not Deleted');
      }
  }


}
