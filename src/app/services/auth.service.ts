import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  Verificacion()/*:Observable<boolean>*/{
    return localStorage.getItem('id') != null ? true : false;
  }

  login(id:string){
    localStorage.setItem('id', id);
  }

  logout(){
    localStorage.clear();
  }

}
