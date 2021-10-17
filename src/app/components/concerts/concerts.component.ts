import { Component, OnInit } from '@angular/core';
import { Concert, ConcertID } from '../../definitions'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { MatDialog } from '@angular/material/dialog'
import { ConcertDialogComponent } from './concert-dialog/concert-dialog.component'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.scss']
})
export class ConcertsComponent implements OnInit {

  private concertsCollection: AngularFirestoreCollection<Concert>
  private concertsItems: Observable<ConcertID[]>
  concerts = []
  concertsArchive = []

  constructor(private readonly afs: AngularFirestore,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.concertsCollection =
      this.afs.collection<Concert>('concerts', ref => ref.orderBy('date'))

    this.concertsItems = this.concertsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Concert
        const id = a.payload.doc.id
        return { id, ...data }
      }))
    )

    this.concertsItems.subscribe( items => {
      this.concerts = []
      this.concertsArchive = []
      let preDataSource
      preDataSource = items as ConcertID[]

      const dateRef = new Date()
      dateRef.setHours(-24, 0, 0, 0)

      for (const i of preDataSource) {
        const concertDate = new Date (i.date.seconds * 1000)
        if (dateRef.getTime() < concertDate.getTime()) {
          this.concerts.push(i)
        } else {
          this.concertsArchive.push(i)
        }
      }

      this.concerts.reverse()
      this.concertsArchive.reverse()
    })
  }

  createConcertDialog(): void {
    this.dialog.open(ConcertDialogComponent, {
      width: '640px',
      autoFocus: false,
      disableClose: true,
      data: {
        dialog_title: 'Nou concert',
        concert: {
          id: this.afs.createId(),
          private: true,
          title: '',
          date: new Date(),
          time: '00:00',
          place: ''
        }
      }
    })
  }

  editConcertDialog(elem: ConcertID): void {
    this.dialog.open(ConcertDialogComponent, {
      width: '640px',
      autoFocus: false,
      disableClose: true,
      data: {
        dialog_title: 'Editar concert',
        concert: {
          id: elem.id,
          private: elem.private,
          title: elem.title,
          date: elem.date,
          time: elem.time,
          place: elem.place
        }
      }
    })
  }

  deleteConcert(elem: ConcertID): void {
    if (confirm('Esborrar concert definitivament?')) {
      this.afs.firestore
        .collection('concerts')
        .doc(elem.id)
        .delete()
        .then()
        .catch(err => {
          console.log(err)
        })
    }
  }

  switchPrivate(elem: ConcertID) {
    let switchValue
    switchValue = !elem.private

    this.afs
      .collection('concerts')
      .doc(elem.id)
      .update({
        private: switchValue
      })
      .then()
      .catch(err => {
        console.log(err)
      })
  }

}
