import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { AlbumID } from '../definitions'


@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  album: AlbumID
  dialogTitle: string
  imageUploaded: Subject<boolean> = new Subject<boolean>()

  constructor() { }
}
