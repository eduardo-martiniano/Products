import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  products!: Product[]
  productName: string = ''

  constructor(private productService: ProductService,
              private dialog: MatDialog,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadAll()
  }

  loadAll(): void {
    this.spinner.show();
    this.productService.readAll().then(products =>{
      this.products = products
      this.spinner.hide();
    })
  }

  getByName(): void {
    if (this.productName === ''){
      this.loadAll()
    }
    this.productService.getByName(this.productName).subscribe(products =>{
      this.products = products
    })
  }

  details(product: Product): void {
    const dialog = this.dialog.open(ProductDetailsComponent,  {
      data:{
        product
      }
    })
    dialog.afterClosed().subscribe(x => this.loadAll())
  }
}


