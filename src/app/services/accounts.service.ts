import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Account } from '../interfaces/account';
import { Movement } from '../interfaces/movement';


@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  selectedDestinationAccount: any = null;
  constructor(
    private afs: AngularFirestore,
  ) { }

  getAccountsAsPromise(email){
    return this.afs.collection(`/clientes/${email}/accounts`).valueChanges().pipe(
      //map((val: Client) => this.customerData = val)
      take(1)
    );
  }

  getAccounts(email){
    return this.afs.collection(`/clientes/${email}/accounts`).valueChanges().pipe(
      //map((val: Client) => this.customerData = val)
      // take(1)
    );
  }

  getAccountAsPromise(email,accountNumber){
    return this.afs.collection(`/clientes/${email}/accounts`).doc(accountNumber).valueChanges().pipe(
      //map((val: Client) => this.customerData = val)
      take(1)
    );
  }
  getAccount(email,accountNumber){
    return this.afs.collection(`/clientes/${email}/accounts`).doc(accountNumber).valueChanges().pipe(
      //map((val: Client) => this.customerData = val)
      // take(1)
    );
  }

  getAccountMovements(email,accountNumber){
    return this.afs.collection(`/clientes/${email}/accounts/${accountNumber}/movements`, ref => ref
      .orderBy("date","desc")
      .limit(10)
    ).valueChanges().pipe(
      map((val: any) => {
        return val.map(elem =>{
          elem.date = new Date(elem.date);
          return elem;
        })
      })
    );
  }

  updateAccount(email: string, accountNumber: string, accountData: Account){
    return this.afs.collection(`/clientes/${email}/accounts`).doc(accountNumber).set(accountData);
  }

  addMovement(email: string, accountNumber: string, movement: Movement){
    return this.afs.collection(`/clientes/${email}/accounts/${accountNumber}/movements`).add(movement);
  }
}
