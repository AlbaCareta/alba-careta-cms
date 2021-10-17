import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { ReactiveFormsModule } from '@angular/forms'
import { AngularEditorModule } from '@kolkov/angular-editor'
import { HttpClientModule } from '@angular/common/http'
import { ImageCropperModule } from 'ngx-image-cropper'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'

import { AuthGuard } from './auth/auth.guard'
import { StorageService } from './services/storage.service'
import { ProjectesService } from './services/projectes.service'

import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { ConcertsComponent } from './components/concerts/concerts.component'
import { ConcertDialogComponent } from './components/concerts/concert-dialog/concert-dialog.component'
import { ProjectesComponent } from './components/projectes/projectes.component'
import { ProjecteDialogComponent } from './components/projectes/projecte-dialog/projecte-dialog.component';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component'


const firebaseConfig = {
  apiKey: 'AIzaSyDoQ6qba8Z5PK3WsjZYcl7KttHfH-A2HMk',
  authDomain: 'alba-careta.firebaseapp.com',
  projectId: 'alba-careta',
  storageBucket: 'alba-careta.appspot.com',
  messagingSenderId: '447259750871',
  appId: '1:447259750871:web:b7a340aa2c74211665db92'
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ConcertsComponent,
    ConcertDialogComponent,
    ProjectesComponent,
    ProjecteDialogComponent,
    ImageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    AngularEditorModule,
    HttpClientModule,
    ImageCropperModule
  ],
  providers: [
    AuthGuard,
    StorageService,
    ProjectesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
