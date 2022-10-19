import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { TacosService } from 'src/app/service/tacos.service';
import { AuthService } from 'src/app/services/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  Formulario: FormGroup = this.fb.group({
  correo:       [, [Validators.required, Validators.email]],
  contrasena:   [, [Validators.required, Validators.minLength(6)]]
  });


  constructor(private router: Router,
    public auth:AuthService,
    private fb: FormBuilder,
    private cs : TacosService) { }

  ngOnInit(): void {
  }

  Login(){
    console.log(this.Formulario.value);
    this.cs.Post('taqueria', 'Login', this.Formulario.value).subscribe((dato: any)=>{  
      console.log(dato);
          
      if(dato.id != undefined){
        this.auth.login(dato.id);      }

        
    });
  }

}
