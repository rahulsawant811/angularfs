import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Item } from './models/item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {
    itemCollection: AngularFirestoreCollection<Item>;
    items: Observable<Item[]>;

    constructor(private afs: AngularFirestore) {
        this.items = this.afs.collection('angularfs').valueChanges();
    }

    getItems(){
        return this.items;
    }
}
