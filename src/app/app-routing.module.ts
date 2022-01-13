import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { AuthGuard } from './auth/auth.guard'
import { LoginComponent } from './components/login/login.component'
import { ConcertsComponent } from './components/concerts/concerts.component'
import { ProjectesComponent } from './components/projectes/projectes.component'
import { BiografiaComponent } from './components/biografia/biografia.component'
import { AlbumsComponent } from './components/albums/albums.component'

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
      {path: 'concerts', component: ConcertsComponent},
      {path: 'projectes', component: ProjectesComponent},
      {path: 'biografia', component: BiografiaComponent},
      {path: 'albums', component: AlbumsComponent}
    ]
  },
  {path: 'login', component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
