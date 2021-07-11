import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastr: ToastrService) { }

  showError(mensagem: string) {
    this.toastr.error(mensagem, 'Oops!', {
      progressBar: true
    });
  }

  showInfo(mensagem: string) {
    this.toastr.info(mensagem, 'Informativo', {
      progressBar: true
    });
  }

  showSucess(mensagem: string) {
    this.toastr.success(mensagem, 'Sucesso!', {
      progressBar: true
    });
  }

}
