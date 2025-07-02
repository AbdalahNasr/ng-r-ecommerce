import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  hoveredIndex: number | null = null;

  constructor( private _CartService:CartService){}
cartDetails:any= {};

removeCartItem(id:string):void{
  this._CartService.removeItem(id).subscribe({
    next:(response)=>{
    console.log(response.data);
      this.cartDetails= response.data;
    },
    error:(error)=>{
      console.log(error);
      }
      })
}


  ngOnInit(): void {
      this._CartService.getUserCart().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.cartDetails=res.data // {totalCartPrice,products:[{count,price, product}]}
          },
          error:(err)=>{
            console.log(err);
            }
      })
  }

  changeCount(id:string,count:number):void{
    if (count > 0) {

      this._CartService.updateCartProduct(id,count).subscribe({
        next:(response)=>{
          console.log(response.data);
          this.cartDetails= response.data;
          },
          error:(error)=>{
            console.log(error);
          }
          })
    }
  }

}
