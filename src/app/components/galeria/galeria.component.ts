import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { MatDialog } from '@angular/material/dialog'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { GaleriaService } from '../../services/galeria.service'
import { GaleriaImageDialogComponent } from './galeria-image-dialog/galeria-image-dialog.component'
import { GaleriaVideoDialogComponent } from './galeria-video-dialog/galeria-video-dialog.component'
import { Galeria, GaleriaID } from '../../definitions'


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {

  galeria = []

  isDragging = false

  private galeriaCollection: AngularFirestoreCollection<Galeria>
  private galeriaItems: Observable<GaleriaID[]>

  constructor(private readonly afs: AngularFirestore,
              private galeriaService: GaleriaService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.galeriaCollection =
      this.afs.collection<Galeria>('galeria', ref => ref.orderBy('order'))

    this.galeriaItems = this.galeriaCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Galeria
        const id = a.payload.doc.id
        return {id, ...data}
      }))
    )

    this.galeriaItems.subscribe(items => {
      let preDataSource
      preDataSource = items as GaleriaID[]
      this.galeria = preDataSource
    })
  }

  onOrderDrop(event: CdkDragDrop<GaleriaID[]>) {
    if (!this.isDragging) {
      this.isDragging = true
      moveItemInArray(this.galeria, event.previousIndex, event.currentIndex)
      for (let i = 0; i < this.galeria.length; i++) {
        this.afs
          .collection('galeria')
          .doc(this.galeria[i].id)
          .update({
            order: i + 1
          })
          .then(() => {
            this.isDragging = false
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }

  switchPrivate(elem: GaleriaID) {
    let switchValue
    switchValue = !elem.private

    this.afs
      .collection('galeria')
      .doc(elem.id)
      .update({
        private: switchValue
      })
      .then()
      .catch(err => {
        console.log(err)
      })
  }

  addItem(itemType: string): void {
    // Album order
    let itemOrder
    if (this.galeria.length === undefined || this.galeria.length === 0) {
      itemOrder = 1
    } else {
      itemOrder = this.galeria.length + 1
    }

    // Album
    this.galeriaService.galeriaItem = {
      id: this.afs.createId(),
      order: itemOrder,
      private: true,
      title: '',
      image: '',
      video: ''
    }

    // Dialog
    if (itemType === 'image') {
      this.dialog.open(GaleriaImageDialogComponent, {
        width: '756px',
        autoFocus: false,
        disableClose: true
      })
    } else if (itemType === 'video') {
      this.dialog.open(GaleriaVideoDialogComponent, {
        width: '756px',
        autoFocus: false,
        disableClose: true
      })
    }
  }

  deleteItem(elem: GaleriaID): void {
    if (confirm('Esborrar item definitivament?')) {
      this.afs.firestore
        .collection('galeria')
        .doc(elem.id)
        .delete()
        .then()
        .catch(err => {
          console.log(err)
        })
    }
  }

}
