import { Injectable } from '@angular/core';
import { collection, addDoc, getDocs, doc,getDoc,getFirestore, deleteDoc, updateDoc, Timestamp  } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile,onAuthStateChanged  } from "firebase/auth";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  public db?: any;
  public auth: any = false;
  public authLoad:boolean = true;

  constructor(
    private router: Router
  ) { 

  }

  public loadService(){ 

    this.db = getFirestore();

  }

  async createUser({
    name,
    email,
    password,
    userId,
  }:any)  {
    
    // try {
    
      let data = {
        id:'',
        userId:userId,
        name,
        email,
        password
      };

      data.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
      const docRef = await addDoc(collection(this.db, "users"),data);
      console.log("Document written with ID: ", docRef.id);

    // } catch (e) {
    //    console.error("Error adding document: ", e);
    //    alert("error while creating")
    // }

  }

  async editUser(data: any): Promise<any> {

    // return false;
    // try {
      const userDoc = doc(this.db, "users",data.id);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        return {  ...userSnapshot.data(), id: userSnapshot.id };
      } else {
        console.log("No such document!");
        return null;
      }
    // } catch (e) {
    //   console.error("Error getting document: ", e);
    //   alert("Error while getting document");
    //   return null;
    // }
  }

  async getAllUsers() {
    let result: any[] = []
    const querySnapshot = await getDocs(collection(this.db, "users"));
    querySnapshot.forEach((doc) => {

      let obj = doc.data();
      result.push({  
        ...obj, 
        id: doc.id ,
        createdAt: (obj['createdAt'] as Timestamp)?.toDate(), 
      })
    });
    return result
  }

  async deleteUser(docId: string) {
    // try {

     await deleteDoc(doc(this.db, "users", docId));
      return true;
 
      // console.log("Document successfully deleted!");
    // } catch (e) {
      // console.error("Error removing document: ", e);
      // alert("Error while deleting");
    // }
  }

  async updateUser(docId: string, data: any) {

    // try {
    // return false;
    
        const userDoc = doc(this.db, "users", docId);
        await updateDoc(userDoc, data);

         console.log("Document successfully updated!");
      return true;

    // } catch (e) {
      
      // console.error("Error updating document: ", e);
      // alert("Error while updating");
      // return false;
    // }
  }

 


  
}
