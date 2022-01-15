import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { StorageService } from '../../../services/storage.service'
import { GaleriaService } from '../../../services/galeria.service'
import { GaleriaImageEditorComponent } from '../galeria-image-editor/galeria-image-editor.component'


@Component({
  selector: 'app-galeria-image-dialog',
  templateUrl: './galeria-image-dialog.component.html',
  styleUrls: ['./galeria-image-dialog.component.scss']
})
export class GaleriaImageDialogComponent implements OnInit {

  imagePreview: string

  formGroup

  constructor(private readonly afs: AngularFirestore,
              private galeriaService: GaleriaService,
              private storageService: StorageService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<GaleriaImageDialogComponent>) { }

  ngOnInit(): void {
    // Form
    this.formGroup = new FormGroup({
      titleFC: new FormControl('', [])
    })

    this.formGroup.get('titleFC').setValue(this.galeriaService.galeriaItem.title)

    this.formGroup.get('titleFC').valueChanges.subscribe(value => {
      this.galeriaService.galeriaItem.title = value
    })

    // Image
    this.imagePreview = this.galeriaService.galeriaItem.image

    this.galeriaService.imageUploaded.subscribe((uploaded) => {
      if (uploaded) {
        this.imagePreview = this.galeriaService.galeriaItem.image
      }
    })
  }

  openImageDialog(): void {
    this.dialog.open(GaleriaImageEditorComponent, {
      autoFocus: false
    })
  }

  deleteImage(): void {
    this.storageService.deleteFile(this.imagePreview)
    this.imagePreview = ''
  }

  uploadItem(): void {
    this.afs.firestore
      .collection('galeria')
      .doc(this.galeriaService.galeriaItem.id)
      .set(this.galeriaService.galeriaItem)
      .then(() => {
        this.dialogRef.close()
      })
      .catch(err => {
        console.log(err)
      })
  }

  closeDialog(): void {
    this.dialogRef.close()
  }

}
