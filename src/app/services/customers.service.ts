import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Client } from '../interfaces/clients';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  customerData: any;
  authUser: firebase.User;
  constructor(
    private afs: AngularFirestore,
  ) { }

  getCustomerInfo(email: string){
    //this.authServices.userDetails().subscribe(val => this.authUser = val);
    // this.cutomerCollection = this.afs.collection<Client>('clientes');//.doc(customerData.email)

    // return this.cutomerCollection;
    //return this.afs.collection('/clientes/jo.smith@todo1.com/accounts/0001/movements').valueChanges();
    return this.afs.collection(`/clientes`).doc(email).valueChanges().pipe(
      //map((val: Client) => this.customerData = val)
      take(1)
    );
  }
}
