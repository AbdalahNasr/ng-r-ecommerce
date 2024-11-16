import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  constructor(private _FormBuilder:FormBuilder,
    private _ActivatedRoute:ActivatedRoute,
    private  _CartService:CartService

  ){}



  checkout:FormGroup = this._FormBuilder.group({
    details:[''],
    phone:[''],
    city:['']
  })

cartId:any = '' ;


ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params) => {
      console.log(params.get('id'));
      this.cartId = params.get('id');

      }
  })
    
}

  handleForm():void{
    console.log(this.checkout.value);  // details {}
    this._CartService.checkOut(this.cartId,this.checkout.value).subscribe({
      next:(res) => { 

        console.log(res);
        if (res.status == "success") {
          window.open(res.session.url,'_self')
          
        }

        },
        error:(err) => {
          console.log(err);
          }
          })
    
  }



}