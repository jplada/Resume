import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppService } from './app.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppService', () => {
  let appService: AppService;
  let httpController: HttpTestingController;
  beforeEach(async () => {  
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AppService
      ],
    });
    appService = TestBed.inject(AppService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(appService).toBeTruthy();
  });  

  it('should get forecast', ()=> {
    appService.getForecast().subscribe(result => {
        expect(result).toBeTruthy();
        expect(result).toBe("The weather is Sunny, expected for next hours is Clear");
    });
    const url = "https://api.weather.gov/gridpoints/TOP/31,80/forecast";
    const mockReq = httpController.expectOne(url);
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(mockedForecast);
  });
});

const mockedForecast = {
  "properties": {
        "units": "us",
        "forecastGenerator": "BaselineForecastGenerator",
        "generatedAt": "2024-10-16T20:29:52+00:00",
        "updateTime": "2024-10-16T19:10:28+00:00",
        "validTimes": "2024-10-16T13:00:00+00:00/P7DT15H",
        "elevation": {
            "unitCode": "wmoUnit:m",
            "value": 456.89519999999999
        },
        "periods": [
            {
                "number": 1,
                "name": "This Afternoon",
                "startTime": "2024-10-16T15:00:00-05:00",
                "endTime": "2024-10-16T18:00:00-05:00",
                "isDaytime": true,
                "temperature": 61,
                "temperatureUnit": "F",
                "temperatureTrend": "",
                "probabilityOfPrecipitation": {
                    "unitCode": "wmoUnit:percent",
                    "value": null
                },
                "windSpeed": "15 mph",
                "windDirection": "S",
                "icon": "https://api.weather.gov/icons/land/day/skc?size=medium",
                "shortForecast": "Sunny",
                "detailedForecast": "Sunny, with a high near 61. South wind around 15 mph, with gusts as high as 25 mph."
            },
            {
                "number": 2,
                "name": "Tonight",
                "startTime": "2024-10-16T18:00:00-05:00",
                "endTime": "2024-10-17T06:00:00-05:00",
                "isDaytime": false,
                "temperature": 43,
                "temperatureUnit": "F",
                "temperatureTrend": "",
                "probabilityOfPrecipitation": {
                    "unitCode": "wmoUnit:percent",
                    "value": null
                },
                "windSpeed": "10 to 20 mph",
                "windDirection": "S",
                "icon": "https://api.weather.gov/icons/land/night/skc?size=medium",
                "shortForecast": "Clear",
                "detailedForecast": "Clear, with a low around 43. South wind 10 to 20 mph, with gusts as high as 35 mph."
            },
            {
                "number": 3,
                "name": "Thursday",
                "startTime": "2024-10-17T06:00:00-05:00",
                "endTime": "2024-10-17T18:00:00-05:00",
                "isDaytime": true,
                "temperature": 73,
                "temperatureUnit": "F",
                "temperatureTrend": "",
                "probabilityOfPrecipitation": {
                    "unitCode": "wmoUnit:percent",
                    "value": null
                },
                "windSpeed": "20 to 25 mph",
                "windDirection": "S",
                "icon": "https://api.weather.gov/icons/land/day/wind_skc?size=medium",
                "shortForecast": "Sunny",
                "detailedForecast": "Sunny, with a high near 73. South wind 20 to 25 mph, with gusts as high as 40 mph."
            },
          ]
  }
};