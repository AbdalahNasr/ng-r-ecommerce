import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit, OnDestroy {
  categoryId: string = '';
  products: any[] = [];
  isLoading = true;
  errorMsg: string = '';
  categoryName: string = '';
  private productsSub?: Subscription;
  private routeSub?: Subscription;

  constructor(private route: ActivatedRoute, private ecommerceService: EcommerceDataService) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      this.isLoading = true;
      this.errorMsg = '';
      // Fetch all products (if not already loaded)
      this.ecommerceService.fetchAllProducts().subscribe({
        error: () => {
          this.isLoading = false;
          this.errorMsg = 'Failed to load products. Please try again later.';
        }
      });
      // Subscribe to products$ and filter by category
      this.productsSub = this.ecommerceService.products$.subscribe(products => {
        console.log('All products:', products);
        console.log('Current categoryId:', this.categoryId);

        // Gather all unique category representations
        const uniqueCategories = new Set();
        products.forEach((p, idx) => {
          uniqueCategories.add(JSON.stringify(p.category));
          console.log(`Product[${idx}] category:`, p.category);
        });
        console.log('Unique product category values:', Array.from(uniqueCategories));

        // Try to find any product where the category field loosely matches the categoryId
        const looseMatches = products.filter(p => {
          if (!p.category) return false;
          // If string, check includes or equals
          if (typeof p.category === 'string') {
            return p.category.includes(this.categoryId) || this.categoryId.includes(p.category);
          }
          // If object, check all values for a match
          if (typeof p.category === 'object') {
            return Object.values(p.category).some(val =>
              typeof val === 'string' && (val.includes(this.categoryId) || this.categoryId.includes(val))
            );
          }
          return false;
        });
        console.log('Loose matches:', looseMatches);

        this.products = products.filter(p => {
          if (typeof p.category === 'string') {
            return p.category === this.categoryId;
          } else if (p.category && typeof p.category === 'object') {
            return p.category._id === this.categoryId;
          }
          return false;
        });
        // Set the category name if products exist
        if (this.products.length > 0) {
          this.categoryName = this.products[0].category?.name || '';
        } else {
          this.categoryName = '';
        }
        console.log('Filtered products:', this.products);
        this.isLoading = false;
        if (this.products.length === 0) {
          this.errorMsg = 'No products found for this category.';
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
    this.routeSub?.unsubscribe();
  }
}
