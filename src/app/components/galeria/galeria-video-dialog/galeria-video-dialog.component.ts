import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { GaleriaService } from '../../../services/galeria.service'


@Component({
  selector: 'app-galeria-video-dialog',
  templateUrl: './galeria-video-dialog.component.html',
  styleUrls: ['./galeria-video-dialog.component.scss']
})
export class GaleriaVideoDialogComponent implements OnInit {

  formGroup

  constructor(private readonly afs: AngularFirestore,
              private galeriaService: GaleriaService,
              private dialogRef: MatDialogRef<GaleriaVideoDialogComponent>) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      titleFC: new FormControl('', []),
      youtubeFC: new FormControl('', [])
    })

    this.formGroup.get('titleFC').setValue(this.galeriaService.galeriaItem.title)
    this.formGroup.get('youtubeFC').setValue(this.galeriaService.galeriaItem.video)

    this.formGroup.get('titleFC').valueChanges.subscribe(value => {
      this.galeriaService.galeriaItem.title = value
    })
    this.formGroup.get('youtubeFC').valueChanges.subscribe(value => {
      this.galeriaService.galeriaItem.video = value
    })
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
