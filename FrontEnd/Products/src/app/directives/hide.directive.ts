import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Directive({
  selector: '[appHide]'
})
export class HideDirective implements OnInit {

  @Input('appHide')
  public role: any;

  constructor(private localStorageService: LocalStorageService, private el: ElementRef) { }
  ngOnInit(): void {
    if (this.localStorageService.userHasThisRole(this.role)) {
      this.el.nativeElement.style.display = 'block';
      return;
    }
    this.el.nativeElement.style.display = 'none';
  }



}
