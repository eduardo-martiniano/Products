import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formContact: any;

  productsHighlights: Product[] = [
    {id: "2802693b-75c8-4b55-baab-ad1e836e7c95" ,name: "Xbox Series S", price: 2599.99, image: "https://images-na.ssl-images-amazon.com/images/I/81Z1xBs6GoL._AC_SL1500_.jpg"},
    {id: "b88d2ca2-f8a9-448c-b4a0-7960b232a6f5" ,name: "Smart TV 85", price: 16149.05, image: "https://www.pontofrio-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=1735237774"},
    {id: "ab6a55e1-517c-4431-896d-ddb7486d4f38" ,name: "Iphone 11", price: 3887.4, image: "https://a-static.mlcdn.com.br/618x463/iphone-11-apple-64gb-branco-61-12mp-ios/magazineluiza/155614100/af1cd7d9c89d7306b52490a0ce1b8b34.jpg"}]

  ratings = [
    {name: "Mariana Figueiredo", urlImage: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", feedback: "Ameei demais! Sãos os melhores preços da internet e chegou muito rápido!"},
    {name: "Ricardo Santos", urlImage: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", feedback: "Ótimo suporte!"},
    {name: "Diego Morais", urlImage: "https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", feedback: "Já comprei vários produtos, super recomendo!"},
  ]
  constructor(private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.formContact = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  get email() {
    return this.formContact.get('email');
  }

  get message() {
    return this.formContact.get('message');
  }

  get formIvalid(): boolean {
    return this.formContact.valid;
  }

  submit() {
    console.log(this.formContact.value);
    this.formContact.reset();
    this.messageService.showSucess("Mensagem enviada com sucesso!");
  }

}
