import { Injectable } from '@angular/core';
import { collection, addDoc, getDocs, doc,getDoc,getFirestore, deleteDoc, updateDoc, query, where  } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile,onAuthStateChanged  } from "firebase/auth";
import { Router } from '@angular/router';
import {FirebaseService } from '../services/firebase.service'
import {Customer  } from "./customer.model";


@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private collectionName = 'customers';

  constructor(
    private db:FirebaseService
  ) { 

  }

  async getAllRecords() {
    let result: any[] = []

    const q = query(collection(this.db.db, this.collectionName),where('user_id', '==', this.db.auth.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push({  ...doc.data() , id: doc.id })
    });

    console.log(result);
    return result
  }



  async createCustomer(customer:Customer)  {
    
    try {
  
      customer.user_id = this.db.auth.uid;

      const docRef = await addDoc(collection(this.db.db,this.collectionName),customer);
      console.log("Document written with ID: ", docRef.id);
      return true;

    } catch (e) {
       console.error("Error adding document: ", e);
      //  alert("error while creating")
      return false;
    }

  }

  async editCustomer(id:string): Promise<any> {

    // return false;
    // try {
      const userDoc = doc(this.db.db,this.collectionName,id);
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


  async deleteCustomer(docId: string) {
    // try {

      await deleteDoc(doc(this.db.db, this.collectionName, docId));
      return true;
 
      console.log("Document successfully deleted!");
    // } catch (e) {
      // console.error("Error removing document: ", e);
      // alert("Error while deleting");
    // }
  }

  async update(docId: string, customer: Partial<Customer>) {

    // try {
    // return false;

        const userDoc = doc(this.db.db, this.collectionName, docId);
        await updateDoc(userDoc, customer);
         console.log("Document successfully updated!");
        return true;

    // } catch (e) {
      
      // console.error("Error updating document: ", e);
      // alert("Error while updating");
      // return false;
    // }
  }



  
}
