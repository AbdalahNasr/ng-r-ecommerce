import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories = [
    { name: 'Fruits', image: 'assets/images/assortment-citrus-fruits.png', description: 'Fresh and juicy fruits.' },
    { name: 'Vegetables', image: 'assets/images/grocery-banner.png', description: 'Green and healthy vegetables.' },
    { name: 'Beverages', image: 'assets/images/banner-4.jpeg', description: 'Refreshing drinks and beverages.' },
    { name: 'Snacks', image: 'assets/images/slide-1.jpeg', description: 'Tasty snacks for all ages.' }
  ];
  constructor() { }
  ngOnInit(): void { }
}
