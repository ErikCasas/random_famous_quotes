import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit {

  showIconBack: boolean = false;

  constructor( private router: Router,) { }

   ngOnInit(): void {
    this.showIcon()
   }

  showIcon(){
     this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showIconBack = localStorage.getItem('showIconBack') === 'true' ? true : false
      }
    });
  }

  redirectHome(){
    localStorage.removeItem('showIconBack');
    this.router.navigate(['home']);
  }
}
