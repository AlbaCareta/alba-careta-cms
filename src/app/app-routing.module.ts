import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { AuthGuard } from './auth/auth.guard'
import { LoginComponent } from './components/login/login.component'
import { ConcertsComponent } from './components/concerts/concerts.component'

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
      {path: 'concerts', component: ConcertsComponent}
    ]
  },
  {path: 'login', component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
