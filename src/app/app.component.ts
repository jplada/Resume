import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  route = "/";
  
  constructor(private router: Router){
    router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
          //console.log(event);
          this.route = event.url;
      });  
  }

}
