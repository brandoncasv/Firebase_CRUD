import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contacto } from '../../Interface/contacto'

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private all_Contacts: AngularFirestoreCollection<Contacto>;
  private all: Observable<Contacto[]>;

  constructor(private fs: AngularFirestore) { 
    this.all_Contacts = fs.collection<Contacto>('Contacto');
    this.all = this.all_Contacts.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }

  get_Contacts() {
    return this.all;
  }
  get_Contact(id: string) {
    return this.all_Contacts.doc<Contacto>(id).valueChanges();
  }
  update_Contact(contact:Contacto, id: string) {
    return this.all_Contacts.doc(id).update(contact);
  }
  add_Contact(contact:Contacto) {
    return this.all_Contacts.add(contact);
  }
  delete_Contact(id:string) {
    return this.all_Contacts.doc(id).delete();
  }

  
}
