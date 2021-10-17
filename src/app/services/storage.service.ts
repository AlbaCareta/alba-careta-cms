import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/compat/storage'


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  uploadedFileURL: Observable<string>
  finalFileURL

  constructor(private afStorage: AngularFireStorage) {
  }

  uploadFile(url: string, file: any, fileName: string): Observable<boolean> {
    return new Observable( observer => {
      const reader = new FileReader()
      reader.onload = () =>  file = reader.result
      reader.readAsArrayBuffer(file)

      const filePath = url + fileName
      const fileRef = this.afStorage.ref(filePath)
      const task = this.afStorage.upload(filePath, file)

      task.snapshotChanges().pipe(
        finalize(() => {
          this.uploadedFileURL = fileRef.getDownloadURL()
          this.uploadedFileURL.subscribe((downloadURLResponse) => {
            this.finalFileURL = downloadURLResponse
            observer.next(true)
          });
        })
      ).subscribe()
    });
  }

  deleteFile(url: any): void {
    this.afStorage.storage.refFromURL(url).delete().then()
  }
}
