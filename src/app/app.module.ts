import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'

import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'

import { AuthGuard } from './auth/auth.guard'
import {ReactiveFormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import { ConcertsComponent } from './components/concerts/concerts.component'

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
    ConcertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
