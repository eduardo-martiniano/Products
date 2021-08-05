import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products!: Product[];
  total = 0;

  constructor(private localStorageService: LocalStorageService,
              private route: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.products = this.localStorageService.getProductListInCart();
    this.total = this.localStorageService.getTotalOfBuy();
  }

  pay() {
    this.localStorageService.createTotalOfBuy(this.total);
    this.route.navigate(['checkout']);
  }

  removeProduct(product_id: any) {
    this.localStorageService.removeProduct(product_id);
    this.products = this.localStorageService.getProductListInCart();
    this.total = this.localStorageService.getTotalOfBuy();
    this.messageService.showSucess("Produto removido do carrinho!")
  }

}
