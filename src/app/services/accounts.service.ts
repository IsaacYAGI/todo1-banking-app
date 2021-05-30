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

  getAccounts(email){
    return this.afs.collection(`/clientes/${email}/accounts`).valueChanges().pipe(
      //map((val: Client) => this.customerData = val)
      take(1)
    );
  }
}
