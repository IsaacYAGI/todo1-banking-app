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
      this.clearLocalStorage();

      if (this.afAuth.currentUser) {
        return this.afAuth.signOut();
      }else{
        return Promise.resolve();
      }
  }

  clearLocalStorage(){
    localStorage.clear();
  }

  userDetails() {
    return this.afAuth.user;
  }
}
