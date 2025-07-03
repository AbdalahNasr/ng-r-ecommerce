import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  isLoading = true;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any>('https://ecommerce.routemisr.com/api/v1/categories/')
      .subscribe({
        next: (res) => {
          this.categories = res.data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  getCategoryById(id: string) {
    return this.http.get<any>(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }

  goToCategory(id: string) {
    this.router.navigate(['/categories', id]);
  }
}
