import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { MatSnackBar } from '@angular/material/snack-bar'


@Component({
  selector: 'app-biografia',
  templateUrl: './biografia.component.html',
  styleUrls: ['./biografia.component.scss']
})
export class BiografiaComponent implements OnInit {

  formGroup
  bios
  editorConfig: AngularEditorConfig = {
    editable: true,
    outline: false,
    minHeight: '400px',
    toolbarHiddenButtons: [
      [
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'toggleEditorMode'
      ]
    ]
  }

  constructor(private readonly afs: AngularFirestore,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      editor_ca: new FormControl('', []),
      editor_es: new FormControl('', [])
    })

    this.afs.firestore
      .collection('CMS')
      .doc('biografia')
      .get()
      .then((docSnapshot) => {
        this.bios = docSnapshot.data()
      })
      .then(() => {
        this.formGroup.get('editor_ca').setValue(this.bios['bio_ca'])
        this.formGroup.get('editor_es').setValue(this.bios['bio_es'])
      })
  }

  guardarCanvis(): void {
    this.afs.firestore
      .collection('CMS')
      .doc('biografia')
      .update({
        bio_ca: this.formGroup.get('editor_ca').value,
        bio_es: this.formGroup.get('editor_es').value
      })
      .then(() => {
        this.snackBar.open('Canvis guardats', 'OK', {
          duration: 2000
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

}
