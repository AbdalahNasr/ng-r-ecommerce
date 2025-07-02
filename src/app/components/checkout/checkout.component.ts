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
  cartItems: any[] = [];
  phone: string = '';
  city: string = '';
  message: string = '';

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
        this.cartId = params.get('id');
      }
    });
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        if (res.data && res.data.products) {
          this.cartItems = res.data.products;
        }
      }
    });
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

  changeCount(productId: string, newCount: number) {
    if (newCount > 0) {
      this._CartService.updateCartProduct(productId, newCount).subscribe({
        next: (res) => {
          if (res.data && res.data.products) {
            // Find the updated product in the response and update cartItems
            this.cartItems = res.data.products;
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
