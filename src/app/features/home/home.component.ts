import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [AppService]
})
export class HomeComponent implements OnInit{
  greeting = "";
  currentWeather = "";

  constructor(private appService: AppService){}

  async ngOnInit() {
    this.setGreeting();
    this.appService.getForecast().subscribe(result => {
      this.currentWeather = result;
    });
  }

  setGreeting() {
    let hour = new Date();
    this.greeting = "Good morning";
    if((hour.getHours() >= 12)&& hour.getHours() < 18) {
      this.greeting = "Good afternoon";
    }
    else if(hour.getHours() >= 18 && hour.getHours() < 20) {
      this.greeting = "Good evening";
    }
    else if(hour.getHours() >= 20) {
      this.greeting = "Good night";
    }
  }
}
