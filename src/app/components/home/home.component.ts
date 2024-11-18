import { Component, OnInit , HostListener  } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

constructor(private _EcommerceDataService:EcommerceDataService,
  private _router:Router ,private _CartService:CartService,
  private _ToastrService:ToastrService
){}

products:Product[] = [];
categories:any[]= [];
searchTerm:string = '';


addCart(id:string):void{
  this._CartService.addToCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      this._ToastrService.success(res.message , 'Fresh Cart')
    },
    error:(err)=>{
      console.log(err);
      }
  })
}

// slider options
categoriesSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}
mainSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
  autoplay:true,
  nav: false
}


ngOnInit(): void {
  // get all products
    this._EcommerceDataService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res);
        this.products = res.data;
      }
    })
    this._EcommerceDataService.getCategories().subscribe({
      next:(res)=>{
        console.log(res);
        this.categories = res.data;
      }
    })
}
// scrolling
isButtonVisible = false;

@HostListener('window:scroll', [])
onWindowScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  this.isButtonVisible = scrollTop > 100; // Show the button after scrolling 100px
}

scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
}

}
