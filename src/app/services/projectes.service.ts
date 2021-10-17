import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { ProjecteID } from '../definitions'


@Injectable({
  providedIn: 'root'
})
export class ProjectesService {

  dialogTitle: string
  projecte: ProjecteID

  imageUploaded: Subject<boolean> = new Subject<boolean>()

  constructor() { }
}
