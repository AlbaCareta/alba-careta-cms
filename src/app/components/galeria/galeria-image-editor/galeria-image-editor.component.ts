import { Component, OnInit } from '@angular/core'
import { StorageService } from '../../../services/storage.service'
import { MatDialogRef } from '@angular/material/dialog'
import { GaleriaService } from '../../../services/galeria.service'
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper'

@Component({
  selector: 'app-galeria-image-editor',
  templateUrl: './galeria-image-editor.component.html',
  styleUrls: ['./galeria-image-editor.component.scss']
})
export class GaleriaImageEditorComponent implements OnInit {

  imageChangedEvent: any = ''
  croppedImage: any = ''

  buttonDisabled = false

  constructor(private galeriaService: GaleriaService,
              private storageService: StorageService,
              private dialogRef: MatDialogRef<GaleriaImageEditorComponent>) { }

  ngOnInit(): void {
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
        .uploadFile('/galeria/', imageFile, this.galeriaService.galeriaItem.id)
        .subscribe((uploaded) => {
          if (uploaded) {
            this.galeriaService.galeriaItem.image = this.storageService.finalFileURL
            this.galeriaService.imageUploaded.next(true)
            this.dialogRef.close()
          }
        })
    } else {
      alert('Error al pujar la imatge al servidor!')
      this.dialogRef.close()
    }
  }

}
