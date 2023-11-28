import { Component } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

constructor(private route: Router) {

}

ngOninit():void {
  this.route.events.subscribe((val:any)=> {
    if(val.url) {
console.warn(val.url)
      if(localStorage.getItem('seller')&& val.url.includes('seller')) {
        console.warn("in seller area") 
      }
      
        else {

          console.warn("outside seller")
        }
      
    } 
  })
}

}
