import { CanActivateFn } from '@angular/router';
import {FirebaseService} from '../admin/services/firebase.service'
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const firebaseService = inject(FirebaseService);
  if(true){
    return true;
  }else{
    return false;
  }
 
  
};
