import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper'
import { ProjectesService } from '../../services/projectes.service'
import { StorageService } from '../../services/storage.service'


@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {

  imageChangedEvent: any = ''
  croppedImage: any = ''

  buttonDisabled = false

  constructor(private projectesService: ProjectesService,
              private storageService: StorageService,
              private dialogRef: MatDialogRef<ImageDialogComponent>) {
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
        .uploadFile('/projectes/', imageFile, this.projectesService.projecte.id)
        .subscribe((uploaded) => {
          if (uploaded) {
            this.projectesService.projecte.image = this.storageService.finalFileURL
            this.projectesService.imageUploaded.next(true)
            this.dialogRef.close()
          }
        })
    } else {
      alert('Error al pujar la imatge al servidor!')
      this.dialogRef.close()
    }
  }
}
