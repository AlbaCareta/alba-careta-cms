import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { ProjectesService } from '../../../services/projectes.service'
import { StorageService } from '../../../services/storage.service'
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper'
import {AlbumsService} from '../../../services/albums.service'


@Component({
  selector: 'app-albums-image-dialog',
  templateUrl: './albums-image-dialog.component.html',
  styleUrls: ['./albums-image-dialog.component.scss']
})
export class AlbumsImageDialogComponent implements OnInit {

  imageChangedEvent: any = ''
  croppedImage: any = ''

  buttonDisabled = false

  constructor(private albumsService: AlbumsService,
              private storageService: StorageService,
              private dialogRef: MatDialogRef<AlbumsImageDialogComponent>) {
  }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64
  }

  uploadImage() {
    this.buttonDisabled = true
    if (this.croppedImage !== '') {
      const imageFile = base64ToFile(this.croppedImage)
      this.storageService
        .uploadFile('/albums/', imageFile, this.albumsService.album.id)
        .subscribe((uploaded) => {
          if (uploaded) {
            this.albumsService.album.image = this.storageService.finalFileURL
            this.albumsService.imageUploaded.next(true)
            this.dialogRef.close()
          }
        })
    } else {
      alert('Error al pujar la imatge al servidor!')
      this.dialogRef.close()
    }
  }

}
