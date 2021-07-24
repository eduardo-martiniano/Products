import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-completed-buy',
  templateUrl: './completed-buy.component.html',
  styleUrls: ['./completed-buy.component.css']
})
export class CompletedBuyComponent implements OnInit {

  statusPayment: statusPayment = 0;
  private _hubConnection!: HubConnection;

  constructor(private route: ActivatedRoute) {
    this.createConnection();  
    this.registerOnServerEvents();  
    this.route.params.subscribe(params => this.startConnection(params.buyId));
   }

  ngOnInit(): void {
  }

  connectToStock(buyId: string) {  
    this._hubConnection.invoke('ConnectToStock', buyId);  
  }  
  
  private createConnection() {  
    this._hubConnection = new HubConnectionBuilder()  
      .withUrl('http://localhost:5000/brokerhub')  
      .build();  
  }  
  
  private startConnection(buyId: string): void {  
    this._hubConnection  
      .start()  
      .then(() => {
        this.connectToStock(buyId);
      })  
  }  

  private registerOnServerEvents(): void {  
    this._hubConnection.on('UpdatePrice', (data: any) => {
      if (data.payd) {
        this.statusPayment = 2
      }
      else {
        this.statusPayment = 1
      }
    });  
  } 

}

enum statusPayment {
  WAITING = 0,
  REFUSED = 1,
  PAID = 2
}