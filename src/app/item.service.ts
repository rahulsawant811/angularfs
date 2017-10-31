import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Item } from './models/item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {
    itemCollection: AngularFirestoreCollection<Item>;
    items: Observable<Item[]>;
    itemDoc: AngularFirestoreDocument<Item>;

    constructor(private afs: AngularFirestore) {

        this.itemCollection = this.afs.collection('angularfs', ref => ref.orderBy('title', 'asc'));

        // this.items = this.afs.collection('angularfs').valueChanges();
        this.items = this.itemCollection.snapshotChanges().map( changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Item;
                data.id = a.payload.doc.id;
                return data;
            });
        });
    }

    getItems(){
        return this.items;
    }

    addItem(item: Item){
        this.itemCollection.add(item);
    }

    deleteItem(item: Item){
        this.itemDoc = this.afs.doc(`angularfs/${item.id}`);
        this.itemDoc.delete();
    }

    updateItem(item: Item){
        this.itemDoc = this.afs.doc(`angularfs/${item.id}`);
        this.itemDoc.update(item);
    }
}
