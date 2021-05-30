import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccountsService {

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

  getAccount(email,accountNumber){
    return this.afs.collection(`/clientes/${email}/accounts`).doc(accountNumber).valueChanges().pipe(
      //map((val: Client) => this.customerData = val)
      // take(1)
    );
  }
}
