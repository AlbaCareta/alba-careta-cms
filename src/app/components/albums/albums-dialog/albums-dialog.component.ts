import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AlbumsImageDialogComponent } from '../albums-image-dialog/albums-image-dialog.component'
import { StorageService } from '../../../services/storage.service'
import { AlbumsService } from '../../../services/albums.service'


@Component({
  selector: 'app-albums-dialog',
  templateUrl: './albums-dialog.component.html',
  styleUrls: ['./albums-dialog.component.scss']
})
export class AlbumsDialogComponent implements OnInit {

  imagePreview: string

  dialogTitle: string

  formGroup

  constructor(private readonly afs: AngularFirestore,
              private albumsService: AlbumsService,
              private storageService: StorageService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<AlbumsDialogComponent>) {
  }

  ngOnInit(): void {
    // Dialog title
    this.dialogTitle = this.albumsService.dialogTitle

    // Form
    this.formGroup = new FormGroup({
      titleFC: new FormControl('', []),
      artistFC: new FormControl('', []),
      linkFC: new FormControl('', [])
    })

    this.formGroup.get('titleFC').setValue(this.albumsService.album.title)
    this.formGroup.get('artistFC').setValue(this.albumsService.album.artist)
    this.formGroup.get('linkFC').setValue(this.albumsService.album.link)

    this.formGroup.get('titleFC').valueChanges.subscribe(value => {
      this.albumsService.album.title = value
    })
    this.formGroup.get('artistFC').valueChanges.subscribe(value => {
      this.albumsService.album.artist = value
    })
    this.formGroup.get('linkFC').valueChanges.subscribe(value => {
      this.albumsService.album.link = value
    })

    // Image
    this.imagePreview = this.albumsService.album.image

    this.albumsService.imageUploaded.subscribe((uploaded) => {
      if (uploaded) {
        this.imagePreview = this.albumsService.album.image
      }
    })
  }

  openImageDialog(): void {
    this.dialog.open(AlbumsImageDialogComponent, {
      autoFocus: false
    })
  }

  deleteImage(): void {
    this.storageService.deleteFile(this.imagePreview)
    this.imagePreview = ''
  }

  updateAlbum(): void {
    this.afs.firestore
      .collection('albums')
      .doc(this.albumsService.album.id)
      .set(this.albumsService.album)
      .then(() => {
        this.dialogRef.close()
      })
      .catch(err => {
        console.log(err)
      })
  }

}
