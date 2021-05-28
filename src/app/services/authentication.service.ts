import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  registerUser(value) {
    return this.afAuth.createUserWithEmailAndPassword(value.email, value.password);
  }

  loginUser(value) {
    return this.afAuth.signInWithEmailAndPassword(value.email, value.password);
  }

  logoutUser() {
      if (this.afAuth.currentUser) {
        return this.afAuth.signOut();
      }else{
        return Promise.resolve();
      }
  }

  userDetails() {
    return this.afAuth.user;
  }
}
