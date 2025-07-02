import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [
    { name: 'Apple', image: 'assets/images/assortment-citrus-fruits.png', price: 20 },
    { name: 'Orange Juice', image: 'assets/images/grocery-banner.png', price: 35 },
    { name: 'Snack Bar', image: 'assets/images/slide-1.jpeg', price: 15 },
    { name: 'Fresh Veggies', image: 'assets/images/banner-4.jpeg', price: 25 }
  ];

  hoveredIndex: number | null = null;

  constructor() { }

  ngOnInit(): void { }

  addToCart(product: any): void {
    // Placeholder for add to cart logic
    alert(product.name + ' added to cart!');
  }
}
