import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/product.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MessageService } from 'src/app/services/message.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product!: Product;
  @Output() productEdited = new EventEmitter();

  constructor(private localStorageService: LocalStorageService,
              private dialog: MatDialog, 
              private messageService: MessageService) { }

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

  edit(): void {
    const dialog = this.dialog.open(ProductDetailsComponent,  {
      data: {
        product: this.product
      }
    });

    dialog.afterClosed().subscribe(() => this.productEdited.emit());
  }

}
