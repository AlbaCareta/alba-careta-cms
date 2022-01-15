import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { GaleriaID } from '../definitions'


@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  galeriaItem: GaleriaID
  imageUploaded: Subject<boolean> = new Subject<boolean>()

  constructor() { }
}
