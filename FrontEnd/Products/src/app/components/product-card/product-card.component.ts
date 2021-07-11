import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/product.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  product!: Product;

  constructor(private localStorageService: LocalStorageService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  addToCart() {
    if (!this.localStorageService.productInList(this.product.id || 0)) {
      this.localStorageService.addToCart(this.product);
      this.messageService.showSucess("Produto adicionado no carrinho!");
    }
    else {
      this.messageService.showInfo("Esse produto já está no carrinho!")
    }
  }

}
