import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../shared/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements AfterViewInit, OnDestroy {
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  loading = false;
  message = '';
  cardNumber = '';
  holderName = '';
  expiry = '';
  cvv = '';
  errorMsg = '';

  constructor(
    private toastr: ToastrService,
    private cartService: CartService,
    private router: Router
  ) {}

  async ngAfterViewInit() {
    this.stripe = await loadStripe('pk_test_51RiEwFJX22JeG5iomBZoWkTGgf2pcBE3E6kl1iMbsi6aOS2h31BavAOeQPoDaijFE8006ywlUhISThr1BtitcF7C00ayB5Fld7'); // Real Stripe test publishable key
    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card', {
        style: {
          base: {
            color: '#fff',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '18px',
            '::placeholder': { color: '#fff' },
            letterSpacing: '2px'
          }
        }
      });
      this.card.mount('#card-element');
    }
  }

  ngOnDestroy() {
    if (this.card) {
      this.card.unmount();
    }
  }

  async pay() {
    console.log('Pay button clicked');
    if (!this.cardNumber || !this.holderName || !this.expiry || !this.cvv) {
      this.errorMsg = 'Please fill in all fields.';
      this.toastr.error('Please fill in all fields.', 'Error');
      console.log('Missing fields:', this.cardNumber, this.holderName, this.expiry, this.cvv);
      return;
    }
    this.errorMsg = '';
    // Simulate payment logic
    const paymentSuccess = true; // Replace with real logic
    if (paymentSuccess) {
      this.toastr.success('Payment successful!', 'Success');
      console.log('Payment successful');
      // Clear the cart
      this.cartService.clearCart().subscribe({
        next: () => {
          this.toastr.info('Cart cleared.', 'Info');
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        },
        error: () => {
          this.toastr.warning('Payment succeeded, but failed to clear cart.', 'Warning');
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        }
      });
    } else {
      this.toastr.error('Payment failed. Please try again.', 'Error');
      console.log('Payment failed');
    }
  }

  onCardNumberInput() {
    this.cardNumber = this.cardNumber
      .replace(/[^0-9]/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim()
      .slice(0, 19); // 16 digits + 3 spaces
  }

  onExpiryInput() {
    let val = this.expiry.replace(/[^0-9/]/g, '');
    if (val.length === 2 && !val.includes('/')) {
      val = val + '/';
    }
    this.expiry = val.slice(0, 5);
  }

  onCvvInput() {
    this.cvv = this.cvv.replace(/[^0-9]/g, '').slice(0, 3);
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    if ([
      'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'
    ].includes(event.key)) {
      return;
    }
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  allowOnlyNumbersAndSlash(event: KeyboardEvent) {
    if ([
      'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'
    ].includes(event.key)) {
      return;
    }
    if (!/^[0-9\/]$/.test(event.key)) {
      event.preventDefault();
    }
  }
}
