import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService ,private _Router:Router  ){}
  msgErr:string = ''
  isLoading = false
  
  loginForm:FormGroup = new FormGroup({
  
    email:new FormControl(null,[Validators.required ,Validators.email ]),
    password:new FormControl(null, [Validators.required ,Validators.pattern(/^[A-z][a-z0-9]{6,20}$/)]),
  
  });
  
  handleForm():void{
    console.log(this.loginForm);
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      this.isLoading = true ; 
      this._AuthService.setLogin(this.loginForm.value).subscribe({
       next:(res)=>{
         console.log(res); 
         if (res.message == 'success') {
          this.isLoading = false ; 
  
          // login routing 
  localStorage.setItem('Token',res.token)   
  this._AuthService.saveUserData()     
          this._Router.navigate(['/home']) 
         }
         },
         error:(err)=>{
          this.isLoading = false ; 
          this.msgErr = err.error.message
           console.log(err);
           console.log(err.error.message);
           
           }
      })
    }else{
      this.loginForm.markAllAsTouched()
    }
  }
  
  
}
