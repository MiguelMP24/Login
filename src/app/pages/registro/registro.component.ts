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
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  Formulario: FormGroup = this.fb.group({
  nombre:       [, [Validators.required, Validators.minLength(5)]],
  correo:       [, [Validators.required, Validators.email]],
  contrasena:   [, [Validators.required, Validators.minLength(6)]]
  });

  constructor(private router: Router,
    public auth:AuthService,
    private fb: FormBuilder,
    private cs : TacosService) { }

  ngOnInit(): void {
  }

  Registro(){
    console.log(this.Formulario.value);
    this.cs.Post('Registro', 'Registro', this.Formulario.value).subscribe((dato: any)=>{      
      if(dato.id != undefined){
        this.auth.login(dato.id);
        this.router.navigate(['./pages/login,']);
      }
    });
  }

  guardar() {
    this.cs.Post('taqueria', 'Insert', this.Formulario.value).subscribe((dato: any) => {
      console.log(dato);
      if (dato['estatus']) {
        this.Formulario.reset();
        this.ObtenerRegistro(dato['id']);
        this.router.navigate(['./login,']);
      }
    });
  }

  ObtenerRegistro(id: number) {
    this.cs.Post('taqueria', 'GetId', { 'producto_id': id }).subscribe((dato: any) => {
      console.log(dato);
    });
  }

}
