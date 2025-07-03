import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: any[] = [];
  isLoading = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('https://ecommerce.routemisr.com/api/v1/brands')
      .subscribe({
        next: (res) => {
          this.brands = res.data;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        }
      });
  }
}
