import { Component, OnInit } from '@angular/core'
import { map } from 'rxjs/operators'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Observable } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { AlbumsDialogComponent } from './albums-dialog/albums-dialog.component'
import { AlbumsService } from '../../services/albums.service'
import { Album, AlbumID } from '../../definitions'


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  albums = []

  isDragging = false

  private albumsCollection: AngularFirestoreCollection<Album>
  private albumsItems: Observable<AlbumID[]>

  constructor(private readonly afs: AngularFirestore,
              private albumsService: AlbumsService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.albumsCollection =
      this.afs.collection<Album>('albums', ref => ref.orderBy('order'))

    this.albumsItems = this.albumsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Album
        const id = a.payload.doc.id
        return {id, ...data}
      }))
    )

    this.albumsItems.subscribe(items => {
      let preDataSource
      preDataSource = items as AlbumID[]
      this.albums = preDataSource
    })
  }

  onOrderDrop(event: CdkDragDrop<AlbumID[]>) {
    if (!this.isDragging) {
      this.isDragging = true
      moveItemInArray(this.albums, event.previousIndex, event.currentIndex)
      for (let i = 0; i < this.albums.length; i++) {
        this.afs
          .collection('projectes')
          .doc(this.albums[i].id)
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

  switchPrivate(elem: AlbumID) {
    let switchValue
    switchValue = !elem.private

    this.afs
      .collection('albums')
      .doc(elem.id)
      .update({
        private: switchValue
      })
      .then()
      .catch(err => {
        console.log(err)
      })
  }

  addAlbum(): void {
    // Album order
    let albumOrder
    if (this.albums.length === undefined || this.albums.length === 0) {
      albumOrder = 1
    } else {
      albumOrder = this.albums.length + 1
    }

    // Album
    this.albumsService.album = {
      id: this.afs.createId(),
      order: albumOrder,
      private: true,
      title: '',
      artist: '',
      image: '',
      link: ''
    }

    // Dialog title
    this.albumsService.dialogTitle = 'Nou album'

    // Dialog
    this.dialog.open(AlbumsDialogComponent, {
      width: '756px',
      autoFocus: false,
      disableClose: true
    })
  }

  editAlbum(elem: AlbumID): void {
    // Album
    this.albumsService.album = elem

    // Dialog title
    this.albumsService.dialogTitle = 'Editar album'

    // Dialog
    this.dialog.open(AlbumsDialogComponent, {
      width: '756px',
      autoFocus: false,
      disableClose: true
    })
  }

  deleteAlbum(elem: AlbumID): void {
    if (confirm('Esborrar album definitivament?')) {
      this.afs.firestore
        .collection('albums')
        .doc(elem.id)
        .delete()
        .then()
        .catch(err => {
          console.log(err)
        })
    }
  }
}
