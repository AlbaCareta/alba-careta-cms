import { Component, Inject, OnInit } from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { FormControl, FormGroup } from '@angular/forms'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import {ConcertID} from '../../../definitions'

@Component({
  selector: 'app-concert-dialog',
  templateUrl: './concert-dialog.component.html',
  styleUrls: ['./concert-dialog.component.scss']
})
export class ConcertDialogComponent implements OnInit {

  dialogTitle
  formGroup
  concert: ConcertID

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private readonly afs: AngularFirestore,
              private dialogRef: MatDialogRef<ConcertDialogComponent>) { }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialog_title
    this.concert = {
      id: this.data.concert.id,
      private: this.data.concert.private,
      title: this.data.concert.title,
      date: this.data.concert.date,
      time: this.data.concert.time,
      place: this.data.concert.place
    }
    // Form
    this.formGroup = new FormGroup({
      titleFC: new FormControl('', []),
      placeFC: new FormControl('', []),
      dateFC: new FormControl('', []),
      timeFC: new FormControl('', [])
    })

    this.formGroup.get('titleFC').setValue(this.concert.title)
    this.formGroup.get('placeFC').setValue(this.concert.place)
    this.formGroup.get('dateFC').setValue(this.concert.date)
    this.formGroup.get('timeFC').setValue(this.concert.time)

    this.formGroup.get('titleFC').valueChanges.subscribe(value => {
      this.concert.title = value
    })
    this.formGroup.get('placeFC').valueChanges.subscribe(value => {
      this.concert.place = value
    })
    this.formGroup.get('dateFC').valueChanges.subscribe(value => {
      this.concert.date = value
    })
    this.formGroup.get('timeFC').valueChanges.subscribe(value => {
      this.concert.time = value
    })
  }

  updatePost(): void {
    this.afs.firestore
      .collection('concerts')
      .doc(this.concert.id)
      .set(this.concert)
      .then(() => {
        this.dialogRef.close()
      })
      .catch(err => {
        console.log(err)
      })
  }

}
