import { Injectable } from '@angular/core';
import { collection, addDoc, getDocs, doc,getDoc,getFirestore, deleteDoc, updateDoc, serverTimestamp, query, where, limit  } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth,signInWithEmailAndPassword,signOut,updateProfile} from "firebase/auth";
import { Route, Router } from '@angular/router';
import {FirebaseService} from './firebase.service'


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    public db:FirebaseService,
    private router:Router
  ) { 

  }

 


 async updateProfile({name}:any){

    // try {

      const auth:any = getAuth();
      const user:any = auth.currentUser;

      await updateProfile(user, {
        displayName: name,
      });

      
  
      const q = query(collection(this.db.db,"users"),where('user_id', '==', this.db.auth.uid),limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].ref;
        await updateDoc(userDoc, {name:name});
      }
      
      console.log('Profile updated successfully');
      // Optionally, update the local auth object with the new values
    // } catch (error) {
      // console.error('Error updating profile:', error);
    // }
    
  }


  async register(email: string, password: string,displayName:string) {

    try {
    

      const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
      await updateProfile(userCredential.user, { displayName });
      const docRef = await addDoc(collection(this.db.db, "users"),
      {
        'user_id':userCredential.user.uid,
        'email':email,
        'name':displayName,
        'createdAt' : serverTimestamp(),
      });
      return userCredential.user;

    } catch (error) {
      throw error;
    }

  }


  async login(email: string, password: string) {

    try {
      const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
      return userCredential.user;
    } catch (error) {

      throw error;
    }

  }


  logOut(){

      signOut(getAuth()).then(() => {
        this.router.navigate(['/admin/login']);
      }).catch(() => {
        alert('Logout Failed');
      });

  }


  
}
