import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'

import { AuthGuard } from './auth/auth.guard'

import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { ConcertsComponent } from './components/concerts/concerts.component'
import { ConcertDialogComponent } from './components/concerts/concert-dialog/concert-dialog.component'


const firebaseConfig = {
  apiKey: "AIzaSyDoQ6qba8Z5PK3WsjZYcl7KttHfH-A2HMk",
  authDomain: "alba-careta.firebaseapp.com",
  projectId: "alba-careta",
  storageBucket: "alba-careta.appspot.com",
  messagingSenderId: "447259750871",
  appId: "1:447259750871:web:b7a340aa2c74211665db92"
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ConcertsComponent,
    ConcertDialogComponent
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
    MatNativeDateModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
