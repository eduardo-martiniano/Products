import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TryPayAgainComponent } from '../try-pay-again/try-pay-again.component';

@Component({
  selector: 'app-completed-buy',
  templateUrl: './completed-buy.component.html',
  styleUrls: ['./completed-buy.component.css']
})
export class CompletedBuyComponent implements OnInit {

  statusPayment: statusPayment = 0;
  private _hubConnection!: HubConnection;

  constructor(private route: ActivatedRoute,
              private localStorageService: LocalStorageService,
              private dialog: MatDialog) {
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
        this.localStorageService.clearLocalStorage();
      }
      else {
        this.statusPayment = 1
      }
    });
  }

  public tryPayAgain() {
    this.dialog.open(TryPayAgainComponent, {
      data: this.route.snapshot.paramMap.get('buyId')
    });
  }

}

enum statusPayment {
  WAITING = 0,
  REFUSED = 1,
  PAID = 2
}
