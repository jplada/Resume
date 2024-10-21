import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable()
export class AppService{
    constructor(private http: HttpClient){}

    async getForecastFetchVersion() {
        const url = "https://api.weather.gov/gridpoints/TOP/31,80/forecast";
        const response = await fetch(url,{method:"GET"});
        const json = await response.json();
        const currentWeather = json.properties.periods[0].shortForecast;
        const expectedWeather = json.properties.periods[1].shortForecast;
        return "The weather is " + currentWeather + ", expected for next hours is " + expectedWeather;
    }    

    getForecast(): Observable<any>{
        const url = "https://api.weather.gov/gridpoints/TOP/31,80/forecast";
        return this.http.get(url).pipe(map((data: any)=>{
            const currentWeather = data.properties.periods[0].shortForecast;
            const expectedWeather = data.properties.periods[1].shortForecast;
            return "The weather is " + currentWeather + ", expected for next hours is " + expectedWeather;
        }));        
    }        
}
