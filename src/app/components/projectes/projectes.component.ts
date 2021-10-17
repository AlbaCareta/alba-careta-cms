import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { MatDialog } from '@angular/material/dialog'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { ProjectesService } from '../../services/projectes.service'
import { Projecte, ProjecteID } from '../../definitions'
import { ProjecteDialogComponent } from './projecte-dialog/projecte-dialog.component'


@Component({
  selector: 'app-projectes',
  templateUrl: './projectes.component.html',
  styleUrls: ['./projectes.component.scss']
})
export class ProjectesComponent implements OnInit {

  private projectesCollection: AngularFirestoreCollection<Projecte>
  private projectesItems: Observable<ProjecteID[]>

  projectes
  isDragging

  constructor(private readonly afs: AngularFirestore,
              private projectesService: ProjectesService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.projectesCollection =
      this.afs.collection<Projecte>('projectes', ref => ref.orderBy('order'))

    this.projectesItems = this.projectesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Projecte
        const id = a.payload.doc.id
        return {id, ...data}
      }))
    )

    this.projectesItems.subscribe(items => {
      let preDataSource
      preDataSource = items as ProjecteID[]
      this.projectes = preDataSource
    })
  }

  onOrderDrop(event: CdkDragDrop<ProjecteID[]>) {
    if (!this.isDragging) {
      this.isDragging = true
      moveItemInArray(this.projectes, event.previousIndex, event.currentIndex)
      for (let i = 0; i < this.projectes.length; i++) {
        this.afs
          .collection('projectes')
          .doc(this.projectes[i].id)
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

  createProjectDialog(): void {
    // Projecte ordre
    let projectOrder
    if (this.projectes.length === undefined || this.projectes.length === 0) {
      projectOrder = 1
    } else {
      projectOrder = this.projectes.length + 1
    }

    // Projecte
    this.projectesService.projecte = {
      id: this.afs.createId(),
      private: true,
      order: projectOrder,
      title: '',
      text_ca: '',
      text_es: '',
      text_en: '',
      image: '',
      link: '',
      instagram: '',
      spotify: '',
      video: ''
    }

    // Dialog title
    this.projectesService.dialogTitle = 'Nou projecte'

    // Dialog
    this.dialog.open(ProjecteDialogComponent, {
      width: '756px',
      autoFocus: false,
      disableClose: true
    })
  }

  editProjectDialog(elem: ProjecteID): void {
    // Dialog title
    this.projectesService.dialogTitle = 'Editar projecte'

    // Projecte
    this.projectesService.projecte = {
      id: elem.id,
      private: elem.private,
      order: elem.order,
      title: elem.title,
      text_ca: elem.text_ca,
      text_es: elem.text_es,
      text_en: elem.text_en,
      image: elem.image,
      link: elem.link,
      instagram: elem.instagram,
      spotify: elem.spotify,
      video: elem.video
    }

    // Dialog
    this.dialog.open(ProjecteDialogComponent, {
      width: '756px',
      autoFocus: false,
      disableClose: true
    })
  }

  deleteProjecte(elem: ProjecteID): void {
    if (confirm('Esborrar projecte definitivament?')) {
      this.afs.firestore
        .collection('projectes')
        .doc(elem.id)
        .delete()
        .then()
        .catch(err => {
          console.log(err)
        })
    }
  }

  switchPrivate(elem: ProjecteID) {
    let switchValue
    switchValue = !elem.private

    this.afs
      .collection('projectes')
      .doc(elem.id)
      .update({
        private: switchValue
      })
      .then()
      .catch(err => {
        console.log(err)
      })
  }
}
