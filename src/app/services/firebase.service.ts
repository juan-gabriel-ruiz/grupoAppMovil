import { INJECTOR, inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc ,  getDoc } from '@angular/fire/firestore'
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  //===dudas inject
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);


  // autenticacion
  getAuth() {
    return getAuth();
  }

  // =========== acceder

  singIn(user: User) {

    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // =========== crear usuario

  singUp(user: User) {

    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //====== actualizar usuario

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }

   //====== Enviar email para restrablecer contraeña
   sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(),email );
   }

   //====== Cerrar sesion

   singOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth')
   }

  //====== base de datos ========
  //=== setear docuemnto
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);

  }

  //=== obtener docuemnto
  async getDocument(path: string) {
    return ( await getDoc(doc(getFirestore(), path))).data();

  }


}
