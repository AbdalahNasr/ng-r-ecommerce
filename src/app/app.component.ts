import { Component } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-ecommerce';
  isLoading = this.loaderService.loading$;
  constructor(public loaderService: LoaderService) {}
}
