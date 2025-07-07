import { Component, OnInit, OnDestroy } from '@angular/core';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  currentPage = 1;
  totalPages = 1;
  hoveredIndex: number | null = null;
  private productsSub?: Subscription;

  constructor(
    private _EcommerceDataService: EcommerceDataService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchProducts(this.currentPage);
  }

  fetchProducts(page: number): void {
    if (this.productsSub) this.productsSub.unsubscribe();
    this.productsSub = this._EcommerceDataService.getProductsPaginated(page, 20).subscribe(res => {
      this.products = res.data;
      this.totalPages = Math.ceil(res.metadata.total / 20);
      this.currentPage = page;
    });
  }

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.fetchProducts(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.fetchProducts(this.currentPage - 1);
    }
  }

  addToCart(product: any): void {
    if (!localStorage.getItem('Token')) {
      this.toastr.error('You must be logged in to add to cart!', 'Error');
      return;
    }
    // Placeholder for add to cart logic
    this.toastr.success(product.title + ' added to cart!', 'Success');
  }
}
