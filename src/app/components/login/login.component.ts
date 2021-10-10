import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { gsap } from 'gsap'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup
  validationText: string;

  @ViewChild('alert') alertER: ElementRef
  @ViewChild('alert_text') alertTextER: ElementRef

  constructor(private auAuth: AngularFireAuth,
              private router: Router) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      mailFormControl: new FormControl('', [
        Validators.required, Validators.email
      ]),
      passwordFormControl: new FormControl('', [
        Validators.required
      ]),
    })
  }

  login() {
    if (this.formGroup.valid) {
      this.auAuth.signInWithEmailAndPassword(
        this.formGroup.get('mailFormControl').value,
        this.formGroup.get('passwordFormControl').value
      )
        .then((value) => {
          this.router.navigate(['']).then()
        })
        .catch(err => {
          this.validationText = 'There is no user record corresponding to this identifier.'
          this.validationTextAnimation()
        })
    } else {
      if (!this.formGroup.get('mailFormControl').valid) {
        this.validationText = 'Email address is not valid'
        this.validationTextAnimation()
      } else {
        this.validationText = 'Login credentials incomplete'
        this.validationTextAnimation()
      }
    }
  }

  validationTextAnimation() {
    gsap.timeline()
      .fromTo(this.alertER.nativeElement, {x: -4}, {x: 0, opacity: 1})
      .to(this.alertER.nativeElement, { opacity: 0}, '<1.6')

  }
}
