import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands = [
    { name: 'Brand A', logo: 'assets/images/freshcart-logo.svg' },
    { name: 'Brand B', logo: 'assets/images/app-store.svg' },
    { name: 'Brand C', logo: 'assets/images/google-store.svg' },
    { name: 'Brand D', logo: 'assets/images/master.svg' },
    { name: 'Brand E', logo: 'assets/images/visa.svg' },
    { name: 'Brand F', logo: 'assets/images/visa-1.svg' }
  ];
  constructor() { }
  ngOnInit(): void { }
}
