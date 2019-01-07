import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCollection: AngularFirestoreCollection<AppUser>;

  constructor(private afs: AngularFirestore) { 
    this.usersCollection = this.afs.collection('users');
  }

  save(user: firebase.User) {
    
    this.usersCollection.doc( user.uid )
      .set({
        name: user.displayName,
        email: user.email
      }, { merge: true });
  }

  get(uid: string): Observable<AppUser> {
    return this.usersCollection.doc<AppUser>(uid).valueChanges();
  }
}
