import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  @Input() items: any[] = [];

  get subtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.count, 0);
  }
  get delivery() {
    return 20;
  }
  get vat() {
    return this.subtotal * 0.14;
  }
  get total() {
    return this.subtotal + this.delivery + this.vat;
  }
}
