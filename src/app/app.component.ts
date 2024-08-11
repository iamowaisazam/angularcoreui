import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { initializeApp } from "firebase/app";
import {FirebaseService} from "./admin/services/firebase.service"

import { getAuth,onAuthStateChanged  } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  
   title = 'CoreUI Angular Admin Template';
   loadApp = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    public fb:FirebaseService,
  ) {

    this.titleService.setTitle(this.title);
    this.iconSetService.icons = { ...iconSubset };

         
  }

  ngOnInit(): void {

     this.loadFireBase();
     this.router.events.subscribe((evt) => {
     
      if (!(evt instanceof NavigationEnd)) {
        return;
      }

    });

  }

  async loadFireBase(){

          let res = await initializeApp({
            apiKey: "AIzaSyC_vN7G9ihLR4gRJ0YtGVKKQoKitoVO2yk",
            authDomain: "angular-fcfa6.firebaseapp.com",
            projectId: "angular-fcfa6",
            storageBucket: "angular-fcfa6.appspot.com",
            messagingSenderId: "840693659093",
            appId: "1:840693659093:web:5ce22c876d6a73fbf7f95c",
            measurementId: "G-0V2LP5NBK9"
          })

          if(res){

              this.fb.loadService();
              onAuthStateChanged(getAuth(), (user) => {
                if (user) {
                    this.fb.auth = {
                      uid:user.uid,
                      email:user.email,
                      displayName:user.displayName,
                      emailVerified:user.emailVerified,
                      phoneNumber:user.phoneNumber,
                      photoURL:user.photoURL,
                    };
                    console.log('User Logged In');
                } else { 
                    console.log('User Logged Out'); 
                    this.fb.auth = false; 
                }
                this.loadApp = true;
              });

        }

  }



}
