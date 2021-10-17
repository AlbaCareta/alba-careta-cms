import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { ProjectesService } from '../../../services/projectes.service'
import { StorageService } from '../../../services/storage.service'
import { ImageDialogComponent } from '../../image-dialog/image-dialog.component'


@Component({
  selector: 'app-projecte-dialog',
  templateUrl: './projecte-dialog.component.html',
  styleUrls: ['./projecte-dialog.component.scss']
})
export class ProjecteDialogComponent implements OnInit {

  imagePreview
  dialogTitle
  formGroup
  editorConfig: AngularEditorConfig = {
    editable: true,
    outline: false,
    minHeight: '240px',
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

  constructor(private projectesService: ProjectesService,
              private readonly afs: AngularFirestore,
              private storageService: StorageService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<ProjecteDialogComponent>) { }

  ngOnInit(): void {
    // Dialog title
    this.dialogTitle = this.projectesService.dialogTitle

    // Form
    this.formGroup = new FormGroup({
      titleFC: new FormControl('', []),
      textCAFC: new FormControl('', []),
      textESFC: new FormControl('', []),
      textENFC: new FormControl('', []),
      linkFC: new FormControl('', []),
      instagramFC: new FormControl('', []),
      spotifyFC: new FormControl('', []),
      youtubeFC: new FormControl('', [])
    })

    this.formGroup.get('titleFC').setValue(this.projectesService.projecte.title)
    this.formGroup.get('textCAFC').setValue(this.projectesService.projecte.text_ca)
    this.formGroup.get('textESFC').setValue(this.projectesService.projecte.text_es)
    this.formGroup.get('textENFC').setValue(this.projectesService.projecte.text_en)
    this.formGroup.get('linkFC').setValue(this.projectesService.projecte.link)
    this.formGroup.get('instagramFC').setValue(this.projectesService.projecte.instagram)
    this.formGroup.get('spotifyFC').setValue(this.projectesService.projecte.spotify)
    this.formGroup.get('youtubeFC').setValue(this.projectesService.projecte.video)

    this.formGroup.get('titleFC').valueChanges.subscribe(value => {
      this.projectesService.projecte.title = value
    })
    this.formGroup.get('textCAFC').valueChanges.subscribe(value => {
      this.projectesService.projecte.text_ca = value
    })
    this.formGroup.get('textESFC').valueChanges.subscribe(value => {
      this.projectesService.projecte.text_es = value
    })
    this.formGroup.get('textENFC').valueChanges.subscribe(value => {
      this.projectesService.projecte.text_en = value
    })
    this.formGroup.get('linkFC').valueChanges.subscribe(value => {
      this.projectesService.projecte.link = value
    })
    this.formGroup.get('instagramFC').valueChanges.subscribe(value => {
      this.projectesService.projecte.instagram = value
    })
    this.formGroup.get('spotifyFC').valueChanges.subscribe(value => {
      this.projectesService.projecte.spotify = value
    })
    this.formGroup.get('youtubeFC').valueChanges.subscribe(value => {
      this.projectesService.projecte.video = value
    })

    // Image
    this.imagePreview = this.projectesService.projecte.image

    this.projectesService.imageUploaded.subscribe((uploaded) => {
      if (uploaded) {
        this.imagePreview = this.projectesService.projecte.image
      }
    })
  }

  openImageDialog(): void {
    this.dialog.open(ImageDialogComponent, {
      autoFocus: false
    })
  }

  deleteImage(): void {
    this.storageService.deleteFile(this.imagePreview)
    this.imagePreview = ''
  }

  updatePost(): void {
    this.afs.firestore
      .collection('projectes')
      .doc(this.projectesService.projecte.id)
      .set(this.projectesService.projecte)
      .then(() => {
        this.dialogRef.close()
      })
      .catch(err => {
        console.log(err)
      })
  }

}
