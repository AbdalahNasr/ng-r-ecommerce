import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

constructor(private _AuthService:AuthService ,private _Router:Router  ){}
msgErr:string = ''
isLoading = false

registerForm:FormGroup = new FormGroup({

  name:new FormControl(null,[ Validators.required ,Validators.minLength(3),Validators.maxLength(20)]),
  email:new FormControl(null,[Validators.required ,Validators.email ]),
  password:new FormControl(null, [Validators.required ,Validators.pattern(/^[A-z][a-z0-9]{6,20}$/)]),
  rePassword:new FormControl(null ,[Validators.required ,Validators.pattern(/^[A-z][a-z0-9]{6,20}$/)]),
  phone:new FormControl(null ,[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)]),

},{
  validators: [this.confirmPassword] 
} as FormControlOptions ) ;

confirmPassword(group:FormGroup ):void{
  let password = group.get('password')
  let rePassword = group.get('rePassword') 
  if (rePassword?.value  == null ) {
    rePassword?.setErrors({required:true})
  } else if(password?.value != rePassword?.value){
    rePassword?.setErrors({mismatch: true})
    }else{
      rePassword?.setErrors(null)
      }
      

}

handleForm():void{
  console.log(this.registerForm);
  console.log(this.registerForm.value);
  console.log(this.registerForm.valid);
  if (this.registerForm.valid) {
    this.isLoading = true ; 
    this._AuthService.setRegister(this.registerForm.value).subscribe({
     next:(res)=>{
       console.log(res); 
       if (res.message == 'success') {
        this.isLoading = false ; 

        // login routing 
        
        this._Router.navigate(['/login'])
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
    this.registerForm.markAllAsTouched()
  }
}


}
 