import { Component, OnInit, OnDestroy } from '@angular/core';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];

  hoveredIndex: number | null = null;
  private productsSub?: Subscription;

  constructor(private _EcommerceDataService: EcommerceDataService) { }

  ngOnInit(): void {
    this._EcommerceDataService.fetchAllProducts().subscribe();
    this.productsSub = this._EcommerceDataService.products$.subscribe((products: any[]) => {
      this.products = products;
    });
  }

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
  }

  addToCart(product: any): void {
    // Placeholder for add to cart logic
    alert(product.title + ' added to cart!');
  }
}
