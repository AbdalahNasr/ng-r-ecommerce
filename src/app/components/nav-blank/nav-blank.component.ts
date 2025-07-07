import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent {
  isMobileMenuOpen = false;

  constructor(private _AuthService:AuthService){}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('Token');
  }

  logOutUser():void{
    this._AuthService.logOut()
  }

}
